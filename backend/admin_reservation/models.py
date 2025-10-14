from django.db import models
from django.contrib.auth import get_user_model
from carproduct.models import CarModel

User = get_user_model()

# Create your models here.


class ReservationModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
    car = models.ForeignKey(CarModel, on_delete=models.CASCADE, related_name="car")
    status = models.CharField(max_length=10, choices=[
        ('soft', 'soft'),
        ('firm', 'firm'),
        ('expired', 'expired'),
        ('deleted', 'deleted'),
        ('completed', 'completed')
    ])
    email = models.EmailField(null=True, blank=True)
    phone = models.CharField(null=True, blank=True)
    date_reserved = models.DateTimeField(auto_now_add=True)
    expiry_date = models.DateField(null=True, blank=True)