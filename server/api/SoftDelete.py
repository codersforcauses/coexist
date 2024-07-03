from django.db import models


class SoftDeleteManager(models.Manager):
    def __init__(self, *args, **kwargs):
        self.deleted = kwargs.pop("deleted", False)
        super(SoftDeleteManager, self).__init__(*args, **kwargs)

    def get_queryset(self):
        qs = super().get_queryset().filter(deleted=self.deleted)
        return qs


class SoftDeleteModel(models.Model):
    deleted = models.BooleanField(default=False)
    objects = SoftDeleteManager()

    def delete(self):
        self.deleted = True
        self.save()

    def restore(self):
        self.deleted = False
        self.save()

    class Meta:
        abstract = True
