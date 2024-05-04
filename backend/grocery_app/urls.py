from django.urls import path
from . import views

urlpatterns = [

    path('export_to_csv/', views.download_dataset_as_csv, name='export_to_csv'),
    path('list_models/', views.list_models, name='all_models'),

    # product apis
    path('all_products/', views.list_products, name='all_products'),
    path('list_category_products/<str:cat_id>', views.list_products_by_category, name='all_category_products'),
    path('single_product/<str:product_id>', views.single_product, name='single_product'),
    path('add_product/', views.add_product, name='add_product'),
    path('update_product/<str:product_id>', views.update_product, name='update_product'),
    path('delete_product/<str:product_id>', views.delete_product, name='delete_product'),
    path('show_recommendations/<str:user_id>/',views.user_recommendations,name='show_recommendation'),


    #orders apis
    path('all_orders/', views.list_orders, name='all_orders'),
    path('store_order/', views.store_order, name='store_order'),
    path('single_order_detail/<str:order_id>', views.single_order_detail, name='single_order_detail'),



    # category apis
    path('all_categories/', views.list_categories, name='all_categories'),
    path('single_category/<str:pk>', views.single_category, name='single_category'),
    path('add_category/', views.add_category, name='add_category'),
    path('update_category/<str:pk>', views.update_category, name='update_category'),
    path('delete_category/<str:pk>', views.delete_category, name='delete_category'),







    path('update_dataset/', views.dataset_updater, name='dataset_updater'),
    
    # prediction
    path('model/<str:model_name>_model/', views.predict, name='predict'),
]
