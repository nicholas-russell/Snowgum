from django.db import models


class Incidental(models.Model):
    date_obs = models.DateField()
    description = models.TextField(null=True)
#    loc_name = models.CharField(max_length=255, null=True)
    loc_lat = models.DecimalField(decimal_places=6, max_digits=9, null=True)
    loc_long = models.DecimalField(decimal_places=6, max_digits=9, null=True)
#    image_av = models.BooleanField(default=False)
#    image_apr = models.BooleanField(default=False)
#    image_ids = models.CharField(max_length=50, null=True)
    email = models.CharField(max_length=255, default="")
    verified = models.BooleanField(default=False)
#    verified_by = models.CharField(max_length=255, null=True)
    ts_entered = models.TimeField(auto_now_add=True)
    ts_updated = models.TimeField(auto_now=True)
#    entered_IP = models.CharField(max_length=100, null=True)  # TODO: check length of IP address
