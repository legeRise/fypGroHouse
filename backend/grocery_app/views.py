from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from .models import Product,Prediction_Model,Dataset,Category
from .useful_functions import save_profile_pic
from .helper_functions import load_model
from .serializers import ProductSerializer,CategorySerializer
import numpy as np
import json
import os
import uuid
import csv





def download_dataset_as_csv(request):
    # Get the dataset queryset
    queryset = Dataset.objects.all()
    dataset_list = list(queryset.values())

    if len(dataset_list) > 0:
        # Create a file path to save the CSV
        file_path = os.path.join(settings.MEDIA_ROOT,'dataset.csv')
        
        # Write data to CSV
        with open(file_path, 'w', newline='') as csv_file:
            writer = csv.DictWriter(csv_file, fieldnames=dataset_list[0].keys())
            writer.writeheader()
            for row in dataset_list:
                writer.writerow(row)

        # Construct the download URL
        download_url = os.path.join(settings.MEDIA_URL,'dataset.csv')
        print(download_url)


        # Return a response with a link to download the file
        return JsonResponse({ "download_link" : download_url})
    else:
        return JsonResponse({ "message" : "Sorry, the CSV file couldn't be generated as there are no data records available."})


@csrf_exempt
def list_models(request):
    models = Prediction_Model.objects.all()
    models =  [ {"product_name": model.product.name, "model_name" : model.name,"available" : bool(model.model_path) } for model in models]
    return JsonResponse({'available_models': models})


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
    return Response(serializer.data)


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
def update_product(request, product_id):
    print(request.data)
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
        # Convert category string to category id
        if category.isalpha():
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



# update an existing product api
# @api_view(["PUT"])
# def update_product(request, product_id):
#     print(request.data)
#     print(product_id,'i am inside')
#     try:
#         product = Product.objects.get(pk=product_id)
#         print(product,'is the prodduct')
#     except Product.DoesNotExist:
#         return Response({'error': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)
    
#     if 'image' in request.data:
#         image_file = request.data['image']
#         unique_filename = str(uuid.uuid4()) + os.path.splitext(image_file.name)[-1]
#         image_url = save_profile_pic(image_file, f"profile_pics/{unique_filename}")
#         request.data['image'] = image_url

        
    
#     serializer = ProductSerializer(product, data=request.data)
    
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
    
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# delete a product api
@api_view(['DELETE'])
def delete_product(request, product_id):
    try:
        product = Product.objects.get(pk=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    product.delete()
    return Response({'message': 'Product deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)




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
def delete_category(request, pk):
    try:
        cat = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return Response({'error': 'Category not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    cat.delete()
    return Response({'message': 'Category deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)

































#__________________________________Model apis_________________________________________________________

@csrf_exempt
def predict(request, model_name):
    model_name =model_name.lower()
    print(model_name,'is the name')
    try:
        product_model =Prediction_Model.objects.get(name = f"{model_name}_model")
    except Exception as e:
        return JsonResponse({'error': f"The Product with the name '{model_name}' does not exist",'model_exists':False}, status=404)

    print(product_model,'testing')
    if not product_model.model_path:
        return JsonResponse({'error': f"Model for '{model_name}' is not trained yet",'model_exists':False}, status=404)
    else:
        model_file= load_model(name = model_name, path = product_model.model_path)
        print(model_file)

    if request.method == 'POST':
        data = json.loads(request.body)
        
        price = data.get('price')
        period = data.get('time_period')
        time_period = {'daily': 1, 'weekly': 7, 'monthly': 30}

        model = model_file[model_name]
        exog = list(np.array([price]).reshape(1, -1)) * time_period[period]
        prediction = model.forecast(steps=time_period[period], exog=exog)
        return JsonResponse({'expected_sales': int(prediction.sum()),'model_exists':True})
    
    return JsonResponse({'message': 'Method Not Allowed'},safe=False)




@csrf_exempt
def dataset_updater(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        # for i in data:
        #     print(i)
            # data = Dataset(product=data['product_name'],price = data['product_price'],sales=int(data['proudct_price']/2))
        return JsonResponse({'message': 'Method  allowed'})
    return JsonResponse({'message': 'Method not allowed'})


