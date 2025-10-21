from django.db import models

# Create your models here.

class CarModel(models.Model):
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.PositiveIntegerField(null=True)
    color = models.CharField(max_length=100)
    price = models.DecimalField(decimal_places=2, max_digits=10)
    transmission = models.CharField(max_length=50, choices=[
        ('manual', 'Manual'),
        ('automatic', 'Automatic'),
        ('cv', 'Continiously Variable'),
    ])
    fuel_type = models.CharField(max_length=50, choices=[
        ('petrol', 'Petrol'),
        ('diesel', 'Diesel'),
        ('electric', 'Electric'),
        ('hybrid', 'Hybrid')
    ])
    license_plate = models.CharField(max_length=100, unique=True, null=True)
    category = models.CharField(max_length=100, choices=[
        ('SUV', 'SUV'), 
        ('Sedan', 'Sedan'), 
        ('Convertible', 'Convertible'), 
        ('Super car', 'Super car')
    ])
    description = models.TextField(null=True, blank=True)
    images_url = models.JSONField(default=list)
    added_at = models.DateField(auto_now_add=True)
    available = models.BooleanField(default=True)


