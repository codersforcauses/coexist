from django.db import models


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
    branch = models.ForeignKey(
        "Branch", on_delete=models.CASCADE, related_name="events"
    )
    deleted = models.BooleanField(default=False)
    is_cancelled = models.BooleanField(default=False)

    def __str__(self):
        return self.title
