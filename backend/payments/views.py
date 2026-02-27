import requests
import uuid
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator 
from orders.models import Order
from .models import Payment

class InitializePaymentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        order_id = request.data.get('order_id')
        order = get_object_or_404(Order, id=order_id, user=request.user)

        # 1. Create a unique transaction reference
        tx_ref = f"tx-{order.id}-{uuid.uuid4().hex[:6]}"

        # 2. Prepare Chapa Payload
        # 'callback_url' is where Chapa sends the Webhook (Server-to-Server)
        # 'return_url' is where the user is redirected after paying (Browser)
        payload = {
            "amount": str(order.total_price),
            "currency": "ETB",
            "email": request.user.email,
            "first_name": request.user.username,
            "tx_ref": tx_ref,
            "callback_url": "https://mydomain.com/api/payments/webhook/",
            "return_url": "http://localhost:3000/payment-success/", 
            "customization": {
                "title": "Mini Store",
                "description": f"Order {order.id}"
            }
        }

        headers = {
            "Authorization": f"Bearer {settings.CHAPA_SECRET_KEY}",
            "Content-Type": "application/json"
        }

        # 3. Call Chapa API
        try:
            response = requests.post(
                "https://api.chapa.co/v1/transaction/initialize",
                json=payload,
                headers=headers
            )
            res_data = response.json() 

            if res_data['status'] == 'success':
                # 4. Create local Payment record
                Payment.objects.create(
                    order=order,
                    tx_ref=tx_ref,
                    amount=order.total_price,
                    status="pending"
                )
                
                # Send the checkout URL to the frontend
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
    permission_classes = [permissions.AllowAny] # Chapa needs to be able to access this

    def post(self, request):
        # 1. Chapa sends data in the body
        data = request.data
        
        # 2. Find the payment record using the tx_ref Chapa sends back
        tx_ref = data.get('tx_ref')
        payment = get_object_or_404(Payment, tx_ref=tx_ref)
        order = payment.order

        # 3. Update based on Chapa's response
        if data.get('status') == 'success':
            payment.status = 'success'
            payment.gateway_response = data
            payment.save()

            # Update the Order to Paid
            order.status = 'paid'
            order.save()
            
            return Response({"status": "Payment successful and order updated"}, status=200)
        else:
            payment.status = 'failed'
            payment.save()
            return Response({"status": "Payment failed"}, status=200)