from django.shortcuts import render
from django.contrib.auth.decorators import login_required


def home(request):
    return render(request, 'index.html')

def faqView(request):
    return render(request, 'faq.html')

def contactView(request):
    return render(request, 'contact.html')


def userStatisticsView(request):
    return render(request, 'user-statistics.html')


def pricingView(request):
    return render(request, 'pricing.html')


def invoiceGuideView(request):
    return render(request, 'guide.html')


def dashboardView(request):
    return render(request, 'dashboard.html')

def successView(request):
    return render(request, 'success.html')


def aboutView(request):
    return render(request, 'about.html')

def privacyPolicyView(request):
    return render(request, 'privacy-policy.html')

def errorView(request):
    return render(request, '404.html')

def contactSupportView(request):
    return render(request, 'contact-support.html')
