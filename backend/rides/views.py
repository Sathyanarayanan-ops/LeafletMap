
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST'])
def trips(request):
    if request.method == 'POST':
        print(request.data)
        return Response(request.data)