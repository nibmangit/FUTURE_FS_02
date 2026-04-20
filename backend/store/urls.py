from django.urls import path
from .views import *

urlpatterns = [
    path("cart/", CartView.as_view(), name="cart"),
    path("products/", ProductListView.as_view(), name="products"),
    path("products/<uuid:id>/", ProductDetailView.as_view(), name="product-detail"),
    path("cart/add/", AddOrUpdateCartItemView.as_view(), name="dd-or-update-cart-item"),
    path("cart/remove/<uuid:product_id>/", RemoveCartItemView.as_view(), name="remove-cart-item"),
]