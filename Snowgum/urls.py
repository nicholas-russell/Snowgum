"""Snowgum URL Configuration"""
from django.contrib import admin
from django.urls import path, include
from . import settings
from django.conf.urls.static import static
from django.contrib.auth import views

urlpatterns = [
    path('admin/', admin.site.urls, name='admin'),
    path('', include('Site.urls')),
    path('api/', include('API.urls')),
    path('login/', views.LoginView.as_view(template_name='auth/login.html'), name='login'),
    path('logout/', views.LogoutView.as_view(template_name='auth/logout.html', next_page='/'), name='logout'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
