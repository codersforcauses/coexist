# Generated by Django 5.0.6 on 2024-07-15 07:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("event", "0007_merge_20240710_0852"),
    ]

    operations = [
        migrations.AddField(
            model_name="event",
            name="location_url",
            field=models.URLField(default="https://coexist-events.vercel.app/"),
            preserve_default=False,
        ),
    ]
