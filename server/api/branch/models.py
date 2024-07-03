from django.db import models
from api.baseModels import SoftDeleteModel

# Create your models here.

# One Branch to Many events.
#Field: Events
class Branch(SoftDeleteModel):
    name = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

