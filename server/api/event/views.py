from django.db import IntegrityError
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from django.utils import timezone

from rest_framework import viewsets
from rest_framework.request import HttpRequest
from api.auth.permissions import isStaffOrReadonly, isStaffOrAuthenticated, isPosterOrReadonly

from .serializers import EventSerializer, RSVPSerializer
from .models import Event, RSVP
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from rest_framework.decorators import api_view, permission_classes
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
        filters.OrderingFilter,
    ]
    filterset_fields = ["title", "branch", "is_cancelled"]
    ordering_fields = ["title", "branch"]
    ordering = ["title", "branch"]
    search_fields = ["title", "description", "location", "branch"]

    permission_classes = [isPosterOrReadonly]

    def get_queryset(self):
        if self.action == 'list':
            current_time = timezone.now()
            return Event.objects.filter(end_time__gt=current_time)
        return super().get_queryset()


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def event_by_branch(request, branch_id):
    current_time = timezone.now()
    events = Event.objects.filter(branch_id=branch_id, end_time__gt=current_time)
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)


@api_view(["GET", "POST", "DELETE"])
@permission_classes([IsAuthenticated])
def rsvp_event_view(request: HttpRequest, event_id):
    if request.method == "GET":
        rsvps = RSVP.objects.filter(event__id=event_id)
        serializer = RSVPSerializer(rsvps, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        rsvp = RSVP(event_id=event_id, user=request.user)
        try:
            rsvp.save()
        except IntegrityError:
            return Response(status=status.HTTP_409_CONFLICT)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        # Return data
        response_data = {}
        response_data["rsvp_id"] = rsvp.id
        return Response(response_data, status=status.HTTP_201_CREATED)

    elif request.method == "DELETE":
        try:
            rsvp = RSVP.objects.get(event_id=event_id, user=request.user)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        rsvp.delete()
        return Response(status=status.HTTP_200_OK)


@api_view(["GET", "PATCH", "DELETE"])
@permission_classes([isStaffOrReadonly])
def rsvp_detail(request, event_id, id):
    rsvp = get_object_or_404(RSVP, event__id=event_id, id=id)

    if request.method == "GET":
        serializer = RSVPSerializer(rsvp)
        return Response(serializer.data)

    elif request.method == "PATCH":
        serializer = RSVPSerializer(rsvp, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        rsvp.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
@permission_classes([isStaffOrAuthenticated])
def has_rsvp(request, event_id):
    rsvp_id = None
    has_rsvp = None

    try:
        result = RSVP.objects.get(event__id=event_id, user__id=request.user.id)
        rsvp_id = result.pk
        has_rsvp = True
    except ObjectDoesNotExist:
        has_rsvp = False

    response_data = {}
    response_data["has_rsvp"] = has_rsvp
    response_data["rsvp_id"] = rsvp_id
    return JsonResponse(response_data)
