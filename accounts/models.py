from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .managers import UserManager
from django.core.exceptions import ValidationError


class User(AbstractBaseUser):
    email=models.EmailField(max_length=200,unique=True)
    full_name=models.CharField(max_length=200)
    phone_number=models.CharField(max_length=11,unique=True)
    is_active=models.BooleanField(default=True)
    is_admin=models.BooleanField(default=False)

    objects=UserManager()
    USERNAME_FIELD='phone_number'
    REQUIRED_FIELDS =('email','full_name')


    def __str__(self):
        return f'{self.full_name}-{self.phone_number}'
    
    def has_perm(self,perm,obj=None):
        return True
    
    def has_module_perms(self,app_labble):
        return True
    
    @property
    def is_staff(self):
        return self.is_admin
    
    