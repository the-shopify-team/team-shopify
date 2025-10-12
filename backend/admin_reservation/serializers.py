from rest_framework import serializers
from .models import ReservationModel


class ReservationSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    car_name = serializers.CharField(source='car.make', read_only=True)
    price = serializers.IntegerField(source='car.price', read_only=True)

    class Meta:
        model = ReservationModel
        fields = ['id', 'user', 'car','username', 'car_name', 'price','status', 'email', 'phone', 'date_reserved', 'expiry_date']