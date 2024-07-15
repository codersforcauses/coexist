from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIClient
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
        self.branch = Branch.objects.create(name="test2", description="test2")
        self.postData = {
            "title": "My Event",
            "description": "This is a description of my event.",
            "start_time": "2024-07-13T14:00:00Z",
            "end_time": "2024-07-13T16:00:00Z",
            "location": "123 Event St",
            "branch": self.branch.pk,
            "is_cancelled": False,
        }

    def test_unauthorized(self):
        self.client.login(username=USER, password=USER_PASS)
        response = self.client.post(self.url, data=self.postData, format="json")
        getResponse = self.client.get(self.url)
        self.assertEqual(getResponse.status_code, status.HTTP_200_OK)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.client.logout()

    def test_authorized(self):
        self.client.login(username=ADMIN, password=ADMIN_PASS)
        response = self.client.post(self.url, data=self.postData, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.client.logout()

    def test_authentication(self):
        response = self.client.get(self.url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
