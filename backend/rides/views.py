
from django.shortcuts import render
from django.http import HttpResponse

def trips(request):
    if request.method == "POST":
        return HttpResponse('POST request received')
    elif request.method == "GET":

        return HttpResponse('Got Get instead')
    else :
        return HttpResponse('Some error',status = 405)

