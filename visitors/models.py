from django.db import models


class MilitiryMember(models.Model):
    member_id=models.CharField(max_length=200,unique=True)
    expiry_date=models.DateTimeField()
    full_name=models.CharField(max_length=200)
    rank=models.CharField(max_length=100)
    contact=models.CharField(max_length=11)


class Visitor(models.Model):
    militiry_member=models.ForeignKey(MilitiryMember,on_delete=models.CASCADE,relted_name='MilitiryMembers')
    full_name=models.CharField(max_length=200)
    contact=models.CharField(max_length=11)


class Visit_Information(models.Model):
    militiry_member=models.ForeignKey(MilitiryMember,on_delete=models.CASCADE,related_name='MilitiryMembers')
    visitor=models.ManyToManyField(Visitor,related_name='')
    gate=models.CharField(max_length=200)
    desination=models.CharField(max_length=200)
    unit=models.CharField(max_length=200)
    issue_time=models.DateTimeField(auto_now_add=True)
    updated=models.DateTimeField(auto_add=True)
