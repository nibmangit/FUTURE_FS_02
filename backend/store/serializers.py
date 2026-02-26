from rest_framework import serializers
from .models import Cart, Product, CartItem

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source = "category.name")
    class Meta:
        model = Product
        fields = ["id", "title", "description", "category", "stock", "price", "image"]
        
class CartProductSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Product
        fields = ["id", "title", "stock", "price", "image"]
    
class CartItemSerializer(serializers.ModelSerializer):
    product = CartProductSerializer(read_only=True)
    subtotal = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)

    class Meta:
        model = CartItem
        fields = ["id", "product", "quantity", "subtotal"]
        
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True) 
    total_items = serializers.IntegerField(read_only=True)
    total_quantity = serializers.IntegerField(read_only=True)
    total_price = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)

    class Meta:
        model = Cart
        fields = ["id", "items", "total_items", "total_quantity", "total_price"]
    
class AddToCartSerializer(serializers.Serializer):
    product_id = serializers.UUIDField()
    quantity = serializers.IntegerField(min_value=1)