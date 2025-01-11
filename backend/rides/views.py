from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
import osmnx as ox
from aStarEngine_package.utils.routing import Routing
from django.contrib.auth.models import User
from .models import Rider 
from .models import Driver
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404
from .models import Rides

# In-memory storage for coords (for simplicity; replace with database for production)
stored_coords = None  # Global variable to store the last calculated route coordinates


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def trips(request):
    """
    Trips function that takes in the HTTP request from the frontend and calculates the fare
    based on the route distance in miles.
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

            # Calculate the total path length
            path_length_meters = sum(
                G[u][v][0].get('length', 0) for u, v in zip(route[:-1], route[1:])
            )
            path_length_miles = path_length_meters / 1609.34  # Convert meters to miles

            # Store the calculated coordinates for future GET requests
            coords = [[G.nodes[node]['y'], G.nodes[node]['x']] for node in route]
            stored_coords = coords

            # Calculate fare (example: $2 per mile)
            fare = round(path_length_miles * 2, 2) + 5

            # Return the response with coordinates, distance, and fare
            return Response({
                "coordinates": coords,
                "distance_miles": round(path_length_miles, 2),
                "fare": fare
            }, status=status.HTTP_200_OK)

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
                status=status.HTTP_204_NO_CONTENT
            )
        
        # Return the stored coordinates
        return Response(stored_coords, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def rider_signup(request):
    if request.method == 'POST':
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get('email')
        username = f"{email.split('@')[0]}_{User.objects.count() + 1}"
        password = request.data.get('password')
        
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=400)
        
        user = User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password
        )
        
        Rider.objects.create(user=user)

        return Response({"message": "Rider created successfully!"}, status=201)
        

@api_view(['POST'])
@permission_classes([AllowAny])
def rider_login(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get("password")
        try:
            user = authenticate(request, email=email, password=password)
            if user is not None:
                # Check if the user is a Rider
                if hasattr(user, 'rider_profile'):
                    refresh = RefreshToken.for_user(user)
                    return Response({
                        "access": str(refresh.access_token),
                        "refresh": str(refresh)
                    }, status=200)
                else:
                    return Response({"error": "User is not a rider"}, status=403)
            else:
                return Response({"error": "Invalid login credentials"}, status=401)
        except Exception as e:
            return Response({"error": str(e)}, status=500)


@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_token(request):
    refresh_token = request.data.get('refresh_token')
    if not refresh_token:
        return Response({"error": "Refresh token missing"}, status=400)
    try:
        token = RefreshToken(refresh_token)
        return Response({
            "access": str(token.access_token)
        })
    except Exception as e:
        return Response({"error": "Invalid refresh token"}, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    """
    For JWT, logout doesn't invalidate the token but can be handled client-side by removing the token.
    """
    return Response({"message": "Logged out successfully"}, status=200)


@api_view(['POST'])
@permission_classes([AllowAny])
def driver_signup(request):
    if request.method == 'POST':
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get('email')
        username = f"{email.split('@')[0]}_{User.objects.count() + 1}"
        password = request.data.get('password')
        license_num = request.data.get('license_num')
        car_model = request.data.get('car_model')
        
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=400)
        
        user = User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password,
        )
        
        Driver.objects.create(
            user=user,
            license_number=license_num,
            car_model=car_model
            )

        
        return Response({"message":"Driver Created successfully"},status = 201)
        
        
@api_view(['POST'])
@permission_classes([AllowAny])
def driver_login(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = authenticate(request, email=email, password=password)
            if user is not None:
                # Check if the user is a Driver
                if hasattr(user, 'driver_profile'):
                    refresh = RefreshToken.for_user(user)
                    return Response({
                        "access": str(refresh.access_token),
                        "refresh": str(refresh)
                    }, status=200)
                else:
                    return Response({"error": "User is not a driver"}, status=403)
            else:
                return Response({"error": "Invalid login credentials"}, status=401)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
        
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_rider_profile(request):
    user = request.user
    
    try:
        rider_profile = user.rider_profile # accesses related name from the Rider
        return Response({
            "name": f"{user.first_name} {user.last_name}",
            "email": user.email,
            "total_rides": rider_profile.total_rides,
            "miles": rider_profile.miles,
            "amount_spent": rider_profile.amount_spent,
        }, status = 200)
    except Exception as e:
        return Response({'error':"Rider Profile not found"},status=400)



@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def broadcast_ride(request):
    # RideNow button on click will post the data 
    if request.method == 'POST':
        rider = get_object_or_404(Rider,user=request.user)
        ride_request = Rides.objects.create(
            rider=rider,
            pickup = request.data.get('pickupLocation'),
            dropoff=request.data.get('dropoffLocation'),
            inter_stops=request.data.get('stops', []),  # Default to empty list if not provided
            cost=request.data.get('fare'),
            miles=request.data.get('distance'),
            driver_name="",  # Driver not assigned yet
            car_model="",  # Car model not assigned yet
            status="pending",  # Default status
        )
        
        return Response({
            "message":"Ride request created successfully",
            "ride_id":ride_request.id,
            "status":ride_request.status
            },status=201)
        
    elif request.method == 'GET':
        pending_rides = Rides.objects.filter(status="pending").values(
            'id','pickup','dropoff','inter_stops','cost','miles','status'
        )
        return Response(list(pending_rides),status=200)
    
# Will need tosave the ride as pending and finished accordingly 
#Can be handled here