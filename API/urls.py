from . import views
from django.urls import path


app_name = 'api'
urlpatterns = [
    path('inc/', views.IndexView.as_view(), name='inc'),
    path('inc/<int:inc_id>', views.DetailView.as_view(), name='inc_det'),
    path('inc/<int:inc_id>/approve-image', views.approve_image, name='inc_apr_img'),
    path('inc/<int:inc_id>/verify', views.verify, name='inc_verify'),
    path('inc/dt', views.IncidentalListJson.as_view(), name='inc_dt'),
    path('auth/', views.AuthView.as_view()),
    path('factory/<int:number>', views.factory)
]
