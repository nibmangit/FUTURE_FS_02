from django.urls import path
from .views import *

urlpatterns = [
    path("cart/", CartView.as_view(), name="cart"),
    path("products/", ProductListView.as_view(), name="products"),
    path("cart/add/", AddToCartView.as_view(), name="add-to-cart"),
]