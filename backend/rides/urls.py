from django.urls import path
from . import views

urlpatterns = [
    path('rides/', views.rides, name='rides'),
]