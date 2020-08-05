"""InvoiceGenerator URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from accounts import views as account_views
from invoiceApp import views as invoice_views
from django.contrib.auth import views as auth_views
from accounts import views as account_views
from . import views


urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r"about/$", views.aboutView, name="about"),
    url(r"faq/$", views.faqView, name="faq"),
    url(r"contact/$", views.contactView, name="contact"),
    url(r"pricing/$", views.pricingView, name="pricing"),
    url(r"statistic/$", views.userStatisticsView, name="statistics"),
    url(r"guide/$", views.invoiceGuideView, name="giude"),
    url(r"privacy/$", views.privacyPolicyView, name="privacy"),
    url(r"dashboard/$", views.dashboardView, name="contact"),
    url(r"error/$", views.errorView, name="error"),
    url(r"success/$", views.successView, name="success"),
    url(r"contact-support/$", views.contactSupportView, name="contactSupport"),

    url('invoice/', include('invoiceApp.urls')),

    path('reset_password/', auth_views.PasswordResetView.as_view(template_name='registration/reset_password.html'), name='reset_password'),
    path('reset_password_sent/', auth_views.PasswordResetDoneView.as_view(template_name='registration/reset_password_sent.html'), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='registration/password_reset_form.html'), name='password_reset_confirm'),
    path('reset_password_complete/', auth_views.PasswordResetCompleteView.as_view(template_name='registration/password_reset_done.html'), name='password_reset_complete'),

    #authentication urls
    url(r"ajax_signup/$", account_views.SignupAjaxView, name="ajax_signup"),
    url(r"ajax_login/$", account_views.AjaxloginView, name="ajax_login"),
    url('^', include('django.contrib.auth.urls')),

    path('admin/', admin.site.urls),
]
