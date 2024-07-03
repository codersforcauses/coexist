from typing import Any
from django.db import models
from django.http import HttpRequest


class SoftDeleteManager(models.Manager):
    def __init__(self, *args, **kwargs):
        self.is_deleted = kwargs.pop("is_deleted", False)
        self.objects_all = kwargs.pop("objects_all", False)
        super(SoftDeleteManager, self).__init__(*args, **kwargs)

    def get_queryset(self):
        if self.objects_all == True:
            return super().get_queryset()
        qs = super().get_queryset().filter(is_deleted=self.is_deleted)
        return qs


class SoftDeleteModel(models.Model):
    is_deleted = models.BooleanField(default=False)
    objects = SoftDeleteManager()
    objects_deleted = SoftDeleteManager(is_deleted=True)
    objects_all = SoftDeleteManager(objects_all=True)

    def delete(self):
        self.is_deleted = True
        self.save()

    def restore(self):
        self.is_deleted = False
        self.save()

    class Meta:
        abstract = True


from django.contrib import admin


class SoftDeleteAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        return self.model.objects_all.all()


from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status


class SoftDeleteViewSet(viewsets.ModelViewSet):
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
