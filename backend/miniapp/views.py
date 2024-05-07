from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError
from .models import Customer
from grocery_app.models import Order
from django.shortcuts import get_object_or_404
from miniapp.serializers import CustomerSerializer
from django.views.decorators.csrf import csrf_exempt
import json
import re

@csrf_exempt
def signup(request):

    if request.method == 'POST':
        data = json.loads(request.body)
        print(data,'is the data ')

        username = data.get('username')
        password = data.get('password')
        confirm = data.get('confirm')
        email = data.get('email')
        phone = data.get('phone')
        address = data.get('address')


        # check if user already exists
        check_user = Customer.objects.filter(username=username)

        if check_user.exists():
            return HttpResponseBadRequest(json.dumps({'message': 'User Already Exists'}), content_type='application/json')

        elif len(username) < 5:
            return HttpResponseBadRequest(json.dumps({'message': 'Username must be at least 5 characters'}), content_type='application/json')

        elif not re.search(r'\d', username):
            return HttpResponseBadRequest(json.dumps({'message': 'Username must contain a number'}), content_type='application/json')

        elif password != confirm:
            return HttpResponseBadRequest(json.dumps({'message': 'Password and Confirm Password should be the same'}), content_type='application/json')

        elif len(password) < 5:
            return HttpResponseBadRequest(json.dumps({'message': 'Password should contain at least 5 characters'}), content_type='application/json')

        elif " " in username:
            return HttpResponseBadRequest(json.dumps({'message': 'username should not contain any space'}), content_type='application/json')

        elif " " in password:
            return HttpResponseBadRequest(json.dumps({'message': 'password should not contain any space'}), content_type='application/json')

        else:
            # If everything is fine, Sign Up the user
            user = Customer(username=username, password=password, confirm=confirm,email=email,phone=phone,address=address)
            user.save()
            return JsonResponse({'message': 'Registration Successful'})

    return JsonResponse({'message': 'Only POST Method is Allowed'})

#_____________end____________


@csrf_exempt
def login(request):

    if request.method == 'POST':
        data = json.loads(request.body)
    
        username = data.get('username')
        password = data.get('password') 

        # authenticate user before logging in 
        check_user = Customer.objects.filter(username=username, password=password)
    
        if check_user.exists():
            customer_id = [user.id for user in check_user]
            return JsonResponse({'message': 'Login Successful','customer_id':customer_id[0]})
        else:   
            return HttpResponseBadRequest(json.dumps({'message': 'Invalid Username or Password'}), content_type='application/json')

    return JsonResponse({'message': 'Only POST Method is Allowed'})


@csrf_exempt
def get_profile(request,customer_id):
    print(customer_id, 'is the id at line 84')
    
    # Use customer_id instead of id to retrieve the Customer object
    user_profile = Customer.objects.get(id=customer_id)
    total_orders  =  len(user_profile.order_set.all())
    total_spent = sum([order.total for order in user_profile.order_set.all()])
    print("total orders  were",total_orders)
    print("total spent till now: ",total_spent)
    context = {"username": user_profile.username, "email": user_profile.email, "phone" : user_profile.phone, "address":user_profile.address,"total_orders":total_orders,"total_spent":total_spent}
    return JsonResponse(context)

    

@csrf_exempt
def total_customers(request):
    total = len(Customer.objects.all())
    return JsonResponse({"total_customers" :total})


@csrf_exempt
def dashboard_details(request):
    total_customers = len(Customer.objects.all())
    total_orders = len(Order.objects.all())
    approved_orders = len(Order.objects.filter(approved=True))
    for i in Order.objects.all():
        print(i.approved)
    total_sales = sum([order.total for order in Order.objects.all() if order.approved])
    print(total_sales)
    

    # total_sales =  
    #total_sales = 234
    #total_Expenses = 234
    return JsonResponse({"total_customers" :total_customers, "total_orders":total_orders,"total_sales":total_sales,"approved_orders":approved_orders})

# pricce  --- time - --sales-  sales  ---prr




@csrf_exempt
@api_view(['POST'])
def edit_profile(request, customer_id):
    try:
        customer = Customer.objects.get(id=customer_id)

        if request.method == 'POST':
            data = json.loads(request.body)
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
        return JsonResponse({'user': 'updated', 'id': customer.id})  # Fixed the variable name
    except Customer.DoesNotExist:
        # Handle the case where the user does not exist
        return JsonResponse({'error': 'User not found'}, status=404)
    except Exception as e:
        # Handle other exceptions
        return JsonResponse({'error': str(e)}, status=400)

#_____________end____________