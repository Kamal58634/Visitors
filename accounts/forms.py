from typing import Any
from django import forms
from .models import User
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import ReadOnlyPasswordHashField

class UserCreationForm(forms.ModelForm):

    password1=forms.PasswordInput(label="Password")
    password2=forms.PasswordInput(label="Confirm Password")
    class Meta:
        model=User
        fields=('email','full_name','phone_number','password')
    
    def clean_password2(self):
        cd=self.cleaned_data
        if cd['password1'] and cd['password2'] and cd['password1'] !=cd['password2']:
            raise ValidationError("Your password not Ok")
        return cd['password2']
    
    def save(self, commit=True) :
         user=super().save(commit=False)
         user.set_password(self.cleaned_data['password1'])
         if commit: 
           user.save()
         return user  

class UserChanegeForm(forms.ModelForm):
    password=ReadOnlyPasswordHashField(help_text="If you want to change password <a href=\"../password\"> using this Form  /a>")
    class Meta:
        model=User
        fields=('email','full_name','phone_number','password','last_login')

