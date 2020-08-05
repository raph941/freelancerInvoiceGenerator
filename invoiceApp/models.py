from django.db import models
from accounts.models import User


class InvoiceModel(models.Model):
    user                = models.ForeignKey(User, verbose_name=("freelancer"), on_delete=models.CASCADE)
    company_name        = models.CharField(max_length=550, null=True, blank=True)
    company_address     = models.CharField(max_length=550, null=True, blank=True)
    company_city        = models.CharField(max_length=550, null=True, blank=True)
    company_country     = models.CharField(max_length=550, null=True, blank=True)
    client_name         = models.CharField(max_length=550, null=True, blank=True)
    client_address      = models.CharField(max_length=550, null=True, blank=True)
    client_city         = models.CharField(max_length=550, null=True, blank=True)
    client_country      = models.CharField(max_length=550, null=True, blank=True)
    invoice_number      = models.IntegerField(blank=True, default=0, verbose_name=('invoice_number'))
    due_date            = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
    invoice_date        = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
    subtotal            = models.FloatField(null=True, blank=True)
    sales_tax           = models.FloatField(null=True, blank=True)
    feedback            = models.CharField(max_length=550, null=True, blank=True)
    terms               = models.CharField(max_length=550, null=True, blank=True)

    def __str__(self):
        return f'Invoice Number : { self.invoice_number }'

class invoiceItemsModel(models.Model):
    invoice             = models.ForeignKey(InvoiceModel, on_delete=models.CASCADE)
    description         = models.CharField(max_length=550, null=True, blank=True)
    rate                = models.IntegerField(default=0, null=True, blank=True)
    quantity            = models.IntegerField(default=0, null=True, blank=True)
    price               = models.IntegerField(default=0, null=True, blank=True)