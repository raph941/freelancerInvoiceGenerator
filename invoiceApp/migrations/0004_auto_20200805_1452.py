# Generated by Django 3.0.8 on 2020-08-05 13:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('invoiceApp', '0003_auto_20200805_1431'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoicemodel',
            name='sales_tax',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='invoicemodel',
            name='subtotal',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
