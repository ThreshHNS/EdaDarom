# Generated by Django 3.0.7 on 2020-06-20 09:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vkapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vkuser',
            name='avatar_url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='vkuser',
            name='first_name',
            field=models.CharField(max_length=16),
        ),
    ]