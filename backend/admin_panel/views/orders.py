from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from orders.models import Order
from admin_panel.serializers.order_admin import *
from admin_panel.permissions import IsAdminOrStaff


class AdminOrderListView(APIView):
    permission_classes = [IsAuthenticated, IsAdminOrStaff]

    def get(self, request):
        orders = Order.objects.all().order_by("-created_at")
        serializer = OrderListSerializer(orders, many=True)
        return Response(serializer.data)
    
class AdminOrderDetailView(APIView):
    permission_classes = [IsAuthenticated, IsAdminOrStaff]

    def get(self, request, pk):
        try:
            order = Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=404)

        serializer = OrderDetailSerializer(order)
        return Response(serializer.data)
    

class AdminOrderStatusUpdateView(APIView):
    permission_classes = [IsAuthenticated, IsAdminOrStaff]

    def patch(self, request, pk):
        try:
            order = Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=404)

        new_status = request.data.get("status")

        if new_status not in dict(Order.STATUS_CHOICES):
            return Response(
                {"error": "Invalid status"},
                status=400
            )

        order.status = new_status
        order.save()

        serializer = OrderDetailSerializer(order)
        return Response(serializer.data)