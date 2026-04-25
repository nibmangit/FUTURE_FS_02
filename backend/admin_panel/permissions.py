from rest_framework.permissions import BasePermission


class IsAdminOrStaff(BasePermission):
    def has_permission(self, request, view):
        user = request.user

        # Check if user is logged in
        if not user or not user.is_authenticated:
            return False

        # Check role
        return user.role in ['admin', 'staff']