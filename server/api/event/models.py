from django.db import models
from api.SoftDelete import SoftDeleteModel
from api.branch.models import Branch


class Event(SoftDeleteModel):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    # TODO: Install Pillow
    # image = models.ImageField()
    date_time = models.DateTimeField()
    location = models.CharField(max_length=200)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name="events")
    is_cancelled = models.BooleanField(default=False)

    def __str__(self):
        return self.title

