# Generated by Django 5.0.6 on 2024-07-07 00:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("event", "0003_event_branch_event_is_deleted_alter_event_image"),
    ]

    operations = [
        migrations.RenameField(
            model_name="event",
            old_name="date_time",
            new_name="start_time",
        ),
        migrations.AddField(
            model_name="event",
            name="end_time",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="event",
            name="image",
            field=models.ImageField(blank=True, null=True,
                                    upload_to="static/images"),
        ),
    ]
