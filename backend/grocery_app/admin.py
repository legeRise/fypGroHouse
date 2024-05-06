from django.contrib import admin
from .models import Product,Prediction_Model,Dataset,Category,Order,OrderProduct,Interaction,Prediction
# Register your models here.

admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Prediction_Model)
admin.site.register(Dataset)
# admin.site.register(Information)
# admin.site.register(PaymentMethod)
admin.site.register(Order)
admin.site.register(OrderProduct)
admin.site.register(Interaction)
admin.site.register(Prediction)


