# Generated by Django 5.0.6 on 2024-06-30 16:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('date_time', models.DateTimeField()),
                ('location', models.CharField(max_length=200)),
                ('is_cancelled', models.BooleanField(default=False)),
                ('payment_link', models.CharField(max_length=200)),
            ],
        ),
    ]
