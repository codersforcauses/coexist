from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"", views.EventViewSet, basename="event")

urlpatterns = [
    path("", include(router.urls))
]
