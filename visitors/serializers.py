from rest_framework import serializers
from .models import SericeType

class ServiceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SericeType
        fields = '__all__'