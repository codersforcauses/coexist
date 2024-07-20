from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework import status, serializers, viewsets
from django.contrib.auth.models import User
from .models import ExtendedUser
from .serializers import ExtendedUserSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny


#import random

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']

    def create(self, data):
        user = User.objects.create_user(
            first_name=data['first_name'],
            last_name=data['last_name'],
            username=data['email'],
            email=data['email'],
            password=data['password'],

        )

        extended_user, created = ExtendedUser.objects.get_or_create(user=user)
        extended_user.set_role('Attendee')
        return user


@api_view(['POST'])
@permission_classes([AllowAny])
def create(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        try:
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
