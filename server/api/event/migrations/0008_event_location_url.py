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
            field=models.URLField(
                default="""https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15270.
                                  158808639862!2d145.7088778!3d-16.8986496!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x697864fe8ee140d5%3A
                                  0xf00eef26261dd60!2sGlenoma%20Park!5e0!3m2!1sen!2sau!4v1721025698144!5m2!1sen!2sau""",
                max_length=500,
            ),
            preserve_default=False,
        ),
    ]
