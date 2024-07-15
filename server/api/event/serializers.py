from rest_framework import serializers
from .models import Event
from rest_framework.parsers import MultiPartParser, FormParser

from .models import RSVP
from ..branch.serializers import BranchSerializer


class EventSerializer(serializers.ModelSerializer):
    branch = BranchSerializer(read_only=True)

    class Meta:
        model = Event
        fields = "__all__"
        parser_classes = (MultiPartParser, FormParser)
        read_only_fields = ("id", "created_time", "updated_time")


class RSVPSerializer(serializers.ModelSerializer):
    class Meta:
        model = RSVP
        fields = ['id', 'user', 'event', 'created_at', 'updated_at']
