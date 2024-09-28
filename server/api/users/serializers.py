from .models import ExtendedUser
from rest_framework import serializers


class ExtendedUserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='user.id', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name',
                                       read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    role = serializers.CharField(read_only=True)
    branch = serializers.CharField(source='branch.name', read_only=True)

    class Meta:
        model = ExtendedUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role',
                  'phone', 'branch']
