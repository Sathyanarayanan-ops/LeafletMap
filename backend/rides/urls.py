from django.urls import path
from .views import trips
from .views import rider_signup

urlpatterns = [
    path('api/trips/', trips, name='trips'),
    path('api/rider-signup/',rider_signup, name = 'rider-signup'),
]