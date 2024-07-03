from rest_framework import serializers
from .models import Branch


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = "__all__"
        read_only_fields = ("id", "created_time", "updated_time")
