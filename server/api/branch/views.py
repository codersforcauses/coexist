from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny

from .models import Branch
from .serializers import BranchSerializer
class BranchResultPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = "page_size"
    max_page_size = 100


# Create your views here.

@permission_classes([AllowAny])
class BranchViewSet(viewsets.ModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
    pagination_class = BranchResultPagination
