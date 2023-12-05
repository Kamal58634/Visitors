from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as UserBaseAdmin
from .forms import UserChanegeForm,UserCreationForm
from django.contrib.auth.models import Group
from .models import User


class UserAdmin(UserBaseAdmin):
    form=UserChanegeForm
    add_form=UserCreationForm
    list_display=('email','phone_number','full_name','is_admin')
    list_filter=('is_admin',)
    fieldsets=(
        (None,{"fields":['phone_number','email','password','is_active']}),
        ("Personal Info",{"fields":["full_name"]}),
        ("Permissions",{"fields":["is_admin"]})
    )
    add_fieldsets=(
        (None,{"fields":["email","phone_number","full_name","password1","password2"]}),
    )
    search_fields=('phone_number','full_name')
    ordering=('full_name',)
    filter_horizontal=[]

admin.site.register(User,UserAdmin)
admin.site.unregister(Group)