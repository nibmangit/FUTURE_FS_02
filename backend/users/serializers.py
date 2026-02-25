from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("id", "email", "password")
        
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'], # Use email as the username value
            email= validated_data["email"],
            password= validated_data["password"],
        )
        return user
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email"]