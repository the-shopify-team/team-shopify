from django.urls import path
from .views import *

urlpatterns = [
    path('', CarView.as_view(), name="cars"),
    path('<int:pk>', CarDetials.as_view(), name="cardetails")
]