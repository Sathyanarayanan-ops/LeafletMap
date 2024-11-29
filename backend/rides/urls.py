from django.urls import path
from .views import trips

urlpatterns = [
    path('api/trips/', trips, name='trips'),
]