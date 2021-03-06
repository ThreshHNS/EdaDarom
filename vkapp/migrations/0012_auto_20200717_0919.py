# Generated by Django 3.0.7 on 2020-07-17 09:19

import django.contrib.gis.db.models.fields
import django.contrib.gis.geos.point
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vkapp', '0011_food_uuid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='food',
            name='status',
            field=models.CharField(choices=[('Done', 'Done'), ('Active', 'Active'), ('Outdated', 'Outdated'), ('Reserved', 'Reserved')], default='Active', max_length=8, verbose_name='Статус'),
        ),
        migrations.AlterField(
            model_name='vkuser',
            name='city',
            field=models.CharField(blank=True, default='Москва', max_length=28, null=True, verbose_name='Город'),
        ),
        migrations.AlterField(
            model_name='vkuser',
            name='country',
            field=models.CharField(blank=True, default='Россия', max_length=42, null=True, verbose_name='Страна'),
        ),
        migrations.AlterField(
            model_name='vkuser',
            name='location_coordinates',
            field=django.contrib.gis.db.models.fields.PointField(blank=True, default=django.contrib.gis.geos.point.Point(37.618423, 55.751244), null=True, srid=4326, verbose_name='Координаты'),
        ),
    ]
