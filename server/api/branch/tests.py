from django.test import TestCase
from rest_framework.test import APITestCase
from .models import Branch


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


class BranchTestCase(APITestCase):
    def setUp(self):
        self.branch = Branch.objects.create(name="Test1", description="Desc1")
        self.branch2 = Branch.objects.create(name="Test2", description="Desc2")
        self.branch3 = Branch.objects.create(name="Test3", description="Desc3")

    def test_get_all_branches(self):
        response = self.client.get('/api/branch/')
        self.assertEqual(response.status_code, 200)

        self.assertIn('count', response.data)
        self.assertIn('next', response.data)
        self.assertIn('previous', response.data)
        self.assertIn('results', response.data)

        self.assertEqual(response.data['count'], 3)

    def test_get_single_branch(self):
        response = self.client.get(f'/api/branch/{self.branch.id}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['name'], 'Test1')

        # "does not exist" case
        response = self.client.get('/api/branch/4/')
        self.assertEqual(response.status_code, 404)

    def test_post_branch(self):
        response = self.client.post('/api/branch/', {
            'name': 'Test4',
            'description': 'Desc4'
        })
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['name'], 'Test4')

        # "missing field" case
        response = self.client.post('/api/branch/', {
            'name': 'Test4'
        })
        self.assertEqual(response.status_code, 400)

        # "empty field" case
        response = self.client.post('/api/branch/', {
            'name': '',
            'description': 'Desc4'
        })
        self.assertEqual(response.status_code, 400)

        # "unauthorised" case
        response = self.client.post('/api/branch/4/', {
            'name': 'Test5',
            'description': 'Desc5'
        })
        self.assertEqual(response.status_code, 405)

    def test_put_branch(self):
        response = self.client.put(f'/api/branch/{self.branch.id}/', {
            'name': 'Test5',
            'description': 'Desc5'
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['name'], 'Test5')

        # "missing field" case
        response = self.client.put(f'/api/branch/{self.branch.id}/', {
            'name': 'Test5'
        })
        self.assertEqual(response.status_code, 400)

        # "empty field" case
        response = self.client.put(f'/api/branch/{self.branch.id}/', {
            'name': '',
            'description': 'Desc5'
        })
        self.assertEqual(response.status_code, 400)

        # "invalid field" case
        response = self.client.put(f'/api/branch/{self.branch.id}/', {
            'name': 'Test6',
            'invalid': 'invalid'
        })
        self.assertEqual(response.status_code, 400)

        # "does not exist" case
        response = self.client.put('/api/branch/4/', {
            'name': 'Test5',
            'description': 'Desc5'
        })
        self.assertEqual(response.status_code, 404)

    def test_patch_branch(self):
        response = self.client.patch(f'/api/branch/{self.branch.id}/', {
            'name': 'Test6'
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['name'], 'Test6')

        # "empty field" case
        response = self.client.patch(f'/api/branch/{self.branch.id}/', {
            'name': ''
        })
        self.assertEqual(response.status_code, 400)

        # "does not exist" case
        response = self.client.patch('/api/branch/4/', {
            'name': 'Test6'
        })
        self.assertEqual(response.status_code, 404)

    def test_delete_branch(self):
        response = self.client.delete(f'/api/branch/{self.branch.id}/')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(Branch.objects.all()), 2)
        self.assertEqual(len(Branch.objects_deleted.all()), 1)
        self.assertEqual(Branch.objects_deleted.all()[0].name, 'Test1')
        self.branch.restore()
        self.assertEqual(len(Branch.objects.all()), 3)
        self.assertEqual(len(Branch.objects_deleted.all()), 0)

        # "does not exist" case
        response = self.client.delete('/api/branch/4/')
        self.assertEqual(response.status_code, 404)
