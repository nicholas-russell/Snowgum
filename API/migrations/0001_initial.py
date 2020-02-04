# Generated by Django 3.0.2 on 2020-01-31 00:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Incidental',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_obs', models.DateField()),
                ('description', models.TextField(null=True)),
                ('loc_name', models.CharField(blank=True, max_length=255)),
                ('loc_lat', models.DecimalField(blank=True, decimal_places=6, max_digits=9)),
                ('loc_long', models.DecimalField(blank=True, decimal_places=6, max_digits=9)),
                ('image_av', models.BooleanField(default=False)),
                ('image_apr', models.BooleanField(default=False)),
                ('image_ids', models.CharField(blank=True, max_length=50)),
                ('email', models.CharField(blank=True, max_length=255)),
                ('verified', models.BooleanField(default=False)),
                ('verified_by', models.CharField(blank=True, max_length=255)),
                ('ts_entered', models.TimeField(auto_now_add=True)),
                ('ts_updated', models.TimeField(auto_now=True)),
                ('entered_IP', models.GenericIPAddressField(blank=True, null=True)),
            ],
        ),
    ]
