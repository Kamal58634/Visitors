from django.urls import path
from . import views
app_name='accounts'

urlpatterns=[
    path('register/',views.UserRegistionForm.as_view(),name='registration'),
    path('verify',views.UserVerifyView.as_view(),name='verify'),
]