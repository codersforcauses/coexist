# Generated by Django 5.0.6 on 2024-07-16 01:20


from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('branch', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='branch',
            options={'ordering': ['id']},
        ),
    ]
