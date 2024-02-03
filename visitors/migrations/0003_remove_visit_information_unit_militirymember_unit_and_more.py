# Generated by Django 5.0.1 on 2024-02-03 19:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('visitors', '0002_tag_alter_militirymember_rank_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='visit_information',
            name='unit',
        ),
        migrations.AddField(
            model_name='militirymember',
            name='unit',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='desinition_u', to='visitors.desinition'),
        ),
        migrations.AlterField(
            model_name='militirymember',
            name='rank',
            field=models.CharField(choices=[('1', 'S1'), ('2', 'S2'), ('3', 'S3')], max_length=100),
        ),
    ]
