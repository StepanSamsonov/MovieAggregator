# Generated by Django 2.1.2 on 2018-12-09 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Film', '0002_film_genres'),
    ]

    operations = [
        migrations.AddField(
            model_name='film',
            name='image',
            field=models.CharField(blank=True, default=None, max_length=100, null=True),
        ),
    ]
