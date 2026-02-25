from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, generics, status
from .models import Cart, Product
from .serializers import *

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

class CartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

class AddToCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        serializer = AddToCartSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        
        product_id = serializer.validated_data["product_id"]
        quantity = serializer.validated_data["quantity"]
        
        product = get_object_or_404(Product, id = product_id)
        
        if quantity > product.stock:
            return Response({"error":"No enough stock ia available for this product."}, status=status.HTTP_400_BAD_REQUEST)
        
        cart, _ = Cart.objects.get_or_create(user = request.user)
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product, defaults={"quantity":quantity})
        if not created:
            new_quantity = cart_item.quantity + quantity
            if new_quantity>product.stock:
                return Response( {"error": "Total quantity exceeds available stock."}, status=status.HTTP_400_BAD_REQUEST )
            cart_item.quantity = new_quantity
            cart_item.save()
        return Response({"message": "Product added to cart successfully."}, status=status.HTTP_201_CREATED )