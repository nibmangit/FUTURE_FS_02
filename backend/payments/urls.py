from django.urls import path
from .views import InitializePaymentView, ChapaWebhookView

urlpatterns = [
    path('initiate/', InitializePaymentView.as_view(), name='payment-initiate'),
    path('webhook/', ChapaWebhookView.as_view(), name='payment-webhook'),
]