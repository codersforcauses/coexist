from . import views

from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ExtendedUserViewSet

router = DefaultRouter()
router.register(r"user", ExtendedUserViewSet, basename="extuser")

urlpatterns = [
    path('register/', views.create, name='create-user'),
    path('me/', ExtendedUserViewSet.as_view({'get': 'me'}), name='user-me'),
]
