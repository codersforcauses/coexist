# Generated by Django 5.0.6 on 2024-07-03 04:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("branch", "0001_initial"),
        ("event", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="event",
            name="branch",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="events",
                to="branch.branch",
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="event",
            name="is_deleted",
            field=models.BooleanField(default=False),
        ),
    ]
