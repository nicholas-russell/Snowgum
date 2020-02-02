from . import views
from django.urls import path, include

app_name = 'site'
urlpatterns = [
    path('', views.index, name='index'),
    path('about', views.about, name='about'),
    path('data', views.data, name='data'),
    path('gallery', views.gallery, name='gallery'),
    path('contact', views.contact, name='contact'),
    path('report', views.report, name='report'),
    path('inc/', views.IncView.index, name='inc_index'),
    path('inc/<int:inc_id>', views.IncView.detail, name='inc_detail')
]