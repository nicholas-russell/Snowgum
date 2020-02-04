from django.db import models
from .lib import RandomFileName


class Incidental(models.Model):
    date_obs = models.DateField()
    description = models.TextField(null=True)
    loc_lat = models.DecimalField(decimal_places=6, max_digits=9, blank=True, null=True)
    loc_lng = models.DecimalField(decimal_places=6, max_digits=9, blank=True, null=True)
    image_apr = models.BooleanField(default=False)
    image = models.ImageField(upload_to=RandomFileName('uploaded_images'), blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    contact = models.BooleanField(default=False)
    verified = models.BooleanField(default=False)
    verified_by = models.CharField(max_length=255, blank=True, null=True)
    ts_entered = models.DateTimeField(auto_now_add=True)
    ts_updated = models.DateTimeField(auto_now=True)
    entered_IP = models.GenericIPAddressField(blank=True, null=True)

