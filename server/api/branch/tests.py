from django.test import TestCase
from .models import Branch
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status


# is_deleted model is tested here as well
# Create your tests here.


class SoftDeleteTestCase(TestCase):
    def setUp(self):
        self.branch = Branch.objects.create(name="Test", description="somethings")
        self.branch2 = Branch.objects.create(name="Test2", description="somethings")
        self.branch3 = Branch.objects.create(name="Test3", description="somethings")

    def test_soft_is_deleted(self):
        self.branch.delete()
        self.assertTrue(self.branch.is_deleted)

    def test_restore(self):
        self.branch.delete()
        self.branch.restore()
        self.assertFalse(self.branch.is_deleted)

    def test_GetAll(self):
        self.branch.restore()
        self.assertEqual(len(Branch.objects.all()), 3)
        self.branch.delete()
        self.branch2.delete()
        self.assertEqual(len(Branch.objects.all()), 1)

    def test_GetAllExceptis_deleted(self):
        self.assertEqual(len(Branch.objects_deleted.all()), 0)
        self.branch.delete()
        self.branch2.delete()
        self.assertEqual(len(Branch.objects_deleted.all()), 2)


ADMIN = "adminTest2"
ADMIN_PASS = "adminTestPassword2"


USER = "normalUser2"
USER_PASS = "normalUserPassword2"


class BranchAuthTest(TestCase):

    def setUp(self) -> None:
        self.client = APIClient()
        self.adminUser: User = User.objects.create_user(
            username=ADMIN, password=ADMIN_PASS, is_staff=True
        )
        self.url = reverse("branch-list")
        self.user: User = User.objects.create_user(username=USER, password=USER_PASS)
        self.postData = {
            "name": "My Branch",
            "description": "This is a description of my Branch.",
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
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
