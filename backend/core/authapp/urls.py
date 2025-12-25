from django.urls import path
from .views import signup, login_user, profile

urlpatterns = [
    path("signup/", signup),
    path("login/", login_user),
    path("profile/", profile),
]
