from . import views
from django.urls import path, include

app_name = 'site'
urlpatterns = [
    path('', views.index, name='index'),
    path('about', views.about, name='about'),
    path('data', views.data, name='data'),
    path('gallery', views.gallery, name='gallery'),
    path('contact', views.contact, name='contact'),
]