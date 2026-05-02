from rest_framework import serializers
from users.models import User
from orders.models import Order
from django.db.models import Sum

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import PermissionDenied

class AdminTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # First, verify that the email/password are correct
        data = super().validate(attrs)
        
        # 'self.user' is the user object found after email/password check
        # We check if their role is strictly 'admin'
        if self.user.role != 'admin':
            raise PermissionDenied("Access denied: You do not have an admin role.")
            
        # Optional: Add the role to the response so the frontend knows for sure
        data['role'] = self.user.role
        data['username'] = self.user.username
        
        return data

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