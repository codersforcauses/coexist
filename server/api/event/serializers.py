from rest_framework import serializers
from .models import Event
from rest_framework.parsers import MultiPartParser, FormParser

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")
        parser_classes = (MultiPartParser, FormParser)
