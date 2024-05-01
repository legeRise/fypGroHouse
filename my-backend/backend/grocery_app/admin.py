from django.contrib import admin
from .models import Product,Prediction_Model,Dataset,Category

# Register your models here.

admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Prediction_Model)
admin.site.register(Dataset)