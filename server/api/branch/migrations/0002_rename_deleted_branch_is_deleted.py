# Generated by Django 5.0.6 on 2024-07-03 10:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('branch', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='branch',
            old_name='deleted',
            new_name='is_deleted',
        ),
    ]
