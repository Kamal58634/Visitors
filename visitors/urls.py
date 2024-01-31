from django.urls import path
from django.views.i18n import JavaScriptCatalog
from . import views
from .rest_views import ServiceTypeAPIView

app_name="visitors"
urlpatterns=[
    path('',views.ListMilitryView.as_view(),name='militaryinfo'),
    path('create_military/',views.CreateMilitaryView.as_view(),name='create_military'),
    path('military_visitors/<int:id>',views.AddMilitaryVisitorsView.as_view(),name='military_visitors'),
    path('partial_form/',views.partial_form_view, name='partial_form_view'),
    path('api/my-existing-view/', ServiceTypeAPIView.as_view(), name='my-existing-view-api')

]

    # path('jsi18n', JavaScriptCatalog.as_view(), name='js-catlog'),