from django.urls import path
from . import trips

urlpatterns = [
    path('api/trips/', views.trips, name='trips'),
]