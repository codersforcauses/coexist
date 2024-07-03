from django.db import models
from django.contrib.auth.models import User, Group


class ExtendedUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # rsvps = models.ManyToManyField(RSVP, related_name='attendees')

    def __str__(self):
        return self.user.username

    def __getattr__(self, name):
        return getattr(self.user, name)

    @property
    def role(self):
        if self.user.groups.exists():
            return self.user.groups.first().name
        else:
            return None

    def set_role(self, role_name):
        self.user.groups.clear()
        group = Group.objects.get(name=role_name)
        self.user.groups.add(group)

    def is_admin(self):
        return self.user.groups.filter(name='Admin').exists()

    def is_poster(self):
        return self.user.groups.filter(name='Poster').exists()

    def is_attendee(self):
        return self.user.groups.filter(name='Attendee').exists()
