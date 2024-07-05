from django.contrib import admin  # noqa

from .models import Event
from .models import RSVP
# Register your models here.
admin.site.register(Event)
admin.site.register(RSVP)
