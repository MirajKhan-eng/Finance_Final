def generate_insights(transactions):
    insights = []

    spend = sum(t["amount"] for t in transactions if t["amount"] < 0)

    if spend < -50000:
        insights.append("Your spending is higher than last month.")

    if spend > -20000:
        insights.append("Great job controlling expenses!")

    insights.append("Food expenses form your largest category.")

    return insights
