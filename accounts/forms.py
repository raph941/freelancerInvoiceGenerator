from django import forms
from django.contrib.auth.forms import UserCreationForm

from .models import User

class SignupForm(UserCreationForm):
    first_name = forms.CharField( max_length=50, required=True)
    last_name = forms.CharField( max_length=50, required=True)
    email = forms.EmailField(max_length = 254, required=False, help_text='enter a valid email address.')

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password1', 'password2')