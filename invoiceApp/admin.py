from django.contrib import admin
from .models import InvoiceModel, invoiceItemsModel

# Register your models here.
admin.site.register(InvoiceModel),
admin.site.register(invoiceItemsModel),