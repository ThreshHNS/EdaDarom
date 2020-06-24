# Generated by Django 3.0.7 on 2020-06-24 14:41

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import vkapp.utils


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='VKUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('vk_id', models.IntegerField()),
                ('first_name', models.CharField(max_length=16)),
                ('last_name', models.CharField(max_length=16)),
                ('avatar_url', models.TextField(blank=True, null=True)),
                ('location_coordinates', django.contrib.gis.db.models.fields.PointField(srid=4326, verbose_name='Location')),
                ('location_title', models.TextField()),
                ('notifications_radius', models.IntegerField(default=1)),
                ('notifications_status', models.BooleanField(default=True)),
                ('medal', models.IntegerField(blank=True, default=0, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Food',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('publication_date', models.DateTimeField(auto_now_add=True)),
                ('duration', models.DurationField()),
                ('image', models.ImageField(blank=True, upload_to=vkapp.utils.path_and_rename, verbose_name='Изображение')),
                ('title', models.TextField()),
                ('description', models.TextField()),
                ('status', models.SmallIntegerField(choices=[(0, 'Done'), (1, 'Active'), (2, 'Outdated'), (-1, 'Canceled')], default=0)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
