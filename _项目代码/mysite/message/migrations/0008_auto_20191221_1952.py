# Generated by Django 3.0 on 2019-12-21 11:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0007_auto_20191219_1805'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rap',
            name='rap_id',
            field=models.IntegerField(max_length=20, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='rap',
            name='rap_rop',
            field=models.CharField(choices=[('奖项', 'reward'), ('惩罚', 'punishment')], max_length=10),
        ),
        migrations.AlterField(
            model_name='setupcourse',
            name='coubeg_id',
            field=models.IntegerField(max_length=30, primary_key=True, serialize=False),
        ),
    ]
