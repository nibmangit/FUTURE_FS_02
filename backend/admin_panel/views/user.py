from rest_framework import generics, serializers, permissions
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from users.models import User
from admin_panel.permissions import IsAdminOrStaff
from admin_panel.serializers.user_admin import *
from admin_panel.filters import AdminUserFilter

class AdminUserListView(generics.ListAPIView):
    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = AdminUserListSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrStaff]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = ['date_joined', 'email']
    filterset_class = AdminUserFilter
    
    def list(self, request, *args, **kwargs): 
        queryset = self.filter_queryset(self.get_queryset())
        
        global_users = User.objects.all()
 
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            response = self.get_paginated_response(serializer.data)
              
            response.data['stats'] = {
                "total_users": global_users.count(),
                "active_users": global_users.filter(is_active=True).count(),
                "admin_users": global_users.filter(role="admin").count(),
                "blocked_users": global_users.filter(is_active=False).count(),
            }
            return response
 
        # Fallback for non-paginated responses
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class AdminUserDetailView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsAdminOrStaff]
     
    def get_serializer_class(self):
        if self.request.method in ['PATCH', 'PUT']:
            return AdminUserUpdateSerializer
        return AdminUserDetailSerializer

    def perform_update(self, serializer):
        # prevent admins to modify themselvs
        if self.get_object().id == self.request.user.id:
            raise serializers.ValidationError({"error": "You cannot modify yourself"})
        
        serializer.save()