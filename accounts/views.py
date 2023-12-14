from django.shortcuts import render,redirect,get_object_or_404
from .forms import UserCreationForm,UserRegister,VerifyForm
from django.views import View
from .models import User,OTPCode
from django.contrib import messages
from django.core.exceptions import ValidationError
import random


class UserRegistionForm(View):
    form_class=UserRegister
    def get(self,request):
        form=self.form_class
        return render(request,'accounts/registration.html',{'form':form})

    def post(self,request):
        form=self.form_class(request.POST)
        if form.is_valid():
            cd=form.cleaned_data
            code=random.randint(1000,9999)  
            # User.objects.create_user(phone_number=cd['phone_number'],
            #                          email=cd['email'],
            #                          full_name=cd['full_name'],
            #                          password=cd['password'])
            
            request.session["User_Register_Info"]={
                "phone_number":cd['phone_number'],
                "email":cd['email'],
                "full_name":cd['full_name'],
                "password":cd['password']
            }  
            OTPCode.objects.create(phone_number=cd['phone_number'],code=code)
            messages.success(request,'You create a user','success')
            return redirect('accounts:verify')
        else:
            # messages.error(request,"There is a problem",'warning')
            return render(request,'accounts/registration.html',{'form':form})
           
        return redirect('home:home')


class UserVerifyView(View):
    form_class=VerifyForm
    def get(self,request):
        form=self.form_class
        return render(request,'accounts/verify.html',{'form':form})
    
    def post(self,request):
        form=self.form_class(request.POST)
        if form.is_valid():
            
                
                try:
                    code_recieve=get_object_or_404(OTPCode,phone_number=
                                            request.session["User_Register_Info"]['phone_number'])
                    if int(request.POST['code'])==code_recieve.code:
                        
                        cd=request.session["User_Register_Info"]
                        User.objects.create_user(phone_number=cd['phone_number'],
                                            email=cd['email'],
                                            full_name=cd['full_name'],
                                            password=cd['password'])
                        code_recieve.delete()
                        messages.success(request,'Created User','success')
                        return redirect('home:home')
                except:
                    messages.error(request,'There is an error','danger')
                    return render(request,'accounts/verify.html',{'form':form})

        messages.error(request,'There is an error','danger')        
        return render(request,'accounts/verify.html',{'form':form})
                

            


            
