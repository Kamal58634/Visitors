from django import forms
from .models import MilitiryMember,Visit_Information
from django.contrib.admin.widgets import AdminDateWidget,AdminTimeWidget, AdminSplitDateTime

class MilitiryInfoForm(forms.ModelForm):
        

        class Meta:
                
                model=MilitiryMember
                #fields=('__all__')
                exclude=('user','created','active')
                # wigets={
                #         'date_return':AdminDateWidget(),
                #         'time_return':AdminTimeWidget(),
                # }

class VisitInformationForm(forms.ModelForm):
        full_name=forms.CharField(max_length=200)
        contact=forms.CharField(max_length=11)        

        class Meta:
                model=Visit_Information
                fields=('gate','desination','tag_no')

class TypeOfServicesPartialForm(forms.Form):
        type=forms.IntegerField()        