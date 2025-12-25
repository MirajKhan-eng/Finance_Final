from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from transactions.services import get_transactions
from .services import detect_fraud

@login_required
def fraud_alerts(request):
    txns = get_transactions()
    alerts = detect_fraud(txns)
    return JsonResponse({"alerts": alerts})
