from . import views
from django.urls import path, include


app_name = 'api'
urlpatterns = [
    path('', views.index),
]