from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, generics 
from .models import Cart, Product , Category
from .serializers import *

from django.db.models import Q

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CategorySerializer
    pagination_class = None

class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Product.objects.all()

        category = self.request.query_params.get("category")
        search = self.request.query_params.get("search")

        if category and category != "All":
            queryset = queryset.filter(category__slug=category)

        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search) |
                Q(category__name__icontains=search) |
                Q(category__slug__icontains=search) |
                Q(price__icontains=search)
            )

        return queryset.order_by('-created_at')
    
class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'id'
 
class CartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        # Optimization to prevent N+1 queries
        cart_optimized = Cart.objects.prefetch_related('items__product').get(id=cart.id)
        serializer = CartSerializer(cart_optimized)
        return Response(serializer.data)
 
class AddOrUpdateCartItemView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        serializer = AddToCartSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        product = get_object_or_404(Product, id=serializer.validated_data["product_id"])
        quantity = serializer.validated_data["quantity"]
        cart, _ = Cart.objects.get_or_create(user=request.user)
        
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        
        # Logic: If new, use quantity. If exists, add to it.
        new_total = quantity if created else cart_item.quantity + quantity
        
        if new_total > product.stock:
            return Response({"error": "Insufficient stock"}, status=400)
        
        cart_item.quantity = new_total
        cart_item.save()
        
        # Return the FULL updated cart so the frontend UI updates immediately
        updated_cart = Cart.objects.prefetch_related('items__product').get(id=cart.id)
        return Response(CartSerializer(updated_cart).data)

    def put(self, request):
        serializer = AddToCartSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product_id = serializer.validated_data['product_id']
        quantity_change = serializer.validated_data['quantity']
        action = request.data.get("action", "increment") 

        cart = Cart.objects.get(user=request.user)
        cart_item = get_object_or_404(CartItem, cart=cart, product_id=product_id)

        if action == "increment":
            cart_item.quantity += quantity_change
        elif action == "decrement":
            cart_item.quantity = max(1, cart_item.quantity - quantity_change)
        elif action == "set":
            cart_item.quantity = quantity_change

        if cart_item.quantity > cart_item.product.stock:
            return Response({"error": "Exceeds stock"}, status=400)

        cart_item.save()
        
        # Again, return the full cart
        updated_cart = Cart.objects.prefetch_related('items__product').get(id=cart.id)
        return Response(CartSerializer(updated_cart).data)
    
class RemoveCartItemView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def delete(self, request, product_id):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        cart_item = get_object_or_404(CartItem, cart = cart, product__id = product_id)
        
        cart_item.delete()
        updated_cart = Cart.objects.prefetch_related('items__product').get(id=cart.id)
        return Response(CartSerializer(updated_cart).data)
    