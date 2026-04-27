from rest_framework import serializers
from users.models import User
from orders.models import Order
from django.db.models import Sum

class AdminUserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "role",
            "is_active",
            "date_joined",
        ]
        

class AdminUserDetailSerializer(serializers.ModelSerializer):
    total_orders = serializers.SerializerMethodField()
    total_spent = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "role",
            "is_active",
            "date_joined",
            "total_orders",
            "total_spent",
        ]

    def get_total_orders(self, obj):
        return Order.objects.filter(user=obj).count()

    def get_total_spent(self, obj):
        result = Order.objects.filter(
            user=obj,
            status__in=["paid", "shipped", "delivered"]
        ).aggregate(total=Sum("total_price"))

        return result["total"] or 0
    
class AdminUserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["is_active", "role"]