from django.urls import path
from .views import fraud_check

urlpatterns = [
    path("check/", fraud_check),
]
