from django.urls import path
from .views import *

urlpatterns = [
    path('all', AllCarView.as_view(), name="allcars"),
    path('<int:pk>', DetailsCarViews.as_view(), name="cardetails"),
    path('add', AddCarView.as_view(), name="add car"),
    path('update/<int:pk>', UpdateCarViews.as_view(), name="update car")
]