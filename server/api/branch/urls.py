from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"", views.BranchViewSet, basename="branch")

urlpatterns = [path("", include(router.urls))]
