from rest_framework import generics, serializers, permissions
from users.models import User
from admin_panel.permissions import IsAdminOrStaff
from admin_panel.serializers.user_admin import *

class AdminUserListView(generics.ListAPIView):
    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = AdminUserListSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrStaff]

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