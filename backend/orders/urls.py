from django.urls import path
from .views import *

urlpatterns = [
    path("", OrderHistoryView.as_view(), name="orders"),
    path("checkout/", CheckoutView.as_view(), name="checkouts"), 
    path("addresses/", ShippingAddressViewSet.as_view(), name="hipping-address"), 
]