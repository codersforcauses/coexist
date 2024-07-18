from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIClient, APITestCase
from api.branch.models import Branch
from rest_framework import status
from .serializers import EventSerializer
from api.event.models import Event

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
        self.user: User = User.objects.create_user(username=USER,
                                                   password=USER_PASS)
        self.url = reverse("event-list")
        self.branch = Branch.objects.create(name="test2", description="test2")
        self.postData = {
            "title": "My Event",
            "description": "This is a description of my event.",
            "start_time": "2024-07-13T14:00:00Z",
            "end_time": "2024-07-13T16:00:00Z",
            "location": "123 Event St",
            "branch_id": self.branch.pk,
            "is_cancelled": False,
        }

    def test_unauthorized(self):
        self.client.login(username=USER, password=USER_PASS)
        response = self.client.post(self.url, data=self.postData,
                                    format="json")
        getResponse = self.client.get(self.url)
        self.assertEqual(getResponse.status_code, status.HTTP_200_OK)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.client.logout()

    def test_authorized(self):
        self.client.login(username=ADMIN, password=ADMIN_PASS)
        response = self.client.post(self.url,
                                    data=self.postData, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.client.logout()

    def test_authentication(self):
        response = self.client.get(self.url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()


class EventTest(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.adminUser = User.objects.create_user(
            username="adminTest", password="adminTestPassword", is_staff=True
        )
        self.user = User.objects.create_user(
            username='testuser', password="password", email="admin@test.com"
        )

        self.branch = Branch.objects.create(name="Branch 1", description="123 Street")
        self.event1 = Event.objects.create(
            title="Event 1",
            description="Description 1",
            start_time="2024-07-10T10:00:00Z",
            end_time="2024-07-10T12:00:00Z",
            location="Location 1",
            branch=self.branch,
        )
        self.event2 = Event.objects.create(
            title="Event 2",
            description="Description 2",
            start_time="2024-07-11T10:00:00Z",
            end_time="2024-07-11T12:00:00Z",
            location="Location 2",
            branch=self.branch,
        )
        self.event3 = Event.objects.create(
            title="Event 3",
            description="Description 3",
            start_time="2024-07-12T10:00:00Z",
            end_time="2024-07-12T12:00:00Z",
            location="Location 3",
            branch=self.branch,
        )
        self.client.login(username="adminTest", password="adminTestPassword")

    def test_get_all_events(self):
        response = self.client.get(reverse('event-list'))
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data)-1, len(serializer.data))

    def test_put_events(self):
        url = reverse('event-detail', args=[self.event1.id])
        data = {
            'title': "Updated Event 1",
            'description': "Updated Description 1",
            'start_time': "2024-07-10T10:00:00Z",
            'end_time': "2024-07-10T12:00:00Z",
            'location': "Updated Location 1",
            'branch_id': self.branch.pk,
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.event1.refresh_from_db()
        self.assertEqual(self.event1.title, data['title'])
        self.assertEqual(self.event1.description, data['description'])
        self.assertEqual(self.event1.location, data['location'])

    def test_post_events(self):
        url = reverse('event-list')
        data = {
            'title': "New Event",
            'description': "New Description",
            'start_time': "2024-07-13T10:00:00Z",
            'end_time': "2024-07-13T12:00:00Z",
            'location': "New Location",
            'branch_id': self.branch.pk,
        }
        response = self.client.post(url, data, format='json')
        print("POST Response Data:", response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Event.objects.count(), 4)
        new_event = Event.objects.get(title="New Event")
        self.assertEqual(new_event.description, data['description'])
        self.assertEqual(new_event.location, data['location'])
        # negative test case where this is no title
        data.pop('title')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_patch_event(self):
        url = reverse('event-detail', kwargs={'pk': self.event1.id})
        data = {
            'title': "Updated Event Title",
            'description': "Updated Description",
        }
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        updated_event = Event.objects.get(id=self.event1.id)
        self.assertEqual(updated_event.title, data['title'])
        self.assertEqual(updated_event.description, data['description'])

        # negative test case where this is no title
        data = {'title': ""}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_event(self):
        url = reverse('event-detail', kwargs={'pk': self.event1.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Event.objects.filter(id=self.event1.id).exists())
