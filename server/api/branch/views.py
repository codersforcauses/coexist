from .models import Branch
from rest_framework import viewsets
from .serializers import BranchSerializer
from rest_framework.pagination import PageNumberPagination
from api.auth.permissions import isStaffOrAuthenticated


class BranchResultPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = "page_size"
    max_page_size = 100


# Create your views here.
class BranchViewSet(viewsets.ModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
    pagination_class = BranchResultPagination
