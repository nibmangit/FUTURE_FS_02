from django.urls import path
from .views.orders import AdminOrderListView, AdminOrderDetailUpdateView
from .views.products import (
    AdminProductListCreateView, AdminProductDetailView, 
    AdminCategoryListCreateView, AdminCategoryDetailView 
)

urlpatterns = [
    # Orders
    path("orders/", AdminOrderListView.as_view(), name="admin-orders"), 
    path("orders/<uuid:pk>/", AdminOrderDetailUpdateView.as_view(), name="admin-order-detail-update"),
    
    # Products
    path("products/", AdminProductListCreateView.as_view(), name="admin-product-list"),
    path("products/<uuid:pk>/", AdminProductDetailView.as_view(), name="admin-product-detail"),
    
    # Categories
    path("categories/", AdminCategoryListCreateView.as_view(), name="admin-category-list"),
    path("categories/<uuid:pk>/", AdminCategoryDetailView.as_view(), name="admin-category-detail"),
]