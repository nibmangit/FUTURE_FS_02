from rest_framework import serializers
from .models import *

class OrderItemSerializer(serializers.ModelSerializer):
    # We bring in details from the related Product model
    product_title = serializers.CharField(source="product.title", read_only=True) 

    class Meta:
        model = OrderItem
        fields = ["id", "product", "product_title", "quantity", "price_at_purchase", "subtotal" ]

class OrderSerializer(serializers.ModelSerializer):
    # This nests the items inside the order JSON
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [ "id",  "items",  "total_price", "status",  "created_at" ]
        
class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        # We don't include 'user' because we will set that automatically
        fields = ['id', 'full_name', 'phone_number', 'city', 'district', 'specific_address', 'is_default']
        read_only_fields = ['id']