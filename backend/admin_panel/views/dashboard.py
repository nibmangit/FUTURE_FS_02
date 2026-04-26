from django.db.models import Sum, Count, Q
from django.db.models.functions import TruncDate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from orders.models import Order, OrderItem
from store.models import Product
from admin_panel.permissions import IsAdminOrStaff

# Recommended: Move this to a separate serializers.py file later
class AdminDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsAdminOrStaff]

    def get(self, request):
        # 1. Optimized Order Stats (Single Query!)
        order_stats = Order.objects.aggregate(
            total=Count('id'),
            pending=Count('id', filter=Q(status='pending')),
            paid=Count('id', filter=Q(status='paid')),
            shipped=Count('id', filter=Q(status='shipped')),
            delivered=Count('id', filter=Q(status='delivered')),
            revenue=Sum('total_price', filter=Q(status__in=["paid", "shipped", "delivered"]))
        )

        # 2. Daily Revenue
        daily_revenue = (
            Order.objects.filter(status__in=["paid", "shipped", "delivered"])
            .annotate(date=TruncDate("created_at"))
            .values("date")
            .annotate(revenue=Sum("total_price"))
            .order_by("date")
        )

        # 3. Top Selling Products
        top_products = (
            OrderItem.objects
            .filter(order__status__in=["paid", "shipped", "delivered"])
            .values("product__id", "product__title")
            .annotate(total_sold=Sum("quantity"))
            .order_by("-total_sold")[:5]
        )

        # 4. Low Stock Alert
        low_stock = Product.objects.filter(stock__lte=5).values("id", "title", "stock")[:5]

        # Structure the final response
        return Response({
            "order_summary": {
                "total": order_stats['total'],
                "pending": order_stats['pending'],
                "paid": order_stats['paid'],
                "shipped": order_stats['shipped'],
                "delivered": order_stats['delivered'],
            },
            "total_revenue": order_stats['revenue'] or 0,
            "daily_revenue": list(daily_revenue), # values() returns dicts, easy to listify
            "top_products": [
                {
                    "id": p["product__id"], 
                    "title": p["product__title"], 
                    "sold": p["total_sold"]
                } for p in top_products
            ],
            "low_stock": list(low_stock)
        })