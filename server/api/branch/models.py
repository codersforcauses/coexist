from django.db import models
from apisoft_delete import SoftDeleteModel


# One Branch to Many events.


class Branch(SoftDeleteModel):
    name = models.CharField(max_length=200)
    description = models.TextField()

    # Field: Events
    def __str__(self):
        return self.name
