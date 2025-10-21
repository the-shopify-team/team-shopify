from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class CustomUserModel(AbstractUser):
    email = models.EmailField(unique=True, blank=True, null=True)
    phone = models.CharField(max_length=15, null=True, unique=True, blank=True)
    username = models.CharField(max_length=159, unique=True, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email or self.phone or self.username
