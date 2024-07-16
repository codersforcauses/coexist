from django.test import TestCase
from rest_framework.test import APITestCase
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


class BranchTestCase(APITestCase):
    def setUp(self):
        self.branch = Branch.objects.create(name="Test1", description="Desc1")
        self.branch2 = Branch.objects.create(name="Test2", description="Desc2")
        self.branch3 = Branch.objects.create(name="Test3", description="Desc3")
        self.url = reverse("branch-list")

    def test_get_all_branches(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

        self.assertIn("count", response.data)
        self.assertIn("next", response.data)
        self.assertIn("previous", response.data)
        self.assertIn("results", response.data)

        self.assertEqual(response.data["count"], 3)

    def test_get_single_branch(self):
        response = self.client.get(f"{self.url}{self.branch.id}/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["name"], "Test1")

        # "does not exist" case
        response = self.client.get(f"{self.url}4/")
        self.assertEqual(response.status_code, 404)

    def test_post_branch(self):
        response = self.client.post(self.url, {"name": "Test4", "description": "Desc4"})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["name"], "Test4")

        # "missing field" case
        response = self.client.post(self.url, {"name": "Test4"})
        self.assertEqual(response.status_code, 400)

        # "empty field" case
        response = self.client.post(self.url, {"name": "", "description": "Desc4"})
        self.assertEqual(response.status_code, 400)

        # "unauthorised" case
        response = self.client.post(
            f"{self.url}4/", {"name": "Test5", "description": "Desc5"}
        )
        self.assertEqual(response.status_code, 405)

    def test_put_branch(self):
        response = self.client.put(
            f"{self.url}{self.branch.id}/", {"name": "Test5", "description": "Desc5"}
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["name"], "Test5")

        # "missing field" case
        response = self.client.put(f"{self.url}{self.branch.id}/", {"name": "Test5"})
        self.assertEqual(response.status_code, 400)

        # "empty field" case
        response = self.client.put(
            f"{self.url}{self.branch.id}/", {"name": "", "description": "Desc5"}
        )
        self.assertEqual(response.status_code, 400)

        # "invalid field" case
        response = self.client.put(
            f"{self.url}{self.branch.id}/", {"name": "Test6", "invalid": "invalid"}
        )
        self.assertEqual(response.status_code, 400)

        # "does not exist" case
        response = self.client.put(
            f"{self.url}4/", {"name": "Test5", "description": "Desc5"}
        )
        self.assertEqual(response.status_code, 404)

    def test_patch_branch(self):
        response = self.client.patch(f"{self.url}{self.branch.id}/", {"name": "Test6"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["name"], "Test6")

        # "empty field" case
        response = self.client.patch(f"{self.url}{self.branch.id}/", {"name": ""})
        self.assertEqual(response.status_code, 400)

        # "does not exist" case
        response = self.client.patch(f"{self.url}4/", {"name": "Test6"})
        self.assertEqual(response.status_code, 404)

    def test_delete_branch(self):
        response = self.client.delete(f"{self.url}{self.branch.id}/")
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(Branch.objects.all()), 2)
        self.assertEqual(len(Branch.objects_deleted.all()), 1)
        self.assertEqual(Branch.objects_deleted.all()[0].name, "Test1")
        self.branch.restore()
        self.assertEqual(len(Branch.objects.all()), 3)
        self.assertEqual(len(Branch.objects_deleted.all()), 0)

        # "does not exist" case
        response = self.client.delete(f"{self.url}4/")
        self.assertEqual(response.status_code, 404)
