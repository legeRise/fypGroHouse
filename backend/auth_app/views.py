from django.middleware.csrf import get_token
from .serializers import UserSerializer
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
# from django.contrib.auth.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view
from .models import User


@api_view()
def list_users(request):
    registered_users = list(User.objects.filter(is_superuser=False))
    context = {'Customers': [user.username for user in registered_users], 'Total': len(registered_users)}
    return Response(context, status=status.HTTP_200_OK)


@api_view(['POST'])
def register_user(request):
    print(request.data)
    serialized_data = UserSerializer(data=request.data)
    if serialized_data.is_valid():
        serialized_data.save()  # this save() is from DRF
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    return Response(serialized_data.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def login_user(request):
    print(request.data)
    email = request.data.get('email')
    password = request.data.get('password')
    print(email,password,type(password))
    user = authenticate(email=email, password=password)
    info = { "name" : user.username, "phone" : user.phone, "email" : user.email, "address" : user.address }
    if user:
        username= user.username
        login(request, user)
        return Response({"username":username,'message': 'Login successful','is_authenticated' : True, "info" : info}, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid credentials','is_authenticated' : False}, status=status.HTTP_401_UNAUTHORIZED)
 
@api_view()
def logout_user(request):
    logout(request)
    return Response({"msg": "User was logged out","is_authenticated":False })


def get_secret_token(request):
    token = get_token(request)
    print('the token at 46 is : ',token)
    print('length of token',len(token))
    return JsonResponse({"token": token})



# def is_logged_in(request):
#     print(request.user.is_authenticated)
#     print(request.user.username)
#     username=request.user.username
#     if request.user.is_authenticated:
#         return JsonResponse({"user":username,"is_authenticated":True})
#     else:
#         return JsonResponse({'is_authenticated':False})
