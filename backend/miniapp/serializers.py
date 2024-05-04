from rest_framework import serializers
from .models import Customer




class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        id = serializers.ReadOnlyField()
        fields = "__all__"
