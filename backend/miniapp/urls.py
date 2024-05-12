from django.urls import path
from . import views
from .views import AdminLoginView,CustomerLoginView
from rest_framework_simplejwt.views import TokenRefreshView



urlpatterns = [
    path('signup/',views.signup),
    path('login/', CustomerLoginView.as_view(), name='customer_login'),
    path('admin_login/',AdminLoginView.as_view(), name='admin_login'),

    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('admin_login/',views.admin_login),
    path('total_customers/', views.total_customers,name='total_customers'),
    path('get_profile/',views.get_profile,name='get_profile'),
    path('edit_profile/',views.edit_profile,name='edit_profile'),
    path('dashboard/',views.dashboard_details,name='dashboard_details'),

]
