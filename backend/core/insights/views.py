from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from transactions.services import get_transactions
from .services import generate_insights

@login_required
def insights_view(request):
    txns = get_transactions()
    return JsonResponse({"insights": generate_insights(txns)})
