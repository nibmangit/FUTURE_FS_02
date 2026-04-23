from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics
from rest_framework import generics 
from store.models import Cart
from .models import *
from .serializers import * 

class ShippingAddressViewSet(generics.RetrieveUpdateAPIView):
    serializer_class = ShippingAddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # This always returns the ONE address for the logged-in user
        # If it doesn't exist, it creates a blank one so the frontend has a form to fill
        address, created = ShippingAddress.objects.get_or_create(user=self.request.user)
        return address

class CheckoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        
        data = request.data 
        shipping_address, _ = ShippingAddress.objects.get_or_create(user=user)
        
        shipping_address.full_name = data.get('full_name', shipping_address.full_name)
        shipping_address.phone_number = data.get('phone_number', shipping_address.phone_number)
        shipping_address.city = data.get('city', shipping_address.city)
        shipping_address.district = data.get('district', shipping_address.district)
        shipping_address.specific_address = data.get('specific_address', shipping_address.specific_address)
        shipping_address.save()
        
        # 1. Get cart
        cart = get_object_or_404(Cart, user=user)
        cart_items = cart.items.select_related('product').all()

        if not cart_items:
            return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            # 2. Create Order
            order = Order.objects.create(
                user=user,
                total_price=cart.total_price,
                shipping_address=shipping_address,
                status="pending"
            )

            # 3. Move items (NO stock reduction here anymore)
            for item in cart_items:
                if item.product.stock < item.quantity:
                    raise Exception(f"Not enough stock for {item.product.title}")

                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    quantity=item.quantity,
                    price_at_purchase=item.product.price
                )

            return Response({
                "message": "Order created successfully",
                "order_id": order.id,
                "total_price": order.total_price,
                "status": order.status
            }, status=status.HTTP_201_CREATED)
        
class OrderHistoryView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        # A user should only see THEIR orders, not everyone's!
        # We also use prefetch_related to keep it fast (no N+1 problem)
        return Order.objects.filter(user=self.request.user)\
                            .prefetch_related('items__product')\
                            .order_by('-created_at')