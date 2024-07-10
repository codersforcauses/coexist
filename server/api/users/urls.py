from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import UserViewSet

router = DefaultRouter()
router.register(r"user", UserViewSet, basename="user")

urlpatterns = [
    path('me/', UserViewSet.as_view({'get': 'retrieve'})),
]
