from django.db import models


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


# Create your models here.
class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100,blank=False)
    description = models.TextField()
    price = models.IntegerField(blank=False)
    stock = models.IntegerField(blank=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    image = models.CharField(max_length=250,blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name 
    

class Prediction_Model(models.Model):
    name = models.CharField(max_length=100, blank=False)
    model_path = models.CharField(max_length=255, blank=True)
    product = models.OneToOneField(Product, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    

class Dataset(models.Model):
    date = models.DateField(auto_now_add=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.IntegerField()
    sales = models.IntegerField()
    product_name = models.CharField(max_length=100, blank=True)

    def save(self, *args, **kwargs):
        # Populate product_name field when saving
        self.product_name = self.product.name
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Data for {self.product.name} on {self.date}"
    




    



