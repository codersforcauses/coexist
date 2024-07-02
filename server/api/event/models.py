from django.db import models
from ..users.models import User


class Event(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    # TODO: Install Pillow
    # image = models.ImageField()
    date_time = models.DateTimeField()
    location = models.CharField(max_length=200)
    # TODO: Create Branch model
    # branch = models.ForeignKey(
    #     "Branch", on_delete=models.CASCADE, related_name="events")
    is_cancelled = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class RSVP(models.Model):
    # class for status see ERD
    class Status(models.TextChoices):
        RSVP = 'RSVPED', 'RSVPed'
        NOT_RSVPED = 'NOT_RSVPED', 'Not RSVPed'

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=Status.choices, 
                              default=Status.NOT_RSVPED)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.event.title} - {self.status}"
