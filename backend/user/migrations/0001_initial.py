# Generated by Django 4.2.16 on 2024-10-04 17:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('p5_balance', models.IntegerField(default=100)),
                ('rewards_balance', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='RewardHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('datetime_stamp', models.DateTimeField(auto_now_add=True)),
                ('points', models.IntegerField()),
                ('given_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='giver', to='user.user')),
                ('given_to', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='receiver', to='user.user')),
            ],
        ),
    ]