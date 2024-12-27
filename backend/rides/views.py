from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
import osmnx as ox
from aStarEngine_package.utils.routing import Routing
from django.contrib.auth.models import User
from .models import Rider 
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken


# In-memory storage for coords (for simplicity; replace with database for production)
stored_coords = None  # Global variable to store the last calculated route coordinates



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
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
@permission_classes([AllowAny])
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
@permission_classes([AllowAny])
def rider_login(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get("password")
        try:
            user = authenticate(request, email=email, password=password)
            if user is not None:
                # login(request, user) # Not using the django sessions , directly using drf token
                # token, created = Token.objects.get_or_create(user=user) #TOken created and sent to frontend to store in local storage
                
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)
                
                response = Response({"message":"Login Successful"},status=200)
                response.set_cookie(
                    key="access_token",
                    value=access_token,
                    httponly = True,
                    secure= True,
                    samesite="Lax",
                )
                response.set_cookie(
                    key="refresh_token",
                    value = refresh_token,
                    httponly=True,
                    secure = True,
                    samesite = "Lax",
                )
                return response
            else:
                return Response({"error": "Invalid login credentials"}, status=401)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_token(request):
    refresh_token = request.COOKIES.get('refresh_token')
    if not refresh_token:
        return Response({"error": "Refresh token missing"}, status=400)
    try:
        token = RefreshToken(refresh_token)
        access_token = str(token.access_token)

        # Set the new access token as a cookie
        response = Response({"message": "Token refreshed"})
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=True,
            samesite="Lax",
        )
        return response
    except Exception as e:
        return Response({"error": "Invalid refresh token"}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def logout(request):
    response = Response({"message": "Logged out successfully"}, status=200)
    response.delete_cookie("access_token")  # Clear the access token cookie
    response.delete_cookie("refresh_token")  # Clear the refresh token cookie (if applicable)
    return response
