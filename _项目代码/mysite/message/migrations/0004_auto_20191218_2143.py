# Generated by Django 3.0 on 2019-12-18 13:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0003_auto_20191218_2119'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='teachers',
            new_name='teacher',
        ),
        migrations.AlterField(
            model_name='major',
            name='aca_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='message.department'),
        ),
    ]
