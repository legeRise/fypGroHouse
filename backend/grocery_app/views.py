from django.shortcuts import get_object_or_404
from django.db.models import Count
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser,AllowAny
from rest_framework import status
from .useful_functions import remove_duplicates
from django.conf import settings
from .models import Product,Prediction_Model,Dataset,Category,Order,OrderProduct,Customer,Product,Interaction,Favourite
from .useful_functions import save_profile_pic
from .helper_functions import load_model
from .serializers import ProductSerializer,CategorySerializer,OrderSerializer,InteractionSerializer,FavouriteSerializer
import numpy as np
import os
import uuid
import csv

#_________________________________________Order Apis________________________________________________________
@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAdminUser])
def single_order_detail(request, order_id):
    single_order = Order.objects.get(id=order_id)
    product_list_in_order = single_order.orderproduct_set.all()

    order_summary = []

    if not product_list_in_order:
        single_order.delete()
        return Response({"message" : "Order Does Not Exist"}, status=status.HTTP_404_NOT_FOUND)
    

    for single_product in product_list_in_order:
        product_id = single_product.product.id
        product_name = single_product.product.name
        quantity = single_product.quantity
        price = single_product.product.price
        product_image = single_product.product.image
        total = quantity * price

        # Corrected customer info access
        customer_name = single_order.customer.username
        customer_phone = single_order.customer.phone
        customer_email = single_order.customer.email
        customer_address = single_order.customer.address
        customer_payment_method = single_order.payment_method

        # Create customer_info dictionary
        customer_info = {
            'customer_name': customer_name,
            'customer_phone': customer_phone,
            'customer_email': customer_email,
            'customer_address': customer_address,
            'customer_payment_method': customer_payment_method
        }

        product_summary = {
            "product_id": product_id,
            "product_name": product_name,
            "quantity": quantity,
            "price": price,
            "image": product_image,
            "total": total,
            "customer_info": customer_info  # Add customer_info to product_summary
        }
        order_summary.append(product_summary)

    return Response(order_summary,status=status.HTTP_200_OK)



@api_view(['POST'])
def store_order(request):

    customer_id = request.user.id    
    # Retrieve the customer object
    customer = get_object_or_404(Customer, pk=customer_id)
    
    # Extract order data from the request
    order_data = request.data.get('order_data')
    
    # Create a new order for the customer
    order = Order.objects.create(customer=customer)
    for item_data in order_data:
        product_id = item_data.get('id')
        quantity = item_data.get('quantity')
        
        # Retrieve the product object
        product = get_object_or_404(Product, pk=product_id)
        
        # Create an OrderProduct object for the product in the order
        OrderProduct.objects.create(order=order, product=product, quantity=quantity)

    # Return a JSON response indicating success
    return Response({'message': 'Order placed successfully!',"order_id":order.id}, status=status.HTTP_201_CREATED)
    


@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAdminUser])
def list_orders(request):
    orders = Order.objects.all() 
    serializer = OrderSerializer(orders, many=True)
    for i in serializer.data:
        
        # print(Customer.objects.get(id=i["customer"]))
        i["customer_name"]= Customer.objects.get(id=i["customer"]).username
    print(serializer.data)
    return Response(serializer.data,status=status.HTTP_200_OK)



@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAdminUser])
def approve_order(request):
    order_id = request.data.get("order_id")
    total_amount = request.data.get("total_amount")

    order = Order.objects.get(id=order_id)

    if order.approved:
        return Response({"order_id": order_id, "message": "Order already approved"},status=status.HTTP_409_CONFLICT)


    for order_product in order.orderproduct_set.all():
        product = order_product.product
        quantity_to_be_sold = order_product.quantity

        # Check if the available stock is sufficient for the order 
        if product.current_stock < quantity_to_be_sold:
            # If stock is insufficient, return a response with approved=False and an appropriate message
            return Response({"order_id": order_id, "message": "Available Stock is not Sufficient", "approved": False},status=status.HTTP_400_BAD_REQUEST)
        else:
            # Update stock_sold and current_stock for the product
            product.stock_sold += quantity_to_be_sold
            product.daily_stock_sold += quantity_to_be_sold
            product.weekly_stock_sold += quantity_to_be_sold
            product.monthly_stock_sold += quantity_to_be_sold
            product.current_stock -= quantity_to_be_sold
            product.save()
            order.approved = True
            
        print("total in database ", order.total, "total after approval", total_amount)
        order.total = total_amount
        order.save()

    return Response({"order_id": order_id, "message": "Order approved", "approved": True},status=status.HTTP_200_OK)




@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAdminUser])
def delete_order(request):
    order_id = request.data.get("order_id")

    try:
        # Attempt to retrieve the product
        order = Order.objects.get(id=order_id)
    except Order.DoesNotExist:
        # If the product does not exist, return 404 Not Found
        return Response({'message': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if order.approved:
        return Response({'message': 'Approved Order Cannot be Deleted'}, status=status.HTTP_400_BAD_REQUEST)

    order.delete()
    return Response({'message': 'Order deleted successfully'}, status=status.HTTP_200_OK)
    

#_________________________________________ML Apis________________________________________________________

@csrf_exempt
@permission_classes([IsAdminUser])
def list_models(request):
    models = Prediction_Model.objects.all()

    models =  [ {"model_id":model.id,"product_name": model.product.name, "model_name" : model.name,"available" : bool(model.model_path) } for model in models]
    return Response({'available_models': models},status=status.HTTP_200_OK)



#_________________________________________Product Apis________________________________________________________
# view all products api
@csrf_exempt
@api_view(['GET'])
def list_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    for product in serializer.data:
        cat_id =product["category"]
        category =Category.objects.get(id=cat_id)
        product["category"] = category.name
    return Response(serializer.data,status=status.HTTP_200_OK)


# view all products in a category
@csrf_exempt
@api_view(['GET'])
def list_products_by_category(request,cat_id):
    print(cat_id)
    products = Product.objects.filter(category=cat_id)
    print(products,74)
    serializer = ProductSerializer(products, many=True)
    for product in serializer.data:
        cat_id =product["category"]
        category =Category.objects.get(id=cat_id)
        product["category"] = category.name
    return Response(serializer.data)



# view single product api
@api_view(['GET'])
def single_product(request,product_id):
    product = Product.objects.get(pk=product_id)
    context =  ProductSerializer(product).data
    context["category"] = product.category.name
    return Response(context)


# add a new product api
@api_view(['POST'])
@permission_classes([IsAdminUser])
def add_product(request):
    if request.method == 'POST':
        if 'image' not in request.data:
            return Response({'error': 'Image file is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        image_file = request.data['image']
        unique_filename = str(uuid.uuid4()) + os.path.splitext(image_file.name)[-1]
        print(unique_filename)
        image_url = save_profile_pic(image_file,f"profile_pics/{unique_filename}")
        print(image_url,'--------------is the url----------------------')
        # Add the image URL to the request data
        request.data['image'] = image_url

        #  since the backend category is in id form (1 or 2 or 3) but from frontend we get the strings like ("fruits","veges")
        category = request.data["category"]
        if category == str(category):
            category = Category.objects.get(name=category)
            request.data["category"] = category.id
        
        # Pass the modified request data to the serializer
        serializer = ProductSerializer(data=request.data)
        print(serializer,'is the serializer')
        # Validate and save the serializer
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # If validation fails, return errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAdminUser])
def update_product(request, product_id):
    print(request.data)
    print("yeah i was here")
    product = Product.objects.get(pk=product_id)
    print(product)

    
    # Check if 'image' is present in the request data
    if 'image' in request.data:
        image_file = request.data['image']
        unique_filename = str(uuid.uuid4()) + os.path.splitext(image_file.name)[-1]
        image_url = save_profile_pic(image_file, f"profile_pics/{unique_filename}")
        # Update the image URL in the request data
        request.data['image'] = image_url

    print("at 129")

    # Check if 'category' is present in the request data
    if 'category' in request.data:
        print('inside 133')
        category = request.data["category"]
        print(category,'is the 283')
        # Convert category string to category id
        if category.isalpha() or " " in category:
            print("inside 137",category)
            category = Category.objects.get(name=category)
            request.data["category"] = category.id
        else:
            pass
    
    # Pass the modified request data to the serializer along with instance of the product to be updated
    request.data['id'] = product_id
    serializer = ProductSerializer(product, data=request.data)
    print(serializer.initial_data)
    # Validate and save the serializer
    if serializer.is_valid():
        print("yes")
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        print(serializer.errors)

    
    # If validation fails, return errors
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# delete a product api
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_product(request, product_id):
    try:
        product = Product.objects.get(pk=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    product.delete()
    return Response({'message': 'Product deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)


#____________________________________favourite feature _____________________________________________________
# add to favourites
@api_view(['POST'])
def add_to_favourites(request):

    product_id = request.data.get('product')
    customer_id = request.user.id
    request.data["customer"] = customer_id

    try:
        customer = Customer.objects.get(id =customer_id)
        product = Product.objects.get(id=product_id)


        # Check if the product is already in the user's favourites
        if Favourite.objects.filter(customer=customer, product=product).exists():
            return Response({"message": "Product already in favourites"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = FavouriteSerializer(data= request.data)  # mention data= is important ---just (request.data) will get you error
        print(serializer,'this is the serializer while addign the product to favourites')
        print(serializer.initial_data)
        if serializer.is_valid():
            print("\n\n\n yes it is valid \n\n\n")
            serializer.save()
            return Response({"message": "Product added to favourites"}, status=status.HTTP_201_CREATED)

    except Product.DoesNotExist:
        return Response({"message": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    



@api_view(['DELETE'])
def remove_from_favourites(request, product_id):
    try:
        # Extract customer ID from the request user
        customer_id = request.user.id

        # Check if the product exists in the user's favourites
        favourite = Favourite.objects.get(customer=customer_id, product=product_id)
        favourite.delete()

        return Response({"message": "Product removed from favourites"}, status=status.HTTP_200_OK)

    except Product.DoesNotExist:
        return Response({"message": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

    except Favourite.DoesNotExist:
        return Response({"message": "Product is not in favourites"}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
   

@api_view(['GET'])
def get_user_favourites(request):
    try:
        customer = request.user
        favourites = customer.favourite_set.all()
        favourites_data = []
        for favourite in favourites:
            product = Product.objects.get(id=favourite.product.id)
            product_data = ProductSerializer(product).data
            favourites_data.append(product_data)

        print(favourites_data, 'are all the favourites of the user', request.user.username)
        
        return Response(favourites_data, status=status.HTTP_200_OK)
    
    except Customer.DoesNotExist:
        return Response({"message": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)
    
    except Product.DoesNotExist:
        return Response({"message": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#____________________________________ Category Apis_____________________________________________________


# view all categories api
@csrf_exempt
@api_view(['GET'])
def list_categories(request):
    cats = Category.objects.all()
    serializer = CategorySerializer(cats, many=True)
    return Response(serializer.data)


# view single Category api
@api_view(['GET'])
def single_category(request,pk):
    cat = Category.objects.get(pk=pk)
    context =  CategorySerializer(cat).data
    return Response(context)


# add a new Category api
@api_view(['POST'])
@permission_classes([IsAdminUser])
def add_category(request):
    if request.method == 'POST':
        if 'image' not in request.data:
            return Response({'error': 'Image file is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        image_file = request.data['image']
        unique_filename = str(uuid.uuid4()) + os.path.splitext(image_file.name)[-1]
        print(unique_filename)
        image_url = save_profile_pic(image_file,f"category_pics/{unique_filename}")
        print(image_url,'--------------is the url----------------------')
        # Add the image URL to the request data
        request.data['image'] = image_url
        
        # Pass the modified request data to the serializer
        serializer = CategorySerializer(data=request.data)
        
        # Validate and save the serializer
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # If validation fails, return errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# update an existing Category api
@api_view(['POST'])
@permission_classes([IsAdminUser])
def update_category(request, pk):
    try:
        cat = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return Response({'error': 'Category not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    if 'image' in request.data:
        image_file = request.data['image']
        unique_filename = str(uuid.uuid4()) + os.path.splitext(image_file.name)[-1]
        image_url = save_profile_pic(image_file, f"category_pics/{unique_filename}")
        request.data['image'] = image_url
    
    serializer = CategorySerializer(cat, data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# delete a category api
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_category(request, pk):
    try:
        cat = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return Response({'error': 'Category not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    cat.delete()
    return Response({'message': 'Category deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)



#______________________________________________Recommendation api_____________________________
@api_view(['GET'])
def user_recommendations(request):
    # Get the user based on user_id
    user_target = get_object_or_404(Customer, id=request.user.id)

    # Get all interactions of the given user
    user_interactions = Interaction.objects.filter(customer=user_target, purchased=True)

    # Get other users who have purchased the same products
    similar_users_interactions = Interaction.objects.filter(
        product__in=user_interactions.values_list('product', flat=True),
        purchased=True
    ).exclude(customer=user_target)

    # Count occurrences of interactions by customer
    similar_users_counts = similar_users_interactions.values('customer').annotate(count=Count('id'))

    # Sort similar users by the number of common purchases
    similar_users_counts = similar_users_counts.order_by('-count')

    # Extract user ids from similar users
    similar_user_ids = [item['customer'] for item in similar_users_counts]

    # Get the top 5 similar users
    top_similar_users = similar_user_ids[:5]
    

    # Generate recommendations based on top similar users
    recommendations = []
    for similar_user_id in top_similar_users:
        similar_user = Customer.objects.get(id=similar_user_id)
        similar_user_interactions = Interaction.objects.filter(customer=similar_user, purchased=True)

        for interaction in similar_user_interactions:
            # Check if the product is not purchased by the target user
            if not Interaction.objects.filter(customer=user_target, product=interaction.product, purchased=True).exists():
                productData =ProductSerializer(interaction.product)
                product = productData.data
                product["category"] = Category.objects.get(pk=product["category"]).name
                print("this is the productData product",product)
                recommendations.append(product)
        recommendations = remove_duplicates(recommendations,'id')

    return Response({'recommended_products': recommendations})

    



@api_view(['GET'])
def best_sellings(request):
    # Retrieve top 5 best-selling products with positive stock_sold, ordered by stock_sold in descending order
    top_products = Product.objects.filter(stock_sold__gt=0).order_by('-stock_sold')[:5]
    
    # Serialize the top products using the ProductSerializer
    serializer = ProductSerializer(top_products, many=True)
    print(serializer,'this is the best sellign doing this')
    

    # Extract serialized data from the serializer
    best_selling_products = serializer.data
    print(best_selling_products)
    for product in best_selling_products:
        product["category"] = Category.objects.get(pk=product["category"]).name
    print(best_selling_products) 
    print(best_selling_products,'is the new chagne')


    
    
    return Response({"best_selling_products": best_selling_products})




@api_view(['POST'])
def record_user_item_interactions(request):
    print('486  -------------- i am here to record transactions',type(request.user.id),request.user.id)
    customer =request.user.id
    for each_interaction in request.data:
        each_interaction["customer"] = customer
    print(request.data)
    serializer = InteractionSerializer(data=request.data, many=True)

    print(serializer)
    
    # Check if the request data is valid
    if not serializer.is_valid():
        print("yes it is not")
    #     return Response("errors",serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # # Save the valid data
    serializer.save()
    
    # Return a success response
    return Response({"msg": "Interaction Recorded"}, status=status.HTTP_201_CREATED)
    





#__________________________________Model apis_________________________________________________________


@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAdminUser])
def predict(request, model_name):
    print(model_name,'is the name')
    try:
        product_model =Prediction_Model.objects.get(name = f"{model_name}_model")
    except Exception as e:
        return Response({'error': f"The Product with the name '{model_name}' does not exist",'model_exists':False}, status=status.HTTP_404_NOT_FOUND)

    print(product_model,'testing')
    if not product_model.model_path:
        return Response({'error': f"Model for '{model_name}' is not trained yet",'model_exists':False}, status=status.HTTP_404_NOT_FOUND)
    else:
        model_file= load_model(name = model_name, path = product_model.model_path)
        print(model_file)

    
    price = request.data.get('price')
    period = request.data.get('time_period')
    time_period = {'daily': 1, 'weekly': 7, 'monthly': 30}

    model = model_file[model_name]
    exog = list(np.array([price]).reshape(1, -1)) * time_period[period]
    prediction = model.forecast(steps=time_period[period], exog=exog)
    return Response({'expected_sales': int(prediction.sum()),'model_exists':True},status=status.HTTP_200_OK)
    

