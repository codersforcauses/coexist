from django.db import models

from ..users.models import User
from api.soft_delete import SoftDeleteModel
from api.branch.models import Branch


class Event(SoftDeleteModel):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to="static/images", blank=True, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)
    location = models.CharField(max_length=200)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name="events")
    is_cancelled = models.BooleanField(default=False)

    def __str__(self):
        return self.title
      
    @property
    def duration(self):
        return self.end_time - self.start_time

      
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

