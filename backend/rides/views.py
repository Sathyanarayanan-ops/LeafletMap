
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import osmnx as ox
import osmapi as osm

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
        #print(request.data)
        stops = request.data["trip"]        # Contains the actual stop(s)
        #print(stops)
        
        graph_path = '/Users/sathya/Desktop/reactLearning/gmaps-companion/backend/data/LA_road_network.graphml'
        G = ox.load_graphml(graph_path)
        router = Routing(graph_path)
        route = router.get_route(stops)
        print("Node corresponding lat : ",G.nodes[123573347]['y'])
        print("Node corresponding long : ",G.nodes[123573347]['x'])
        
        api = osm.OsmApi()
        # testnode = api.NodeGet()
        
        # coords = [[G.nodes[node]['y'], G.nodes[node]['x']] for node in route]
        # print(coords)
        #123573347 start node 
        # 123539927, 123135327 end nodes
        
        test_node = api.NodeGet(123573347)
        print("Testing the other onoe",test_node['lat'])
        print(test_node['lon'])

        print(route)
        
        return Response()