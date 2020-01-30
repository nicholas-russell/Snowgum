from . import views
from django.urls import path, include

app_name = 'report'
urlpatterns = [
    path('', views.index, name='index'),
]