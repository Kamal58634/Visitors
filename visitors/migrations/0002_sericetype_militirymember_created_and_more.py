# Generated by Django 5.0.1 on 2024-01-29 19:04

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('visitors', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        
        
  
        migrations.CreateModel(
            name='MilitaryBelong',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('licence_plate', models.CharField(default=0, max_length=6)),
                ('gear_no', models.CharField(max_length=6)),
                ('military_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='military', to='visitors.militirymember')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='buser', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
