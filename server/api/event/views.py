from rest_framework import viewsets

from .serializers import EventSerializer, RSVPSerializer
from .models import Event, RSVP

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from django.shortcuts import get_object_or_404


class EventResultPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = "page_size"
    max_page_size = 100


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    pagination_class = EventResultPagination
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter
    ]
    filterset_fields = ["title", "branch", "is_cancelled"]
    ordering_fields = ["title", "branch"]
    ordering = ["title", "branch"]
    search_fields = ["title", "description", "location", "branch"]


@api_view(['GET', 'POST'])
def rsvp_list_create(request, event_id):
    if request.method == 'GET':
        rsvps = RSVP.objects.filter(event__id=event_id)
        serializer = RSVPSerializer(rsvps, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        event = get_object_or_404(Event, id=event_id)
        serializer = RSVPSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, event=event)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PATCH', 'DELETE'])
def rsvp_detail(request, event_id, id):
    rsvp = get_object_or_404(RSVP, event__id=event_id, id=id)

    if request.method == 'GET':
        serializer = RSVPSerializer(rsvp)
        return Response(serializer.data)

    elif request.method == 'PATCH':
        serializer = RSVPSerializer(rsvp, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        rsvp.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
