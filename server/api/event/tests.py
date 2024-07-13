from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse
# from django.contrib.auth.models import User
from .models import Event, Branch
from .serializers import EventSerializer


class EventViewSetTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.branch = Branch.objects.create(name="Branch 1",
                                            description="123 Street")
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

    def test_get_all_events(self):
        response = self.client.get(reverse('event-list'))
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_put_events(self):
        pass

    def test_post_events(self):
        pass

    def test_patch_events(self):
        pass

    def test_delete_events(self):
        pass
