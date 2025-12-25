from django.urls import path
from .views import fraud_alerts

urlpatterns = [
    path("", fraud_alerts),
]
