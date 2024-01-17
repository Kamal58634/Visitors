from django.views import View
from django.shortcuts import render,get_list_or_404,redirect,get_object_or_404
from .forms import MilitiryInfoForm,VisitInformationForm
from .models import MilitiryMember,Visit_Information
from django.contrib import messages
from django.http import JsonResponse
import datetime

class ListMilitryView(View):
    field_name=[f.name for f in MilitiryMember._meta.get_fields()
                    if not (f.is_relation or f.one_to_one or f.many_to_many) and f.name !='id' and f.name!='created']
    
    def get(self,request):
        military=MilitiryMember.objects.all() 
         
        return render(request,'visitors/militiryinfo.html',{'militiries':military,'field_name':self.field_name})
    
    def post(self,request):
        filters={}
        for key,value in request.POST.items():
            if value  in self.field_name:
               filters[value]=request.POST["search"]
        
        
        military=MilitiryMember.objects.filter(**filters)
        if not military:
           messages.error(request,'Record Not Found','warning')
        
        return render(request,'visitors/militiryinfo.html',{'militiries':military,'field_name':self.field_name})
    

class CreateMilitaryView(View):
    class_form=MilitiryInfoForm
    def get(self,request):
        form=self.class_form
        return render(request,'visitors/create_military.html',{"form":form})

    def post(self,request):
        form=self.class_form(request.POST)

        if form.is_valid():
            cd=form.cleaned_data
            MilitiryMember.objects.create(member_id=cd['member_id'],
                                            full_name=cd['full_name'],
                                            expiry_date=cd['expiry_date'],
                                            rank=cd['rank'],
                                            contact=cd['contact'])
            return redirect('visitors:militaryinfo')
        
        messages.error(request,'There is an error','error')
        return render(request,'visitors/create_military.html',{"form":form})    
    

class AddMilitaryVisitorsView(View):
    class_form=VisitInformationForm
    def get(self,request,id):
        current_date=datetime.datetime.now()
        current_time = datetime.datetime.now().strftime('%HH:%mm')
        military=get_object_or_404(MilitiryMember,id=id)
        form=self.class_form
        return render(request,'visitors/add_military_visitors.html',{'form':form,'military':military,'current_date':current_date,'current_time':current_time})    

    def post(self,request,id):
        form=self.class_form(request.POST)

        if form.is_valid():
            # print('@'*30)
            # print(request.POST)
            # print(request.headers)
            # print(request.META)
            # if 'application/json' in request.META.get('HTTP_ACCEPT', ''):
            is_ajax = request.POST.get('is_ajax', '0') == '1'
            if is_ajax:    
            # if request.headers.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
                # print('@'*30)
                return JsonResponse({"valid":True})
        # if request.is_ajax():
        # print(form.errors)
        return JsonResponse({"valid":False})


# # views.py

# from django.shortcuts import render, redirect
# from django.http import JsonResponse
# from .forms import MultiTableForm
# from .models import SourceTable, DestinationTable

# def submit_form(request):
#     if request.method == 'POST':
#         form = MultiTableForm(request.POST)
#         if form.is_valid():
#             try:
#                 # Save data to the source table
#                 source_instance = SourceTable(name=form.cleaned_data['source_name'])
#                 # Set other fields for the source table as needed
#                 source_instance.save()

#                 # Save data to the destination table
#                 destination_instance = DestinationTable(name=form.cleaned_data['destination_name'])
#                 # Set other fields for the destination table as needed
#                 destination_instance.save()

#                 if request.headers.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
#                     return JsonResponse({"valid": True})
#                 else:
#                     return redirect('success_page')  # Redirect to a success page

#             except Exception as e:
#                 # If there's an exception, handle it and return an error message
#                 error_message = str(e)
#                 if request.headers.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
#                     return JsonResponse({"valid": False, "error_message": error_message})
#                 else:
#                     # Render a regular response with an error message
#                     return render(request, 'submit_form.html', {'form': form, 'error_message': error_message})
#         else:
#             # If the form is not valid, return an error message
#             error_message = "Form is not valid. Please check your inputs."
#             if request.headers.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
#                 return JsonResponse({"valid": False, "error_message": error_message})
#             else:
#                 # Render a regular response with an error message
#                 return render(request, 'submit_form.html', {'form': form, 'error_message': error_message})
#     else:
#         form = MultiTableForm()

#     return render(request, 'submit_form.html', {'form': form})
