# Generated by Django 5.0.1 on 2024-01-18 20:24

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('visitors', '0004_visit_information_date_return_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        
        migrations.AlterField(
            model_name='militirymember',
            name='expiry_date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='militirymember',
            name='member_id',
            field=models.CharField(max_length=200, unique=True, verbose_name='MilitaryID'),
        ),
        migrations.AlterField(
            model_name='militirymember',
            name='rank',
            field=models.CharField(choices=[('3', 'S3'), ('2', 'S2'), ('1', 'S1')], max_length=100),
        ),
        migrations.AlterField(
            model_name='militirymember',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='Musers', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='visit_information',
            name='issue_time',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]