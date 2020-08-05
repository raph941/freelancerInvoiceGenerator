from .models import InvoiceModel, ProductModel

def create_invoice(freelancer, invoice_name, invoice_number, invoice_date, due_date, company_name,
                    company_address, company_city, company_country, client_name, 
                    client_address, client_city, client_country, products ):
    """Function to create a database instance of invoices"""

    invoice = InvoiceModel.objects.create(freelancer=freelancer, invoice_name=invoice_name, invoice_number=invoice_number,
        invoice_date=invoice_date, due_date=due_date, company_name=company_name, company_address=company_address,
        company_city=company_city, company_country=company_country, client_name=client_name, client_address=client_address, 
        client_city=client_city, client_country=client_country)

    for product in products:
        ProductModel.objects.create(invoice=invoice, description=product.description, 
            rate=product.rate, quantity=product.quantity, price=product.price)
        
    return


