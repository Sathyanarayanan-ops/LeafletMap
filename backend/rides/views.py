from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import osmnx as ox
from aStarEngine_package.utils.routing import Routing
from django.contrib.auth.models import User
from .models import Rider 
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required


# In-memory storage for coords (for simplicity; replace with database for production)
stored_coords = None  # Global variable to store the last calculated route coordinates


@login_required(login_url='/api/rider-login/')
@api_view(['GET', 'POST'])
def trips(request):
    """
    Trips function that takes in the HTTP request from the frontend and returns a route,
    making use of the map engine library.

    GET:
        Returns the last calculated route coordinates (if available).

    POST:
        Calculates and returns the route based on provided stops.

    Returns:
        Response with route coordinates or an error message.
    """
    global stored_coords

    if request.method == 'POST':
        # Extract stops from request data
        stops = request.data.get("trip")  # Use `.get()` to handle missing keys gracefully
        if not stops:
            return Response(
                {"error": "No stops provided in the request data."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Load the graph and calculate the route
        try:
            graph_path = '/Users/sathya/Desktop/reactLearning/gmaps-companion/backend/data/LA_road_network.graphml'
            G = ox.load_graphml(graph_path)
            router = Routing(graph_path)
            route = router.get_route(stops)
            coords = [[G.nodes[node]['y'], G.nodes[node]['x']] for node in route]

            # Store the calculated coordinates for future GET requests
            stored_coords = coords

            # Return the response with coordinates
            return Response(coords, status=status.HTTP_200_OK)

        except Exception as e:
            # Handle errors gracefully and return a detailed error message
            return Response(
                {"error": f"An error occurred while processing the request: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'GET':
        # Check if there are stored coordinates
        if stored_coords is None:
            return Response(
                {"message": "No route has been calculated yet."},
                status=status.HTTP_204_NO_CONTENT  # Use 204 for "No Content"
            )
        
        # Return the stored coordinates
        return Response(stored_coords, status=status.HTTP_200_OK)


    # If the request method is neither GET nor POST
    return Response({"error": "Invalid request method."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
def rider_signup(request):
    if request.method == 'POST':
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        username =  first_name + last_name
        email = request.data.get('email')
        password = request.data.get('password')
        
        if User.objects.filter(email=email).exists():   # User.objects corresponds to auth_users so the query set is for that table 
            return Response({"error":"email already exists"},status=400)
        
        user = User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password = password)
        
        rider = Rider.objects.create(
            user=user
        )

        return Response({"message":"Rider Created successfully!"},status = 201)
        
        
@api_view(['POST'])
def rider_login(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get("password")
        try:
            user = authenticate(request, email=email, password=password)
            if user is not None:
                login(request, user)
                return Response({"message": "Login successful"}, status=200)
            else:
                return Response({"error": "Invalid login credentials"}, status=400)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
