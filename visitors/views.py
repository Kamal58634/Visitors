import json
from django.urls import reverse
from django.views import View
from django.shortcuts import render,get_list_or_404,redirect,get_object_or_404
from .forms import MilitiryInfoForm,VisitInformationForm
from .models import MilitiryMember,Visit_Information,Visitor
from django.contrib import messages
from django.http import JsonResponse
import datetime
from django.utils import timezone
from util import time_zone
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

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
    
@method_decorator(csrf_exempt, name='dispatch')
class AddMilitaryVisitorsView(View):
    class_form=VisitInformationForm
    def get(self,request,id):
        current_date=datetime.datetime.now()
        current_time = datetime.datetime.now().strftime('%HH:%mm')
        military=get_object_or_404(MilitiryMember,id=id)
        form=self.class_form
        return render(request,'visitors/add_military_visitors.html',{'form':form,'military':military,'current_date':current_date,'current_time':current_time})    

    def post(self,request,id):
        try:
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            data = {}
            form=self.class_form(request.POST)
            print(request.POST)
            if form.is_valid():
                is_ajax =request.POST.get('is_ajax', '0')
                if is_ajax == '1':    
                  # print('@'*30)
                  return JsonResponse({"valid":True})
            return JsonResponse({"valid":False})
        # print(data)    
        
        # print('@'*30)
        # print(request.POST)
        if data:
            rows = data.get('rows', [])
            is_ajax =data.get('is_ajax', '0')
            i=0
            current_date=time_zone.current_time_specific()
            for row_data in rows:
                form = self.class_form(row_data)
        
                if form.is_valid():


                    if is_ajax == '0':
                        # MilitiryMember
                        print('@'*30)
                        print(request.POST)
                        
                        cd=form.cleaned_data
                        
                        military_member = get_object_or_404(MilitiryMember, id=id)
                        user_id = request.user.id
                        
                        visitor =Visitor.objects.create(full_name=cd['full_name'],
                                            militiry_member=military_member,         
                                            contact=cd['contact'],
                                            user_id=user_id)
                        if i==0:
                            visit_info =Visit_Information.objects.create(gate=cd['gate'],
                                    desination=cd['desination'],
                                    unit=cd['unit'],
                                    issue_time=current_date,
                                    militiry_member=military_member,
                                    user_id=user_id
                                                            )
                            
                            
                            visit_info.visitor.add(visitor)
                i+=1
                        # return redirect('home:home')redirect_url
            return JsonResponse({"valid":True,"redirect_url":reverse('visitors:militaryinfo')})
            print(form.errors)
            print(request.body)    
        return JsonResponse({"valid":False})




    # def post(self, request, id):
    #     form = self.class_form(request.POST)
    #     if form.is_valid():
    #         is_ajax = request.POST.get('is_ajax', '0')  # Default to '0' if not present
    #         if is_ajax == '1':
    #             return JsonResponse({"valid": True})
    #         elif is_ajax == '0':
    #             cd = form.cleaned_data

    #             military_member = get_object_or_404(MilitiryMember, id=id)
                
    #             visit_info = Visit_Information.objects.create(
    #                 gate=cd['gate'],
    #                 desination=cd['desination'],
    #                 unit=cd['unit'],
    #                 issue_time=current_date,  # You need to set the issue_time here
    #                 militiry_member=military_member
    #             )

    #             visitor = Visitor.objects.create(
    #                 full_name=cd['full_name'],
    #                 contact=cd['contact']
    #             )
    #             visit_info.visitor.add(visitor)

    #             return redirect('home:home')

    #     return JsonResponse({"valid": False})
