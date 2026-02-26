from rest_framework import serializers
from .models import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    # We bring in details from the related Product model
    product_title = serializers.CharField(source="product.title", read_only=True) 

    class Meta:
        model = OrderItem
        fields = [
            "id", 
            "product", 
            "product_title",  
            "quantity", 
            "price_at_purchase", 
            "subtotal"
        ]

class OrderSerializer(serializers.ModelSerializer):
    # This nests the items inside the order JSON
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            "id", 
            "items", 
            "total_price", 
            "status", 
            "created_at" ]