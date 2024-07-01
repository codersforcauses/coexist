from django.db import migrations

class Migration(migrations.Migration):

    dependencies = [
        ('event', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Event',
        ),
    ]