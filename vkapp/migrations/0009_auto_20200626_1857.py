# Generated by Django 3.0.7 on 2020-06-26 18:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vkapp', '0008_auto_20200626_1851'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vkuser',
            name='city',
            field=models.CharField(blank=True, max_length=28, null=True, verbose_name='Город'),
        ),
        migrations.AlterField(
            model_name='vkuser',
            name='country',
            field=models.CharField(blank=True, max_length=42, null=True, verbose_name='Страна'),
        ),
    ]