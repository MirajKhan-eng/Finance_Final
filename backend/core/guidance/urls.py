from django.urls import path
from .views import guidance_view

urlpatterns = [
    path("", guidance_view),
]
