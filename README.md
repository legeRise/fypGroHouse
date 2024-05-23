# GroHouse Mobile Application

GroHouse is a comprehensive mobile application designed to facilitate grocery store operations for both sellers (store owners) and buyers (customers). Built with a React Native frontend and a Django backend, GroHouse offers a robust and user-friendly solution tailored for a single vendor scenario.

## Features

### Customer Panel

The customer side of the application provides a seamless shopping experience with the following features:

- **View Categories and Products**: Customers can browse all available categories and products.
- **Add to Cart and Place Orders**: Users can add items to their cart and proceed to place orders.
- **Favorites**: Customers can add items to their favorites for easy access.
- **Profile Management**: Users can update their profile information.
- **Recommendations**: Enjoy personalized product recommendations based on collaborative filtering.
- **Best Sellers**: View the best-selling items.
- **Recipe Search**: Search for recipes and add required items directly to the cart. Additionally, view recipes that utilize items already in the cart.

### Admin Panel

The admin side provides comprehensive management tools:

- **Dashboard**: Displays key metrics including total customers, total sales, total orders, approved orders, and best-selling products. Includes charts for daily, weekly, and monthly sales.
- **Category and Product Management**: Perform CRUD operations for products and categories.
- **Order Management**: View all orders and approve them, which updates the sales data on the dashboard.
- **Stock Monitoring**: Each product’s stock is monitored to prevent order approvals when stock is insufficient.
- **Per-Product Prediction Model**: Utilizes an ARIMA model to predict stock requirements based on sales data, prices, and time periods. Models are retrained weekly and monthly to provide accurate stock predictions.

## Authentication and Authorization

- **JWT Authentication**: Ensures secure access to the app’s features. Only authenticated users can access the app, and only authorized users (admins) can perform CRUD operations.
- **Permissions Setup**: Strictly controls access to different functionalities based on user roles.

## Contributors

- **Jawad Ahmad**: Frontend development using React Native.
- **Muhammad Habib ur Rehman**: Backend development using Django and Django Rest Framework (DRF).
