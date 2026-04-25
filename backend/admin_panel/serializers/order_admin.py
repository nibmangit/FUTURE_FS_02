from rest_framework import serializers
from orders.models import *


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.title", read_only=True)
    product_image = serializers.CharField(source="product.image", read_only=True)
    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ["id", "product", "product_name", "product_image", "quantity", "price_at_purchase", "subtotal", ]

    def get_subtotal(self, obj):
        return obj.quantity * obj.price_at_purchase
    
class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = ["id", "full_name", "phone_number", "city", "district", "specific_address", "is_default",]
        
class OrderListSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source="user.email", read_only=True)

    class Meta:
        model = Order
        fields = ["id", "user_email", "total_price", "status", "created_at", ]
        
        
class OrderDetailSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source="user.email", read_only=True)
    items = OrderItemSerializer(many=True, read_only=True)
    shipping_address = ShippingAddressSerializer(read_only=True)

    class Meta:
        model = Order
        fields = ["id", "user_email", "total_price", "status", "created_at", "shipping_address", "items", ]