from rest_framework import serializers
from .models import Event
from rest_framework.parsers import MultiPartParser, FormParser

from .models import RSVP
from ..branch.serializers import BranchSerializer
from ..users.serializers import ExtendedUserSerializer
from ..users.models import ExtendedUser
from ..branch.models import Branch


class EventSerializer(serializers.ModelSerializer):
    branch = BranchSerializer(read_only=True)
    branch_id = serializers.PrimaryKeyRelatedField(
        queryset=Branch.objects.all(), source="branch"
    )

    class Meta:
        model = Event
        fields = "__all__"
        parser_classes = (MultiPartParser, FormParser)
        read_only_fields = ("id", "created_time", "updated_time")


class RSVPSerializer(serializers.ModelSerializer):
    user = ExtendedUserSerializer(source="user.extendeduser", read_only=True)

    class Meta:
        model = RSVP
        fields = "__all__"
        read_only_fields = ("id", "created_time", "updated_time")