
from grocery_app.models import Dataset,Product,Prediction_Model
from django.conf import settings
from grocery_app.helper_functions import split_dataset_by_product,preprocess_and_train,save_model,download_dataset
import os


def reset_daily_stock_sold():
    all_products = Product.objects.all()
    for product in all_products:
        product.daily_stock_sold =0
        product.save()
    print("\n\n-------daily Stock Sold was reset-------\n\n")

def reset_weekly_stock_sold():
    all_products = Product.objects.all()
    for product in all_products:
        product.weekly_stock_sold =0
        product.save()
    print("\n\n-------weekly Stock Sold was reset-------\n\n")
def reset_monthly_stock_sold():
    all_products = Product.objects.all()
    for product in all_products:
        product.monthly_stock_sold =0
        product.save()
    print("\n\n-------monthly Stock Sold was reset-------\n\n")



def add_new_data():
    all_products = Product.objects.all()
    for product in all_products:

        print('Total Products',len(all_products))
        new_data =Dataset(product=product,price=product.price,sales=product.daily_stock_sold) 
        # new_data =Dataset(product=product,price=product.price,sales=product.stock_sold) 
        new_data.save()


def periodic_model_trainer():
    download_dataset()
    dataset = os.path.join(settings.MEDIA_ROOT,'dataset.csv')
    print('dataset 20 jobs.py')
    csv_file_paths = split_dataset_by_product(dataset)
    for product_name,csv_file in csv_file_paths.items():
        print(product_name,csv_file)
        a= preprocess_and_train(csv_file)
        print('Error Rate: ',a['mse'])
        a =preprocess_and_train(csv_file,on_full_data=True)
        saved_path = save_model(f'{settings.MEDIA_ROOT}/models/',f"{product_name}_sales",a['final_model'])
        prediction_model = Prediction_Model.objects.get(name = f"{product_name}_model")
        prediction_model.model_path = saved_path
        prediction_model.save()


    


    