from django.db import models
from miniapp.models import Customer
from django.utils import timezone


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100,blank=False)
    image =  models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name_plural = "Categories"
    
    def __str__(self):
        return f"{self.name}-{self.id}"




class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100,blank=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.TextField()
    price = models.IntegerField(blank=False)
    unit = models.CharField(max_length=250,blank=False,default=None)
    current_stock = models.IntegerField(blank=False,default=0)
    stock_sold = models.IntegerField(blank=False,default=0)
    image = models.CharField(max_length=250,blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name 
    




class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, default=None)
    products = models.ManyToManyField(Product, through='OrderProduct')
    PAYMENT_CHOICES = [
        ('Credit Card', 'Credit Card'),
        ('JazzCash for Mobile Number', 'JazzCash for Mobile Number'),
        ('Cash on Delivery', 'Cash on Delivery'),
    ]

    payment_method = models.CharField(max_length=30, choices=PAYMENT_CHOICES,default='Cash on Delivery')
    order_date = models.DateTimeField(default=timezone.now)
    approved = models.BooleanField(default=False)
    total = models.IntegerField(default=0)


    def __str__(self):
        return f"Order Placed by Customer {self.customer.username} and order id is {self.id}"



class OrderProduct(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, default=None)
    product = models.ForeignKey(Product, on_delete=models.SET_DEFAULT, default=None, null=True)
    quantity = models.PositiveIntegerField(default=1)

    # Custom method to get the product name
    def product_name(self):
        if self.product_id is not None:
            return self.product.name
        else:
            return "Product Not Available"  # Placeholder for deleted products

    def __str__(self):
       return f"Order id: {self.order.id} --- Product id: {self.product_id} ---- Quantity: {self.quantity}"






#_____________________________________ Database Model for recommendation_________________________________________________

class Interaction(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    purchased = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.customer.username} - {self.product.name} (Purchased: {self.purchased})"


#_____________________________________ML Prediction Database Models______________________________________________________
# Create your models here.

class Prediction_Model(models.Model):
    name = models.CharField(max_length=100, blank=False)
    model_path = models.CharField(max_length=255, blank=True)
    product = models.OneToOneField(Product, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    

class Dataset(models.Model):
    date = models.DateField(auto_now_add=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    # id_of_product= models.IntegerField(default=0)
    price = models.IntegerField()
    sales = models.IntegerField()
    product_name = models.CharField(max_length=100, blank=True)

    def save(self, *args, **kwargs):
        # Populate product_name field when saving
        self.product_name = self.product.name
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Data for {self.product.name} on {self.date}"
    


class Prediction(models.Model):
    TIME_PERIOD_CHOICES = [
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly'),
    ]

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    prediction_date = models.DateTimeField(auto_now_add=True)
    time_period = models.CharField(max_length=10, choices=TIME_PERIOD_CHOICES)
    predicted_value = models.FloatField() 



    



