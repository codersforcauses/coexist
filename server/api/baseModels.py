from django.db import models




class SoftDeleteModel(models.Model):
    deleted = models.BooleanField(default=False)

    def delete(self):
        self.deleted = True
        self.save()

    class Meta:
        abstract = True
