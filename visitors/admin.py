from django.contrib import admin
from .models import MilitiryMember,Visit_Information,Visitor

# Register your models here.
admin.site.register(MilitiryMember)
admin.site.register(Visitor)
admin.site.register(Visit_Information)
