# Generated by Django 3.0.2 on 2020-02-02 11:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0005_auto_20200202_2212'),
    ]

    operations = [
        migrations.RenameField(
            model_name='incidental',
            old_name='image_ids',
            new_name='image',
        ),
    ]
