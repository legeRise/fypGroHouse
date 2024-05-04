from django.urls import path
from . import views


urlpatterns = [
    path('signup/',views.signup),
    path('login/',views.login),
    path('total_customers/', views.total_customers,name='total_customers'),
    path('get_profile/<str:customer_id>/',views.get_profile,name='get_profile'),
    path('edit_profile/<str:customer_id>/',views.edit_profile,name='edit_profile'),
    path('dashboard/',views.dashboard_details,name='dashboard_details'),

]
