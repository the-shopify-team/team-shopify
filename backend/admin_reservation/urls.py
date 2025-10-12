from django.urls import path
from .views import *


urlpatterns = [
    path('admin/', AdminReservationView.as_view(), name='admin views'),
    path('admin/<int:pk>', AdminReservationDetailView.as_view(), name="admin reservation detail")
]