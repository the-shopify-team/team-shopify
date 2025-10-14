from rest_framework import serializers
from .models import *
import json

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarModel
        fields = '__all__'
