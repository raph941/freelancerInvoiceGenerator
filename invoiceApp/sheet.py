# Script to generate excel invoice
from openpyxl import load_workbook


file_name = "static/invoice.xlsx"
work_book = load_workbook(file_name)
sheet = work_book.active

def user_invoice(theinvoicedate,theduedate,thecompany_name,thecompany_address,thecompany_city,thecompany_country,theclient_name,theclient_address,theclient_city,theclient_country,theitems,thesub_total,thesales_tax,thenote,theterms):
    invoicedate = theinvoicedate
    duedate = theduedate
    company_name = thecompany_name
    company_address= thecompany_address
    company_city = thecompany_city
    company_country = thecompany_country
    client_name = theclient_name
    client_address = theclient_address
    client_city = theclient_city
    client_country = theclient_country
    #invoice items
    items = theitems
    #definition of first row of invoice items
    first_item_row = 20
    #sub total  and sales tax defaults to none unless they is assigned a value
    sub_total = thesub_total
    sales_tax = thesales_tax
    total = thesub_total+thesales_tax
    note = thenote
    terms = theterms
    #adding items to the excelsheet
    #company details
    sheet["C5"] = company_name
    sheet["C6"] = company_address
    sheet["C7"] = company_city
    sheet["C8"] = company_country
    #client_details
    sheet["C12"] = client_name
    sheet["C13"] = client_address
    sheet["C14"] = client_city
    sheet["C15"] = client_country
    sheet["E4"] = invoicedate
    sheet["E6"] = duedate
    sheet["F31"] = sub_total
    sheet["F32"] = sales_tax
    sheet["F33"] = total
    sheet["B36"] = note
    sheet["B38"] = terms
    columns = ["B","D","E","F"]
    rowitems = []
    #while len(items)!=len(columns):
    #    newcolumn=["B","D","E","F"]
    #    columns.extend(newcolumn)
    count = 0
    #invoice items
    for item in items:
        for key in item:
            rowitems.append(item[key])
            while len(rowitems)>len(columns):
                newcolumns=["B","D","E","F"]
                columns.extend(newcolumns)
                first_item_row+=1
            itemposition=columns[count]+str(first_item_row)
            print(itemposition)
            sheet[itemposition]=item[key]
            count+=1
    work_book.save(file_name="invoice.xlsx")
