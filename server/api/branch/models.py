from django.db import models
from api.soft_delete import SoftDeleteModel
import uuid


# One Branch to Many events.


class Branch(SoftDeleteModel):
    name = models.CharField(max_length=200)
    description = models.TextField()
    # Unique Identifier that gets displayed in the URL
    discriminator = models.CharField(max_length=36, unique=True,
                                     default=uuid.uuid4)

    # Field: Events
    def __str__(self):
        return self.name

    class Meta:
        ordering = ['id']
