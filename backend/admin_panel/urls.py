from django.urls import path
from .views.orders import (
    AdminOrderListView,
    AdminOrderDetailView,
    AdminOrderStatusUpdateView,
)

urlpatterns = [
    path("orders/", AdminOrderListView.as_view(), name="admin-orders"),
    path("orders/<uuid:pk>/", AdminOrderDetailView.as_view(), name="admin-order-detail"),
    path("orders/<uuid:pk>/status/", AdminOrderStatusUpdateView.as_view(), name="admin-order-status"),
]