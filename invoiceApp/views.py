from django.shortcuts import render
from .models import InvoiceModel, invoiceItemsModel
from django.contrib.auth.decorators import login_required
from .sheet import user_invoice
from django.http import HttpResponse
from django.views.static import serve
from django.http import HttpResponse, HttpResponseRedirect

import json
import re


def invoiceCreationView(request):
    invoice_number = len(InvoiceModel.objects.all()) + 1
    str_in = str(invoice_number)
    inv_num = str_in.zfill(6)
    
    context = {
        'invoice_number': inv_num,
    }

    print(context)

    return render(request, 'invoice-creation.html', context)


def saveInvoiceView(request):
    if request.POST:

        invoice_number = len(InvoiceModel.objects.all()) + 1
        str_in = str(invoice_number)
        inv_num = str_in.zfill(6)
        import pdb; pdb.set_trace()
        invoice = InvoiceModel.objects.create(
            user = request.user,
            company_name = request.POST.get('company_name'),
            company_address = request.POST.get('company_address'),
            company_country = request.POST.get('company_address'),
            company_city = request.POST.get('company_city'),

            client_name = request.POST.get('company_name'),
            client_address = request.POST.get('company_address'),
            client_country = request.POST.get('company_address'),
            client_city = request.POST.get('company_city'),
            invoice_number = inv_num,

            due_date = request.POST.get('due_date'),
            invoice_date = request.POST.get('invoice_date'),
            subtotal = request.POST.get('subtotal'),
            sales_tax = request.POST.get('sales_tax'),
            feedback = request.POST.get('feedback'),
            terms = request.POST.get('terms'),
        )
        
        invoice_items = request.POST.get('invoice_items')
        invoice_items = re.findall(r'(?<=\{).*?(?=\})', invoice_items)

        for item in invoice_items:
            import pdb; pdb.set_trace()
            invoiceItemsModel.objects.create(
                invoice = invoice,
                description = item.description,
                rate = item.rate,
                quantity = item.quantity,
                price = item.price
            )
        import pdb; pdb.set_trace()

        return HttpResponse(json.dumps({"message": "successful"}),content_type="application/json")
    return HttpResponse(json.dumps({"message": "Unsuccessful"}),content_type="application/json")

@login_required
def invoicePreviewView(request):
    return render(request, 'invoice-preview.html')

def faqView(request):
    return render(request, 'faq.html')

def contactView(request):
    return render(request, 'contact.html')
