from django.urls import path
from .views import trips
from .views import signup

urlpatterns = [
    path('api/trips/', trips, name='trips'),
    path('api/signup/',signup, name = 'signup'),
]