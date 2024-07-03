from django.db import models
from api.SoftDelete import SoftDeleteModel

# Create your models here.


# One Branch to Many events.
# Field: Events

class Branch(SoftDeleteModel):
    name = models.CharField(max_length=200)
    description = models.TextField()
    
    def __str__(self):
        return self.name
