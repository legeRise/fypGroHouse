# Generated by Django 4.2.11 on 2024-05-03 09:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('image', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name_plural': 'Categories',
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('price', models.IntegerField()),
                ('stock', models.IntegerField()),
                ('image', models.CharField(max_length=250)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='grocery_app.category')),
            ],
        ),
        migrations.CreateModel(
            name='Prediction_Model',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('model_path', models.CharField(blank=True, max_length=255)),
                ('product', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='grocery_app.product')),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('quantity', models.IntegerField(default=0)),
                ('price', models.IntegerField(default=0)),
                ('name', models.CharField(default=None, max_length=100)),
                ('phoneNumber', models.CharField(default=0, max_length=15)),
                ('email', models.EmailField(default=None, max_length=254)),
                ('city', models.CharField(default='', max_length=100)),
                ('address', models.TextField(default='')),
                ('image', models.CharField(default='', max_length=250)),
                ('payment_method', models.CharField(choices=[('credit_card', 'Credit Card'), ('jazzcash', 'JazzCash'), ('cash_on_delivery', 'Cash On Delivery')], default='cash_on_delivery', max_length=50)),
                ('products', models.ManyToManyField(to='grocery_app.product')),
            ],
        ),
        migrations.CreateModel(
            name='Dataset',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True)),
                ('price', models.IntegerField()),
                ('sales', models.IntegerField()),
                ('product_name', models.CharField(blank=True, max_length=100)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='grocery_app.product')),
            ],
        ),
    ]
