from django.db import models

# Create your models here.



class Customer(models.Model):
    username = models.CharField(max_length=200, blank=False, unique=True)
    email = models.EmailField(blank=False, unique=True)
    password = models.CharField(max_length=50, blank=False)
    confirm = models.CharField(max_length=50, blank=False)
    phone = models.CharField(max_length=20, blank=False, unique=True)
    address = models.CharField(max_length=255, blank=False)

    def __str__(self):
        return self.username  # Display the username when printing a Customer object

    
    

    def __str__(self):
        return self.username
