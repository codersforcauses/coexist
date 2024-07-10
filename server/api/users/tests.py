from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth.models import User


class UserTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client = APIClient()

    def test_authenticated_user(self):
        self.client.login(username='testuser', password='testpassword')
        response = self.client.get(reverse('user-me'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['username'], 'testuser')

    def test_unauthenticated_user(self):
        response = self.client.get(reverse('user-me'))
        self.assertEqual(response.status_code, 401)
