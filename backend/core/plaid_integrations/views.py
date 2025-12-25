from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .services import create_link_token, exchange_public_token, get_accounts

@login_required
def link_token(request):
    return JsonResponse(create_link_token(request.user))

@login_required
def exchange_token(request):
    return JsonResponse(exchange_public_token("public-sandbox"))

@login_required
def accounts(request):
    return JsonResponse({"accounts": get_accounts()})
