
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from aStarEngine_package.algorithms.aStar_multi import astar_pathfind_multi_stop

from aStarEngine_package.utils.routing import Routing 



@api_view(['POST'])
def trips(request):
    '''
        Trips function , that takes in the HTTP req from the frontend and returns route , making use of 
        the map engine library
        
        Returns:
            route - array 
    
    '''
    if request.method == 'POST':
        print(request.data)
        stops = request.data["trip"]        # Contains the actual stop(s)
        print(stops)
        graph_path = '/Users/sathya/Desktop/reactLearning/gmaps-companion/backend/data/LA_road_network.graphml'
        router = Routing(graph_path)
        route = router.get_route(stops)
        print("Multi Stop path : ",route)
        
        return Response(request.data)