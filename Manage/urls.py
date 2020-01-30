from . import views
from django.urls import path, include

app_name = 'manage'
urlpatterns = [
    path('', views.index),
]