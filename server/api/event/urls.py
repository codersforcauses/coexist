from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"", views.EventViewSet, basename="event")

urlpatterns = [
    path("", include(router.urls)),
    path("<int:event_id>/rsvp/", views.rsvp_list_create, name="rsvp-list-create"),
    path("<int:event_id>/rsvp/<int:id>/", views.rsvp_detail, name="rsvp-detail"),
    path("<int:event_id>/has_rsvp", views.has_rsvp, name="has-rsvp"),
]
