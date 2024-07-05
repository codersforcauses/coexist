from rest_framework import viewsets

from .serializers import EventSerializer
from .serializers import RSVPSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Event
from .models import RSVP


from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["title", "location", "is_cancelled"]
    search_fields = ["title", "description", "location", "is_cancelled"]


class RSVPViewSet(viewsets.ModelViewSet):
    queryset = RSVP.objects.all()
    serializer_class = RSVPSerializer
    # Only those who authorise/signed in can make reservations
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def get_queryset(self):
        return self.queryset.filter(event__id=self.kwargs['event_id'])

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
