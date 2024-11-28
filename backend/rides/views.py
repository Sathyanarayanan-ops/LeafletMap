from django.shortcuts import render
from django.http import HttpResponse

def trips(request):
    return HttpResponse("Hello world!")
