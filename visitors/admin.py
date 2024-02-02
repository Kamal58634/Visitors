from django.contrib import admin
from .models import MilitiryMember,Visit_Information,Visitor,SericeType,Desinition,Tag

# Register your models here.
admin.site.register(MilitiryMember)
admin.site.register(Visitor)
admin.site.register(Visit_Information)
admin.site.register(SericeType)
admin.site.register(Desinition)
admin.site.register(Tag)
