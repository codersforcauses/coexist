from django.db import models
from ..users.models import User


class Event(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to="static/images", blank=True, null=True)
    date_time = models.DateTimeField()
    location = models.CharField(max_length=200)
    # TODO: Create Branch model
    # branch = models.ForeignKey(
    #     "Branch", on_delete=models.CASCADE, related_name="events")
    is_cancelled = models.BooleanField(default=False)
    rsvps = models.ManyToManyField("RSVP", related_name='attended_by',
                                   blank=True)

    def __str__(self):
        return self.title


class RSVP(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             related_name='rsvp_by')
    event = models.ForeignKey("Event", on_delete=models.CASCADE,
                              related_name='rsvp_to')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # Ensures that one user can RSVP to a particular event only once

    class Meta:
        unique_together = ('user', 'event')

    def __str__(self):
        return f"{self.user.username} - {self.event.title}"
