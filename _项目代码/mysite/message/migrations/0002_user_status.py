# Generated by Django 3.0 on 2019-12-16 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='status',
            field=models.CharField(default='', max_length=10),
        ),
    ]
