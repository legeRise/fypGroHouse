from rest_framework import serializers
from .models import Product,Category,Order




class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        id = serializers.ReadOnlyField()
        exclude = [ 'created_at', 'updated_at']




class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        id = serializers.ReadOnlyField()
        fields = ['id','name', 'image']

        def validate_name(self, value):
            # Remove spaces from the name
            return value.replace(" ", "")
            



class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        id = serializers.ReadOnlyField()
        fields = "__all__"