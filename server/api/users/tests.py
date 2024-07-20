from django.test import TestCase
from django.contrib.auth.models import User, Group


from rest_framework.test import APIClient
from .models import ExtendedUser
# Testing models.py
class ExtendedUserTestCase(TestCase):
    def setUp(self):
        
        # Create a user
        self.user = User.objects.create_user(username ='testuser', password='testpassword')


        
        # Create groups
        # self.admin_group = Group.objects.create(name='Admin')
        # self.poster_group = Group.objects.create(name='Poster')
        # self.attendee_group = Group.objects.create(name='Attendee')
        

    def test_extended_user_creation(self):
        
        # Test creating an ExtendedUser object
        extended_user = ExtendedUser.objects.get(user=self.user)
        
        # Check if the ExtendedUser was created correctly
        self.assertEqual(extended_user.user.username, 'testuser')
        self.assertEqual(str(extended_user), 'testuser')

    def test_set_role(self):
        extended_user = ExtendedUser.objects.get(user=self.user)

        # extended_user = ExtendedUser.objects.get(username = "testuser")


        # Set role to Admin
        extended_user.set_role('Admin')
        self.assertTrue(extended_user.is_admin())
        self.assertFalse(extended_user.is_poster())
        self.assertFalse(extended_user.is_attendee())

        # Set role to Poster
        extended_user.set_role('Poster')
        self.assertFalse(extended_user.is_admin())
        self.assertTrue(extended_user.is_poster())
        self.assertFalse(extended_user.is_attendee())

        # Set role to Attendee
        extended_user.set_role('Attendee')
        self.assertFalse(extended_user.is_admin())
        self.assertFalse(extended_user.is_poster())
        self.assertTrue(extended_user.is_attendee())

    def test_role_property(self):
        extended_user = ExtendedUser.objects.get(user=self.user)

        # Test role property when no role is set
        self.assertIsNone(extended_user.role)

        # Set role to Admin
        extended_user.set_role('Admin')
        self.assertEqual(extended_user.role, 'Admin')

    def test_last_login_property(self):
        extended_user = ExtendedUser.objects.get(user=self.user)

        # Test last_login property
        # Since user.last_login is automatically updated on user creation, we can just check its value
        self.assertEqual(extended_user.last_login, self.user.last_login)

# Testing signals.py
        
# api/users/tests/test_signals.py



from api.users.models import ExtendedUser
from django.db.models.signals import post_save
from django.test.utils import override_settings
from unittest.mock import patch

class SignalsTestCase(TestCase):

    def setUp(self):
        self.admin_group, _ = Group.objects.get_or_create(name='Admin')

    def test_create_extended_user_signal(self):
        user = User.objects.create(username='testuser', email='test@example.com', is_superuser=False)
        
        # Verify ExtendedUser is created when User is created
        self.assertTrue(ExtendedUser.objects.filter(user=user).exists())

    @override_settings(DEBUG=True)  # Override DEBUG setting to use signal receivers
    def test_save_extended_user_signal(self):
        user = User.objects.create(username='testuser', email='test@example.com', is_superuser=False)
        extended_user = ExtendedUser.objects.get(user=user)
        
        # Modify user and trigger save signal
        user.email = 'new_email@example.com'
        user.save()
        
        # Verify that ExtendedUser is updated
        updated_extended_user = ExtendedUser.objects.get(user=user)
        self.assertEqual(updated_extended_user.user.email, 'new_email@example.com')

    def test_superuser_add_to_admin_group_signal(self):
        user = User.objects.create(username='superuser', email='superuser@example.com', is_superuser=True)
        
        # Verify superuser is added to Admin group
        self.assertTrue(user.groups.filter(name='Admin').exists())

    @patch('api.users.signals.create_user_extension')  # Mock the signal to test specific behavior
    def test_superuser_already_in_admin_group_signal(self, mock_signal):
        user = User.objects.create(username='superuser', email='superuser@example.com', is_superuser=True)
        user.groups.add(self.admin_group)  # Simulate superuser already in Admin group
        
        # Trigger the signal manually (simulate post_save)
        post_save.send(sender=User, instance=user, created=False)
        
        # Verify signal handler behavior (should not add user to Admin group again)
        self.assertTrue(user.groups.filter(name='Admin').exists())
        self.assertEqual(mock_signal.call_count, 1)  # Ensure the signal handler was called

