
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import osmnx as ox

from aStarEngine_package.algorithms.aStar_multi import astar_pathfind_multi_stop

from aStarEngine_package.utils.routing import Routing 



@api_view(['GET','POST'])
def trips(request):
    '''
        Trips function , that takes in the HTTP req from the frontend and returns route , making use of 
        the map engine library
        
        Returns:
            route - array 
    
    '''
    if request.method == 'POST':
        #print(request.data)
        stops = request.data["trip"]        # Contains the actual stop(s)
        #print(stops)
        
        graph_path = '/Users/sathya/Desktop/reactLearning/gmaps-companion/backend/data/LA_road_network.graphml'
        G = ox.load_graphml(graph_path)
        router = Routing(graph_path)
        route = router.get_route(stops)
        # print("Node corresponding lat : ",G.nodes[11859347449]['y'])
        # print("Node corresponding long : ",G.nodes[11859347449]['x'])
        
        
        coords = [[G.nodes[node]['y'], G.nodes[node]['x']] for node in route]
        # print(coords)
        #123573347 start node 
        # 123539927, 123135327 end nodes
        

        # print(route)
        
        return coords