from django.contrib import admin  # noqa

from .models import Event
from .models import RSVP
from api.soft_delete import SoftDeleteAdmin

class RSVPAdmin(admin.ModelAdmin):
    list_display = ["user", "event", "created_at", "updated_at"]
    fields = ["user", "event"]

# Register your models here.
admin.site.register(Event)
admin.site.register(RSVP, RSVPAdmin)

@admin.register(Event)
class BranchAdmin(SoftDeleteAdmin):
    pass

