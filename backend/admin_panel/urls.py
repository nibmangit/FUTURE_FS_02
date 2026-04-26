from django.urls import path
from .views.orders import (AdminOrderListView, AdminOrderDetailView, AdminOrderStatusUpdateView, )
from .views.products import (AdminProductListCreateView, AdminProductDetailView, AdminCategoryListCreateView, AdminCategoryDetailView )

urlpatterns = [
    #order
    path("orders/", AdminOrderListView.as_view(), name="admin-orders"),
    path("orders/<uuid:pk>/", AdminOrderDetailView.as_view(), name="admin-order-detail"),
    path("orders/<uuid:pk>/status/", AdminOrderStatusUpdateView.as_view(), name="admin-order-status"),
    
    #products
    path("products/", AdminProductListCreateView.as_view()),
    path("products/<uuid:pk>/", AdminProductDetailView.as_view()),
    
    #categories
    path("categories/", AdminCategoryListCreateView.as_view()),
    path("categories/<uuid:pk>/", AdminCategoryDetailView.as_view()),
]