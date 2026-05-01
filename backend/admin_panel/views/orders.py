from rest_framework import generics, filters
from django_filters import rest_framework as django_filters
from rest_framework.permissions import IsAuthenticated

from orders.models import Order
from admin_panel.serializers.order_admin import OrderListSerializer, OrderDetailSerializer
from admin_panel.permissions import IsAdminOrStaff
from admin_panel.filters import OrderFilter

class AdminOrderListView(generics.ListAPIView):
    queryset = Order.objects.all().order_by("-created_at")
    serializer_class = OrderListSerializer
    permission_classes = [IsAuthenticated, IsAdminOrStaff]
    
    filter_backends = [django_filters.DjangoFilterBackend, filters.SearchFilter]
    filterset_class = OrderFilter
    search_fields = ['user__email'] 


class AdminOrderDetailUpdateView(generics.RetrieveUpdateAPIView):
    """Combines Detail and Status Update into one efficient endpoint"""
    queryset = Order.objects.all()
    serializer_class = OrderDetailSerializer
    permission_classes = [IsAuthenticated, IsAdminOrStaff]