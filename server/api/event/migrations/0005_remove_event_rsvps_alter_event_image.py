# Generated by Django 5.0.6 on 2024-07-06 11:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("event", "0004_merge_0002_event_image_0003_alter_event_rsvps"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="event",
            name="rsvps",
        ),
        migrations.AlterField(
            model_name="event",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to="static/images"),
        ),
    ]
