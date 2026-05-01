import requests
import uuid
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator 
from orders.models import Order, ShippingAddress
from .models import Payment
from store.models import Cart

class InitializePaymentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        order_id = request.data.get('order_id')
        order = get_object_or_404(Order, id=order_id, user=request.user)

        # ❗ Prevent paying already paid order
        if order.status == "paid":
            return Response({"error": "Order already paid"}, status=400)

        # ❗ Prevent duplicate payment
        if hasattr(order, 'payment'):
            return Response({"error": "Payment already initiated"}, status=400)

        tx_ref = f"tx-{order.id}-{uuid.uuid4().hex[:6]}"
        address = ShippingAddress.objects.get(user=request.user)

        payload = {
            "amount": str(order.total_price),
            "currency": "ETB",
            "email": request.user.email,
            "first_name": address.full_name,
            "tx_ref": tx_ref,
            "callback_url": settings.CHAPA_CALLBACK_URL,
            "return_url": settings.CHAPA_RETURN_URL, 
            "customization": {
                "title": settings.STORE_NAME,
                "description": f"Order {order.id}"
            }
        }

        headers = {
            "Authorization": f"Bearer {settings.CHAPA_SECRET_KEY}",
            "Content-Type": "application/json"
        }

        try:
            response = requests.post(
                "https://api.chapa.co/v1/transaction/initialize",
                json=payload,
                headers=headers
            )
            res_data = response.json() 

            if res_data['status'] == 'success':
                Payment.objects.create(
                    order=order,
                    tx_ref=tx_ref,
                    amount=order.total_price,
                    status="pending"
                )
                
                return Response({
                    "checkout_url": res_data['data']['checkout_url'],
                    "tx_ref": tx_ref
                }, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Chapa initialization failed"}, status=400)

        except Exception as e: 
            return Response({"error": str(e)}, status=500)      

@method_decorator(csrf_exempt, name='dispatch')
class ChapaWebhookView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        return self.handle_payment(request.data)

    def get(self, request):
        return self.handle_payment(request.GET)

    def handle_payment(self, data):
        print("🔥 WEBHOOK DATA:", data)

        tx_ref = data.get('tx_ref') or data.get('trx_ref')

        if not tx_ref:
            return Response({"error": "Missing tx_ref"}, status=400)

        payment = get_object_or_404(Payment, tx_ref=tx_ref)
        order = payment.order

        # Prevent duplicate processing
        if payment.status == "success":
            return Response({"message": "Already processed"}, status=200)

        if data.get('status') == 'success':
            payment.status = 'success'
            payment.gateway_response = data
            payment.save()

            # Update order
            order.status = 'paid'
            order.save()

            # Reduce stock
            for item in order.items.all():
                product = item.product
                product.stock -= item.quantity
                product.save()

            # Clear cart
            try:
                cart = Cart.objects.get(user=order.user)
                cart.items.all().delete()
            except Cart.DoesNotExist:
                pass

            return Response({"status": "Payment successful"}, status=200)

        else:
            payment.status = 'failed'
            payment.gateway_response = data
            payment.save()

            order.status = 'failed'
            order.save()

            return Response({"status": "Payment failed"}, status=200)