from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(max_length=128)
    class Meta:
        model = User  # this returns None   || Use  get_user_model()   or  either do this  User = get_user_model()
        fields = ['username','email','password','confirm_password','phone', 'address']
        extra_kwargs = {
            'password': {'write_only': True},
            'confirm_password': {'write_only': True}
        }
    


    def validate(self,validated_data):
        password = validated_data.get('password')
        confirm_password = validated_data.get('confirm_password')
        if password and confirm_password and password != confirm_password:
            raise serializers.ValidationError("Password and Confirm Password do not match")
        return validated_data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user_instance = User.objects.create(**validated_data)

        user_instance.set_password(validated_data['password'])
        print(user_instance,'is the instance')
        user_instance.save()
        # if user_instance.user_type == 'admin':  # if it is customer then he will not be allowed 
        #     user_instance.is_staff = True
        #     user_instance.is_superuser = True
        # user_instance.save()   # this save() is from django ---not DRF
        return user_instance  # DRF's save needs the instance to be returned to be able to save it otherwise, |`create()` did not return an object instance.|




