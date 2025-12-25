from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .services import get_transactions

@login_required
def transaction_list(request):
    return JsonResponse({"transactions": get_transactions()})
