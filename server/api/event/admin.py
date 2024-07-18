from django.contrib import admin
from .models import Event, RSVP
from api.soft_delete import SoftDeleteAdmin


class RSVPAdmin(SoftDeleteAdmin):
    list_display = ["user", "event", "created_at", "updated_at"]
    fields = ["user", "event"]


# Register your models here.
admin.site.register(RSVP, RSVPAdmin)


@admin.register(Event)
class EventAdmin(SoftDeleteAdmin):
    pass
