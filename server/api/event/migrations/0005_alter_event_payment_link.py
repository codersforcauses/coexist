# Generated by Django 5.0.6 on 2024-07-08 08:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("event", "0004_rename_date_time_event_start_time_event_end_time_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="event",
            name="payment_link",
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
