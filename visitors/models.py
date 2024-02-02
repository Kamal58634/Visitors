from django.db import models
from accounts.models import User
from django.utils import timezone

class MilitiryMember(models.Model):
    rank_id={("1","S1"),("2","S2"),("3","S3"),}

    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name='Musers')
    member_id=models.CharField("MilitaryID",max_length=200,unique=True)
    expiry_date=models.DateField()
    full_name=models.CharField(max_length=200,)
    rank=models.CharField(max_length=100,choices=rank_id)
    contact=models.CharField(max_length=11)
    created=models.DateTimeField(auto_now_add=True,null=True,blank=True)
    licence_plate=models.CharField(null=True,blank=True,max_length=6)
    active=models.BooleanField(default=True)

    def __str__(self):
        return f'{self.member_id}--{self.full_name}'


class Visitor(models.Model):
    user=models.ForeignKey(User,null=True,on_delete=models.CASCADE,related_name='Vusers')
    militiry_member=models.ForeignKey(MilitiryMember,on_delete=models.CASCADE,related_name='MilitiryMembers')
    full_name=models.CharField(max_length=200)
    contact=models.CharField(max_length=11)

    def __str__(self):
        return self.full_name
class SericeType(models.Model):
    code=models.PositiveSmallIntegerField()
    name=models.CharField(max_length=100)

    def __str__(self) :
        return f'{self.name}---{self.code}'

class Desinition(models.Model):
    name=models.CharField(max_length=100,null=True,blank=True)
    type=models.PositiveIntegerField(default=1)

    def __str__(self) :
        return f'{self.name}'

class Tag(models.Model):
    name=models.CharField(max_length=50)
    type=models.PositiveSmallIntegerField()
    active=models.BooleanField(default=False)
    def __str__(self) :
        return f'{self.name}'

class Visit_Information(models.Model):
    Gates=(('0','DockYard'),('1','Naden'),('2','WorkPoint'))
    user=models.ForeignKey(User ,null=True,on_delete=models.CASCADE,related_name='Viusers')
    militiry_member=models.ForeignKey(MilitiryMember,on_delete=models.CASCADE,related_name='MilitiryMembersI')
    visitor=models.ManyToManyField(Visitor,related_name='visitors')
    gate=models.CharField(max_length=200,choices=Gates)
    desination=models.ForeignKey(Desinition,on_delete=models.CASCADE,related_name='desinition_d')
    unit=models.ForeignKey(Desinition,blank=True, null=True,on_delete=models.CASCADE,related_name='desinition_u')
    returnd=models.BooleanField(default=False)
    issue_time=models.DateTimeField()#default=timezone.now
    updated=models.DateTimeField(auto_now=True)
    date_return = models.DateField(blank=True, null=True)
    time_return = models.TimeField(blank=True, null=True)
    tag_no=models.ForeignKey(Tag,blank=True, null=True,on_delete=models.CASCADE,related_name='tag')
    # licence_plate=models.CharField(default=0,max_length=6)
    gear_no=models.CharField(default=0,max_length=6)
    service_type=models.ForeignKey(SericeType,on_delete=models.CASCADE,related_name="service_t")
    
    def __str__(self):
        return f'{self.visitor}--{self.issue_time}'
    






