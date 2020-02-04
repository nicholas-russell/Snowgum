from django.contrib import admin
from .models import Incidental


class IncidentalAdmin(admin.ModelAdmin):
    list_display = ('id', 'date_obs', 'loc_lat', 'loc_lng', 'image_apr', 'verified', 'email', 'contact')


admin.site.register(Incidental, IncidentalAdmin)