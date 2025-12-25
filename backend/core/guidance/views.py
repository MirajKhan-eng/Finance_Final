from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .services import get_guidance

@login_required
def guidance_view(request):
    return JsonResponse({"guidance": get_guidance()})
