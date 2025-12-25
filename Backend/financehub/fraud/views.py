from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def fraud_check(request):
    if request.method == "POST":
        data = json.loads(request.body)

        amount = data.get("amount")
        avg_amount = data.get("average_amount")
        merchant = data.get("merchant")
        known_merchants = data.get("known_merchants", [])
        last_amount = data.get("last_amount")

        alerts = []

        # Expense spike
        if amount > avg_amount * 2:
            alerts.append("Expense Spike Detected")

        # Duplicate charge
        if amount == last_amount:
            alerts.append("Possible Duplicate Transaction")

        # Unknown merchant
        if merchant not in known_merchants:
            alerts.append("Unknown Merchant")

        return JsonResponse({
            "fraud_alerts": alerts,
            "status": "checked"
        })
