from django.urls import path
from .views import trips
from .views import rider_signup
from .views import rider_login
from .views import logout
# from .views import validate_session
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path('api/trips/', trips, name='trips'),
    path('api/rider-signup/',rider_signup, name = 'rider-signup'),
    path('api/rider-login/',rider_login,name='rider-login'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # For the DRF-JWT
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # For the DRF-JWT
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/logout/',logout,name='logout'),

]