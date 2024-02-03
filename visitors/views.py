import json
from django.urls import reverse
from django.views import View
from django.shortcuts import render,get_list_or_404,redirect,get_object_or_404
from .forms import MilitiryInfoForm,VisitInformationForm
from .models import MilitiryMember,Visit_Information,Visitor,SericeType,Desinition
from django.contrib import messages
from django.http import JsonResponse
import datetime
from django.utils import timezone
from util import time_zone
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.template.loader import render_to_string



from django.core.serializers import serialize


class ListMilitryView(View):
    field_name=[f.name for f in MilitiryMember._meta.get_fields()
                    if not (f.is_relation or f.one_to_one or f.many_to_many) and f.name !='id' and f.name!='created' and f.name !='active' ]
    
    def get(self,request):
        military=MilitiryMember.objects.all() 
       
        serviceType=SericeType.objects.all()
         
        return render(request,'visitors/militiryinfo.html',{'militiries':military,'field_name':self.field_name,'serviceType':serviceType})
    
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
        print(form)
        return render(request,'visitors/create_military.html',{"form":form})

    def post(self,request):
        form=self.class_form(request.POST)

        if form.is_valid():
            cd=form.cleaned_data
            user = request.user.id
            print('%'*45)
            print(cd['unit'])
            unitEnd=Desinition.objects.get(name=cd['unit'])
            MilitiryMember.objects.create(user_id=user,member_id=cd['member_id'],
                                            full_name=cd['full_name'],
                                            expiry_date=cd['expiry_date'],
                                            rank=cd['rank'],
                                            contact=cd['contact'],
                                            licence_plate=cd['licence_plate'],
                                            unit=unitEnd)
            return redirect('visitors:militaryinfo')
        
        messages.error(request,'There is an error','error')
        return render(request,'visitors/create_military.html',{"form":form})    
    
@method_decorator(csrf_exempt, name='dispatch')
class AddMilitaryVisitorsView(View):
    class_form=VisitInformationForm
    
    def get(self,request,id):
        # for key,value in request.GET.items():
            
        #     self.services.append(value)
        

        checkbox_values = {}
        for key in request.GET:
            checkbox_values[key] = request.GET.getlist(key)
            # self.services.append(request.GET.getlist(key))
        # for values in checkbox_values.values():
        #     for value in values:
        #         print(value)

        all_values = [value for values in checkbox_values.values() for value in values]    
        print(checkbox_values)
        # print(all_values)
        current_date=datetime.datetime.now()
        current_time = datetime.datetime.now().strftime('%HH:%mm')
        military=get_object_or_404(MilitiryMember,id=id)
        form=self.class_form
        return render(request,'visitors/add_military_visitors.html',{'form':form,'military':military,'current_date':current_date,'current_time':current_time})    
        # redirect_url='military_visitors/4'
        # try:
        # # Attempt to render the template to a string
        #     html_content = render_to_string('visitors/add_military_visitors.html', {
        #         'form': form,
        #         'military': military,
        #         'current_date': current_date,
        #         'current_time': current_time,
                
        #     })
        #     print(f"Redirect URL: {redirect_url}")
        #     return JsonResponse({'valid': True, 'html_content': html_content, 'redirect_url': redirect_url})

        # # Return JSON response with the rendered HTML content
        #     # return JsonResponse({'valid': True, 'html_content': html_content})
        # except Exception as e:
        # # Return JSON response with an error message
        #     return JsonResponse({'valid': False, 'error': str(e)})

    

        # Return the JSON response
        # return JsonResponse(data)

    def post(self,request,id):
        try:
            data = json.loads(request.body.decode('utf-8'))
            print("%"*40)
            print(data)
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
        
        print('@'*30)
        print(request.POST)
        if data:
            rows = data.get('rows', [])
            is_ajax =data.get('is_ajax', '0')
            i=0
            current_date=time_zone.current_time_specific()
            for row_data in rows:
                print('^'*30)
                print(row_data)
                form = self.class_form(row_data)
        
                if form.is_valid():


                    if is_ajax == '0':
                        # MilitiryMember
                        print('#$'*30)
                        # print(form)
                        # user_id=user_id

                        cd=form.cleaned_data
                        print(cd)
                        military_member = get_object_or_404(MilitiryMember, id=id)
                        # service_types=get_object_or_404(SericeType,id=1)
                        service_type_id = cd.get('service_type')  # assuming 'service_type' is a field in your form
                        service_types = get_object_or_404(SericeType, id=1)

                        print(service_types)
                        print(military_member)
                        user_id = request.user
                        #   
                        visitor =Visitor.objects.create(full_name=cd['full_name'],
                                            militiry_member=military_member,
                                            contact=cd['contact'],
                                            user=user_id
                                            )
                        if i==0:
                            # 
                            desination_value = cd['desination']
                            visit_info =Visit_Information.objects.create(gate=cd['gate'],
                                    desination_id=desination_value.id ,                                    
                                    # desination=desination_value,
                                    issue_time=current_date,
                                    militiry_member=military_member,
                                    user=user_id,
                                    service_type=service_types
                                    
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
# def partial_form_view(request):
#     # You can use the same form and template as mentioned in the previous responses
#     services=get_list_or_404(SericeType)
#     print('@'*30)
#     return render(request, '_partial_form_service_type.html',{'services':services})

def partial_form_view(request):
    services = SericeType.objects.all()
    serialized_services = serialize('json', services)
    print('%'*30)
    print(services)
    return JsonResponse(serialized_services, safe=False)

