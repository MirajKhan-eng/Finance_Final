from django.urls import path
from .views import link_token, exchange_token, accounts

urlpatterns = [
    path("link-token/", link_token),
    path("exchange/", exchange_token),
    path("accounts/", accounts),
]
