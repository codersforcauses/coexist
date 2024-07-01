from django.db import models
from django.contrib.auth.models import User, Group
from django.db.models.signals import post_save
from django.dispatch import receiver


class CustomUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # rsvps = models.ManyToManyField(RSVP, related_name='attendees')

    def __str__(self):
        return self.user.username

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

    @property
    def last_login(self):
        return self.user.last_login


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        CustomUser.objects.create(user=instance)
        # If the user is a superuser, add them to the Admin group
        if instance.is_superuser:
            admin_group, _ = Group.objects.get_or_create(name='Admin')
            instance.groups.add(admin_group)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.customuser.save()

    # If the user is a superuser and not in the Admin group, add them
    if instance.is_superuser and not instance.groups.filter(name='Admin').exists():
        admin_group, _ = Group.objects.get_or_create(name='Admin')
        instance.groups.add(admin_group)
