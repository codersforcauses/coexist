from rest_framework import viewsets

from .serializers import EventSerializer
from .models import Event

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["title", "location", "is_cancelled"]
    search_fields = ["title", "description", "location", "is_cancelled"]
