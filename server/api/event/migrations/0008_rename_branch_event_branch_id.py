# Generated by Django 5.0.6 on 2024-07-15 13:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("event", "0007_merge_20240710_0852"),
    ]

    operations = [
        migrations.RenameField(
            model_name="event",
            old_name="branch",
            new_name="branch_id",
        ),
    ]
