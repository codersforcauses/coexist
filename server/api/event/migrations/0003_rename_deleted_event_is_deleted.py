# Generated by Django 5.0.6 on 2024-07-03 10:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0002_event_branch_event_deleted'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='deleted',
            new_name='is_deleted',
        ),
    ]
