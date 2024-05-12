from rest_framework import serializers
from .models import Customer




class CustomerSerializer(serializers.ModelSerializer):
    confirm = serializers.CharField(write_only=True)  # Serializer-level field for confirmation password
    
    class Meta:
        model = Customer
        fields = ['username', 'email', 'password', 'confirm', 'phone', 'address']

    

    def validate_username(self, value):
        """
        Check if the username is already registered.
        """
        if Customer.objects.filter(username=value).exists():
            raise serializers.ValidationError("User with this Username already Exists")
        return value



    def validate_email(self, value):
        """
        Check if the email is already registered.
        """
        if Customer.objects.filter(email=value).exists():
            raise serializers.ValidationError("User with this Email is already registered")
        return value



    def validate_phone(self, value):
        """
        Check if the phone number is already registered.
        """
        if Customer.objects.filter(phone=value).exists():
            raise serializers.ValidationError("User with this Phone number is already registered")
        return value
    

    def validate(self, data):
        if data.get('password') != data.get('confirm'):
            raise serializers.ValidationError("Password and Confirm Password do not match")
        return data


    def create(self, validated_data):
        password = validated_data.pop('password')
        validated_data.pop('confirm')  # Remove confirm password from validated data
        user = Customer(**validated_data) # since AbstractBaseUser passsword is not blank=False Customer object can be created without it 
        user.set_password(password)  # Hash the password
        user.save()
        return user

