from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from store.models import Cart
from .models import Order, OrderItem
from .serializers import OrderSerializer 

class CheckoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        # 1. Get the cart and its items
        cart = get_object_or_404(Cart, user=user)
        cart_items = cart.items.select_related('product').all()

        if not cart_items:
            return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            # 2. Create the Order object
            order = Order.objects.create(
                user=user,
                total_price=cart.total_price # uses the property we built earlier
            )

            # 3. Move items from Cart to Order & Update Stock
            for item in cart_items:
                # Check stock one last time
                if item.product.stock < item.quantity:
                    raise Exception(f"Not enough stock for {item.product.title}")

                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    quantity=item.quantity,
                    price_at_purchase=item.product.price # Locking in the price
                )

                # Reduce product stock
                item.product.stock -= item.quantity
                item.product.save()

            # 4. Clear the Cart
            cart_items.delete()

            return Response({
                "message": "Order created successfully",
                "order_id": order.id,
                "total_price": order.total_price
            }, status=status.HTTP_201_CREATED)
            
from rest_framework import generics
from .models import Order
from .serializers import OrderSerializer

class OrderHistoryView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # A user should only see THEIR orders, not everyone's!
        # We also use prefetch_related to keep it fast (no N+1 problem)
        return Order.objects.filter(user=self.request.user)\
                            .prefetch_related('items__product')\
                            .order_by('-created_at')