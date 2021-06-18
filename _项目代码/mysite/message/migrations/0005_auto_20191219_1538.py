# Generated by Django 3.0 on 2019-12-19 07:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0004_auto_20191218_2143'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='cou_fid',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='major',
            name='maj_location',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='rap',
            name='rap_else',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='rap',
            name='rap_level',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='rap',
            name='rap_year',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='selectcourse',
            name='cou_id',
            field=models.ForeignKey(max_length=20, on_delete=django.db.models.deletion.CASCADE, to='message.course'),
        ),
        migrations.AlterField(
            model_name='selectcourse',
            name='cou_score',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='selectcourse',
            name='std_id',
            field=models.ForeignKey(max_length=20, on_delete=django.db.models.deletion.CASCADE, to='message.student'),
        ),
        migrations.AlterField(
            model_name='setupcourse',
            name='beg_term',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='setupcourse',
            name='cou_id',
            field=models.ForeignKey(max_length=20, on_delete=django.db.models.deletion.CASCADE, to='message.course'),
        ),
        migrations.AlterField(
            model_name='student',
            name='aca_id',
            field=models.ForeignKey(max_length=20, on_delete=django.db.models.deletion.CASCADE, to='message.department'),
        ),
        migrations.AlterField(
            model_name='student',
            name='std_age',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='student',
            name='std_class',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='student',
            name='std_grade',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='student',
            name='std_sex',
            field=models.CharField(blank=True, choices=[('male', '男'), ('female', '女')], max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='tea_age',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='tea_title',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
