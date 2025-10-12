from django.urls import path
from .views import *

urlpatterns = [
    path('', UserReservation.as_view(), name='alluserreservations'),
    path('<int:pk>', UserDetailReservation.as_view(), name='userreservationdetails')
]