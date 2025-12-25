def create_link_token(user):
    return {
        "link_token": "link-sandbox-123456",
        "expiration": "2026-01-01T00:00:00Z"
    }


def exchange_public_token(public_token):
    return {
        "access_token": "access-sandbox-token",
        "item_id": "item-001"
    }


def get_accounts():
    return [
        {
            "account_id": "acc_1",
            "name": "HDFC Savings",
            "type": "depository",
            "balance": 452500.75,
            "currency": "INR"
        },
        {
            "account_id": "acc_2",
            "name": "ICICI Credit Card",
            "type": "credit",
            "balance": -32500.50,
            "currency": "INR"
        }
    ]
