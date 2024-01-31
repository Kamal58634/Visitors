# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import SericeType
from .serializers import ServiceTypeSerializer

class ServiceTypeAPIView(APIView):
    def get(self, request, *args, **kwargs):
        services = SericeType.objects.all()
        serializer = ServiceTypeSerializer(services, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
