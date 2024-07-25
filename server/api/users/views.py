from rest_framework import viewsets

from .serializers import ExtendedUserSerializer
from .models import ExtendedUser

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from rest_framework.permissions import IsAuthenticated

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status


class ExtendedUserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = ExtendedUser.objects.all()
    serializer_class = ExtendedUserSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = []
    search_fields = []

    @action(detail=False, methods=['get'],
            permission_classes=[IsAuthenticated])
    def me(self, request):
        user = request.user.extendeduser
        serializer = self.get_serializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
