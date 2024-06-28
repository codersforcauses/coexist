from django.db import models


class Event(models.Model):
    created_time = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField()
    date_time = models.DateTimeField()
    location = models.CharField(max_length=200)
    branch = models.ForeignKey("Branch", on_delete=models.CASCADE)
    is_cancelled = models.BooleanField(default=False)

    def __str__(self):
        return self.title
