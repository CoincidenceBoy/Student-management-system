# Generated by Django 3.0 on 2019-12-21 11:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0008_auto_20191221_1952'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rap',
            name='rap_id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='setupcourse',
            name='coubeg_id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
