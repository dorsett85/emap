# Generated by Django 2.1.1 on 2018-09-27 03:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='place',
            name='location',
            field=models.FloatField(null=True),
        ),
    ]
