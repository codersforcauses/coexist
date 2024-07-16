from django.test import TestCase
from rest_framework.test import APITestCase
from .models import Branch
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse


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
