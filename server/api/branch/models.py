from django.db import models

# Create your models here.


class Branch(models.Model):
    id = models.UUIDField()
    name = models.CharField(max_length=200)
    description = models.TextField()
    event = models.ForeignKey("Event", on_delete=models.CASCADE)
    deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    def delete(self):
        self.deleted = True
        self.save()
        
    def __str__(self):
        return self.title
