def detect_fraud(transactions):
    alerts = []

    for t in transactions:
        if abs(t["amount"]) > 20000:
            alerts.append({
                "transaction_id": t["id"],
                "risk": "HIGH",
                "reason": "Unusually large transaction"
            })

        if t["category"] == "Shopping" and abs(t["amount"]) > 3000:
            alerts.append({
                "transaction_id": t["id"],
                "risk": "MEDIUM",
                "reason": "High shopping expenditure"
            })

    return alerts
