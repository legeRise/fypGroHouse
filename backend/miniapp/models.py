from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


# class Customer(models.Model):
class Customer(AbstractUser):
    email = models.EmailField(blank=False, unique=True)
    phone = models.CharField(max_length=20, blank=False, unique=True)
    address = models.CharField(max_length=255, blank=False)

    def __str__(self):
        return self.username  # Display the username when printing a Customer object

    

