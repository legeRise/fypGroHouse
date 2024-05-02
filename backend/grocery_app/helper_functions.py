import pickle
import os
import pandas as pd
from sklearn.model_selection import train_test_split
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_squared_error
from django.conf import settings


# function to train ML model
def preprocess_and_train(dataset, on_full_data=False):
    try:
        data = pd.read_csv(dataset)
        train_data = data
        if not on_full_data:
            # Convert date column to datetime objects
            data['date'] = pd.to_datetime(data['date'], format='%Y-%m-%d')
            data.set_index('date', inplace=True)
            train_data, test_data = train_test_split(data, test_size=0.2, shuffle=False)
            print('Training Data: ',train_data.shape)
            print('Testing Data: ',test_data.shape)
        print('Shape of Data to be trained: ',train_data.shape)
        model = ARIMA(train_data['sales'], order=(5, 1, 1), exog=train_data[['price']])  # Example: ARIMA(1,1,1)
        my_model = model.fit()

        if not on_full_data:
            forecast = my_model.forecast(steps=len(test_data['sales']), exog=test_data[['price']])
            mse = mean_squared_error(test_data['sales'], forecast)

            return {"my_model": my_model, "mse": mse}

        else:
            return {"final_model": my_model}

    except Exception as e:
        print("An error occurred:", e)
        return None


# function to save ML model
def save_model(save_path,model_filename,model):
    file_path = os.path.join(save_path, f"{model_filename}_predictor.pkl")
    
    # Save the model to the specified location
    with open(file_path, 'wb') as file:
        pickle.dump(model, file)
    print("Model saved successfully at", file_path)
    return file_path




# function to load ML model
def load_model(**model_file_path):
    name= model_file_path['name']
    path= model_file_path['path']

    model_file = {}
    with open(path, 'rb') as f:
            model = pickle.load(f)
            model_file[name] = model 
    return model_file


# function to separate per product dataset
def split_dataset_by_product(dataset):
    data =  pd.read_csv(dataset)
    product_list = list(data['product_name'].unique())

    folder_path = os.path.join(settings.MEDIA_ROOT, 'datasets')
    os.makedirs(folder_path, exist_ok=True)
    
    data_location = {}
    for product in product_list:
        product_data = data[data['product_name'] == product]
        file_path = os.path.join(folder_path, f"{product}_data.csv")
        product_data.to_csv(file_path, index=False) 
        data_location[product] = file_path
    return data_location


