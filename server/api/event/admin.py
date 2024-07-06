from django.contrib import admin  # noqa

from .models import Event
from .models import RSVP


class RSVPAdmin(admin.ModelAdmin):
    list_display = ["user", "event", "created_at", "updated_at"]
    fields = ["user", "event"]


admin.site.register(Event)
admin.site.register(RSVP, RSVPAdmin)
