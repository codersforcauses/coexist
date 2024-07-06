from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers  # requires drf_nested_routers
from . import views

router = DefaultRouter()
router.register(r'', views.EventViewSet, basename='event')

event_router = routers.NestedDefaultRouter(router, r'', lookup='event_pk')
event_router.register(r'rsvps', views.RSVPViewSet, basename='event-rsvps')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(event_router.urls)),
]
