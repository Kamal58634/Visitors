from django.shortcuts import render,redirect
from .forms import UserCreationForm,UserRegister
from django.views import View
from .models import User
from django.contrib import messages
from django.core.exceptions import ValidationError


class UserRegistionForm(View):
    form_class=UserRegister
    def get(self,request):
        form=self.form_class
        return render(request,'accounts/registration.html',{'form':form})

    def post(self,request):
        form=self.form_class(request.POST)
        if form.is_valid():
            cd=form.cleaned_data
            User.objects.create_user(phone_number=cd['phone_number'],
                                     email=cd['email'],
                                     full_name=cd['full_name'],
                                     password=cd['password'])
            messages.success(request,'You create a user','success')
        else:
            raise ValidationError("there is a problem")   
        return redirect('home:home')
            
