from rest_framework import serializers
from .models import Cart, Product, CartItem

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source = "category.name")
    class Meta:
        model = Product
        fields = ["id", "title", "description", "category", "stock", "price", "image"]
    
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    class Meta:
        model = CartItem
        fields = ["id", "product", "quantity"]
        
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many =True, read_only=True)
    class Meta:
        model = Cart
        fields = ["id", "items"]
    
class AddToCartSerializer(serializers.Serializer):
    product_id = serializers.UUIDField()
    quantity = serializers.IntegerField(min_value=1)