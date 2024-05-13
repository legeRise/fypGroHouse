from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAdminUser,AllowAny
from rest_framework import status
from .models import Customer,Confirmation_Code
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
from grocery_app.models import Order
from miniapp.serializers import CustomerSerializer
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
import re
from rest_framework_simplejwt.views import TokenObtainPairView
# for sales calculation
from django.utils import timezone
from datetime import timedelta



@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    serializer = CustomerSerializer(data=request.data)
    if serializer.is_valid():
        print("done")
        serializer.save()
        return Response({'message': 'Registration Successful'}, status=status.HTTP_201_CREATED)
    print('the erros are',serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





class AdminLoginView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate customer user
        user = authenticate(username=username, password=password)
        if user is not None and  user.is_superuser:
            response = super().post(request, *args, **kwargs)   # get access and refresh tokens if user credentials are correct
            return Response(response.data, status=status.HTTP_200_OK)
        else:
            # Invalid credentials or not a customer
            return Response({'error': 'Invalid Admin credentials'}, status=status.HTTP_401_UNAUTHORIZED)




class CustomerLoginView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate customer user
        user = authenticate(username=username, password=password)
        if user is not None and  not user.is_superuser and user.is_active:
            response = super().post(request, *args, **kwargs)   # get access and refresh tokens if user credentials are correct
            return Response(response.data, status=status.HTTP_200_OK)
        else:
            # Invalid credentials or not a customer
            return Response({'error': 'Invalid customer credentials'}, status=status.HTTP_401_UNAUTHORIZED)



class ConfirmEmailView(APIView):
    def post(self, request, format=None):
        email = request.data.get('email')
        code = request.data.get('code')

        try:
            confirmation = Confirmation_Code.objects.get(customer__email=email, code=code)
            confirmation.customer.is_active = True
            confirmation.customer.save()
            confirmation.delete()
            return Response({'message': 'Email confirmed successfully.'}, status=status.HTTP_200_OK)
        except Confirmation_Code.DoesNotExist:
            return Response({'message': 'Invalid confirmation code.'}, status=status.HTTP_400_BAD_REQUEST)



@csrf_exempt
@api_view(['GET'])
def get_profile(request):
    customer_id = request.user.id
    print(request.user.id,'line no 75')
    
    # Use customer_id instead of id to retrieve the Customer object
    user_profile = Customer.objects.get(id=customer_id)
    total_orders  =  len(user_profile.order_set.all())
    total_spent = sum([order.total for order in user_profile.order_set.all()])
    print("total orders  were",total_orders)
    print("total spent till now: ",total_spent)
    context = {"username": user_profile.username, "email": user_profile.email, "phone" : user_profile.phone, "address":user_profile.address,"total_orders":total_orders,"total_spent":total_spent}
    return Response(context)

    

@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAdminUser])
def total_customers(request):
    return Response({"total_customers" :get_total_customers()},status=status.HTTP_200_OK)


@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAdminUser])
def dashboard_details(request):
    total_customers = get_total_customers()
    total_orders = len(Order.objects.all())
    approved_orders = len(Order.objects.filter(approved=True))
    for i in Order.objects.all():
        print(i.approved)
    total_sales = sum([order.total for order in Order.objects.all() if order.approved])
    print(total_sales,'are the total sales')


    today = timezone.now().date()

    # Calculate past 7 days sales
    weekly_sales = {}
    for i in range(6, -1, -1):  # Iterate over the last 7 days
        date = today - timedelta(days=i)
        weekly_sales[date.strftime('%d/%m')] = sum([order.total for order in Order.objects.filter(order_date__date=date) if order.approved])

    # Calculate past month sales
    monthly_sales = {}
    # Get the start and end dates for the past month
    start_of_month = today.replace(day=1)
    end_of_month = start_of_month.replace(day=1, month=start_of_month.month % 12 + 1) - timedelta(days=1)
    for i in range((end_of_month - start_of_month).days + 1):  # Iterate over each day in the past month
        date = start_of_month + timedelta(days=i)
        monthly_sales[date.strftime('%d')] = sum([order.total for order in Order.objects.filter(order_date__date=date) if order.approved])

    # Calculate today's sales
    daily_sales = sum([order.total for order in Order.objects.filter(order_date__date=today) if order.approved])

    print("Daily Sales:", daily_sales)
    print("Weekly Sales:", weekly_sales)
    print("Monthly Sales:", monthly_sales)
    print("length", len(monthly_sales))
    

    weeks_in_month = {}
    # Initialize variables for tracking week and weekly total
    current_week = 1
    weekly_total = 0
    week_counter = 1

    # Iterate through the monthly sales data
    for key, value in monthly_sales.items():
        # Add the value to the weekly total
        weekly_total += value
        # Increment the week counter
        week_counter += 1
        # Check if the current key is a multiple of 7 or the last key
        if week_counter % 7 == 0 or key == len(monthly_sales):
            # Assign the weekly total to the corresponding week
            weeks_in_month[f"Week {current_week}"] = weekly_total
            # Reset the weekly total for the next week
            weekly_total = 0
            # Increment the week counter
            current_week += 1

    print(weeks_in_month)


    monthly_sales = weeks_in_month




    time_sales =  { "daily_sales" : daily_sales,"weekly_sales": weekly_sales,"monthly_sales" : monthly_sales}

    return Response({"total_customers" :total_customers, "total_orders":total_orders,"total_sales":total_sales,"approved_orders":approved_orders,"time_sales":time_sales},status=status.HTTP_200_OK)



@csrf_exempt
@api_view(['POST'])
def edit_profile(request):
    try:
        customer_id = request.user.id
        customer = Customer.objects.get(id=customer_id)

        if request.method == 'POST':
            data = request.data
            username = data.get('username')
            phone = data.get('phone')  # Fixed the field name
            email = data.get('email')
            address = data.get('address')
            print(username, username, 'from updated')  # Fixed the print statement

            customer.username = username
            customer.phone = phone
            customer.email = email
            customer.address = address
            customer.save()

        # Return success response
        return Response({'message': 'profile updated Successfully'},status=status.HTTP_200_OK)  # Fixed the variable name
    except Customer.DoesNotExist:
        # Handle the case where the user does not exist
        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        # Handle other exceptions
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

#_____________end____________




#_________________________________________________________useful_functions_____________________________________________________--

def get_total_customers():
    return len(Customer.objects.filter(is_superuser=False))

