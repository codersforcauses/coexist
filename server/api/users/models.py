from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    class Role(models.TextChoices):
        ATTENDEE = 'attendee'
        POSTER = 'poster'
        ADMIN = 'admin'

    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=200, unique=True)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    password = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now_add=True)
    role = models.CharField(
        max_length=8,
        choices=Role.choices,
        default=Role.ATTENDEE
    )

    def __str__(self):
        return self.username
