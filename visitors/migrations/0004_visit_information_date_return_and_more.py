# Generated by Django 4.2.7 on 2023-12-16 17:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('visitors', '0003_militirymember_user_visit_information_user_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='visit_information',
            name='date_return',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='visit_information',
            name='time_return',
            field=models.TimeField(blank=True, null=True),
        ),
    ]
