from rest_framework import serializers
from .models import Event
from .models import RSVP


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"
        read_only_fields = ("id", "created_time", "updated_time")


class RSVPSerializer(serializers.ModelSerializer):
    # user = UserSerializer(read_only=True)

    class Meta:
        model = RSVP
        depth = 1
        fields = ['id', 'user', 'event', 'created_at', 'updated_at']
