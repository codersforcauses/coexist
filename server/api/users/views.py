from rest_framework import viewsets

from .serializers import ExtendedUserSerializer
from .models import ExtendedUser

from .serializers import UserSerializer
from django.contrib.auth.models import User


from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404


class ExtendedUserViewSet(viewsets.ModelViewSet):
    queryset = ExtendedUser.objects.all()
    serializer_class = ExtendedUserSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["user"]
    search_fields = []


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["username"]
    search_fields = []
