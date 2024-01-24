# Generated by Django 4.2.7 on 2023-12-15 06:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MilitiryMember',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('member_id', models.CharField(max_length=200, unique=True)),
                ('expiry_date', models.DateTimeField()),
                ('full_name', models.CharField(max_length=200)),
                ('rank', models.CharField(max_length=100)),
                ('contact', models.CharField(max_length=11)),
            ],
        ),
        migrations.CreateModel(
            name='Visitor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=200)),
                ('contact', models.CharField(max_length=11)),
                ('militiry_member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='MilitiryMembers', to='visitors.militirymember')),
            ],
        ),
        migrations.CreateModel(
            name='Visit_Information',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gate', models.CharField(choices=[(0, 'DockYard'), (1, 'Naden'), (2, 'WorkPoint')], max_length=200)),
                ('desination', models.CharField(max_length=200)),
                ('unit', models.CharField(max_length=200)),
                ('issue_time', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('militiry_member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='MilitiryMembersI', to='visitors.militirymember')),
                ('visitor', models.ManyToManyField(related_name='visitors', to='visitors.visitor')),
            ],
        ),
    ]