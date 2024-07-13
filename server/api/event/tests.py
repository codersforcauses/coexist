from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from .models import Event
from api.branch.models import Branch
from rest_framework import status

ADMIN = "adminTest"
ADMIN_PASS = "adminTestPassword"


USER = "normalUser"
USER_PASS = "normalUserPassword"


class EventAuthTest(TestCase):

    def setUp(self) -> None:
        self.client = APIClient()
        self.adminUser: User = User.objects.create_user(
            username=ADMIN, password=ADMIN_PASS, is_staff=True
        )
        self.user: User = User.objects.create_user(username=USER, password=USER_PASS)
        self.url = reverse("event-list")
        self.postData = {
            "title": "My Event",
            "description": "This is a description of my event.",
            "start_time": "2024-07-13T14:00:00Z",
            "end_time": "2024-07-13T16:00:00Z",
            "location": "123 Event St",
            "branch": 1,  # Assuming this branch ID exists in the database
            "is_cancelled": False,
        }
        self.branch = Branch.objects.create(name="test2", description="test2")

    def test_unauthorized(self):
        self.client.login(username=USER, password=USER_PASS)
        response = self.client.post(self.url, data=self.postData, format="json")
        getResponse = self.client.get(reverse("event-list"))
        self.assertEqual(getResponse.status_code, status.HTTP_200_OK)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.client.logout()

    def test_authorized(self):
        self.client.login(username=ADMIN, password=ADMIN_PASS)
        response = self.client.post(self.url, data=self.postData, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.client.logout()


# created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     title = models.CharField(max_length=200)
#     description = models.TextField()
#     image = models.ImageField(upload_to="static/images", blank=True, null=True)
#     start_time = models.DateTimeField()
#     end_time = models.DateTimeField(null=True, blank=True)
#     location = models.CharField(max_length=200)
#     branch = models.ForeignKey(Branch, on_delete=models.CASCADE,
#                                related_name="events")
#     is_cancelled = models.BooleanField(default=False)
