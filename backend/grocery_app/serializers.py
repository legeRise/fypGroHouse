from rest_framework import serializers
from .models import Product,Category


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
