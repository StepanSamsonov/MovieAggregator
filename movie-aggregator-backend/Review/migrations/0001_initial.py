# Generated by Django 2.1.2 on 2018-11-25 20:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Film', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, default=None, max_length=100, null=True)),
                ('text', models.TextField(default=None)),
                ('date', models.DateField(blank=True, default=None, max_length=100, null=True)),
                ('is_positive', models.BooleanField(default=True)),
                ('film', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Film.Film')),
            ],
            options={
                'verbose_name': 'Review',
                'verbose_name_plural': 'Reviews',
            },
        ),
    ]
