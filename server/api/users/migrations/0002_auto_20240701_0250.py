# Generated by Django 5.0.6 on 2024-07-01 02:50

from django.db import migrations
from django.contrib.auth.models import Group


def create_groups(apps, schema_editor):
    Group.objects.get_or_create(name='Poster')
    Group.objects.get_or_create(name='Admin')
    Group.objects.get_or_create(name='Attendee')


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(create_groups),
    ]
