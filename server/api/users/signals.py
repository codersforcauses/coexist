from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import ExtendedUser
from django.contrib.auth.models import User, Group


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        ExtendedUser.objects.create(user=instance)
        # If the user is a superuser, add them to the Admin group
        if instance.is_superuser:
            admin_group, _ = Group.objects.get_or_create(name='Admin')
            instance.groups.add(admin_group)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.extendeduser.save()

    # If the user is a superuser and not in the Admin group, add them
    if instance.is_superuser and not instance.groups.filter(name='Admin').exists():
        admin_group, _ = Group.objects.get_or_create(name='Admin')
        instance.groups.add(admin_group)
