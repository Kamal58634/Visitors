# from typing import Any
from django import forms
from .models import User
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import ReadOnlyPasswordHashField

class UserCreationForm(forms.ModelForm):

    password1=forms.CharField(label="Password",widget=forms.PasswordInput)
    password2=forms.CharField(label="Confirm Password",widget=forms.PasswordInput)
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

class UserRegister(forms.Form):
    phone_number=forms.CharField(max_length=200,required=True)
    email=forms.EmailField(max_length=200,required=True)
    full_name=forms.CharField(max_length=200,required=True)
    password=forms.CharField(max_length=200,widget=forms.PasswordInput())

    
    def clean_email(self):
        email=self.cleaned_data['email']
        email1=User.objects.filter(email=email).exists()
        if 'admin' in email:
            raise ValidationError("یوزر نمی تواند ادمین باشد ")
        elif email1:
            raise ValidationError('email tekrary')
        return email

    def clean_phone_number(self):
        phone_number=self.cleaned_data['phone_number']
        phone=User.objects.filter(phone_number=phone_number).exists()
        if phone:
            raise ValidationError('Phone can not tekrary') 
        return phone_number  


class VerifyForm(forms.Form):
    code=forms.IntegerField()

