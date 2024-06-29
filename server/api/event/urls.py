from django.urls import path
from . import views

urlpatterns = [
    path("<int:event_id>/", views.get_event),
]
