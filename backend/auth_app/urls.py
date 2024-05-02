from django.urls import path
from . import views


urlpatterns = [
 
    path('register/',views.register_user,name='register_user'),
    path('login/', views.login_user,name='login_user'),
    path('logout/', views.logout_user,name='logout_user'),
    path('total_users/', views.list_users,name='list_users'),


    # not yet
    path('secret_token/', views.get_secret_token,name='secret_token'),
    # path('login_status/', views.is_logged_in,name='login_status'),
]
