from django.contrib import admin
from .models import Customer
# Register your models here.


@admin.register(Customer)
class info(admin.ModelAdmin):
    list_display  = ['username','password','confirm']             # the name 'list_display' is a must