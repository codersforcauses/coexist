from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny


# Create your views here.
@api_view(["GET"])
@permission_classes([AllowAny])
def ping(request):
    return HttpResponse("Pong!", status=200)
