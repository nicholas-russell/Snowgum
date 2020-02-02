from . import views
from django.urls import path, include

# Endpoints
# /api/inc
#   - GET: get all incidentals
#   - POST: make new incidental
# /api/inc/##
#   - GET: gets details of individual incidental
#   - PUT/PATCH: update (needs user middleware)
#   - DELETE: deletes (needs user middleware)
# /api/inc/##/verify
#   - POST: verifies (needs user middleware)
# /api/inc/##/approve_image
#   - POST: approves image (needs user middleware)

app_name = 'api'
urlpatterns = [
    path('inc/', views.IndexView.as_view(), name='inc'),
    path('inc/<int:inc_id>', views.DetailView.as_view(), name='inc_det'),
    path('auth/', views.AuthView.as_view())
]
