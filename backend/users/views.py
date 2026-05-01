from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RegisterSerializer, UserSerializer

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
from django.db import connection
from django.http import JsonResponse

def db_check(request):
    # This reaches into the active connection settings
    db_info = {
        "engine": connection.vendor,  # Will say 'postgresql' or 'sqlite'
        "db_name": connection.settings_dict.get('NAME'),
        "host": connection.settings_dict.get('HOST', 'N/A'),
        "user": connection.settings_dict.get('USER', 'N/A'),
    }
    return JsonResponse(db_info)