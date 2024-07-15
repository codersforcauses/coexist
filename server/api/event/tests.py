from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse
# from django.contrib.auth.models import User
from .models import Event, Branch
from .serializers import EventSerializer


class EventandRSVPTests(APITestCase):
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
        # add negative test cases here

    def test_put_events(self):
        url = reverse('event-detail', args=[self.event1.id])
        data = {
            'title': "Updated Event 1",
            'description': "Updated Description 1",
            'start_time': "2024-07-10T10:00:00Z",
            'end_time': "2024-07-10T12:00:00Z",
            'location': "Updated Location 1",
            'branch': self.branch.id,
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.event1.refresh_from_db()
        self.assertEqual(self.event1.title, data['title'])
        self.assertEqual(self.event1.description, data['description'])
        self.assertEqual(self.event1.location, data['location'])
        # add negative test cases here

    def test_post_events(self):
        url = reverse('event-list')
        data = {
            'title': "New Event",
            'description': "New Description",
            'start_time': "2024-07-13T10:00:00Z",
            'end_time': "2024-07-13T12:00:00Z",
            'location': "New Location",
            'branch': self.branch.id,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Event.objects.count(), 4)
        new_event = Event.objects.get(title="New Event")
        self.assertEqual(new_event.description, data['description'])
        self.assertEqual(new_event.location, data['location'])
        # add negative test cases here

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
        # add negative test cases here

    def test_delete_event(self):
        url = reverse('event-detail', kwargs={'pk': self.event1.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Event.objects.filter(id=self.event1.id).exists())
        # add negative test cases here
