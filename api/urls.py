from django.urls import path

from . import views

urlpatterns = [
    path('', views.all_places),
    path('get_user/', views.get_user),
    path('register/', views.register_user),
    path('login/', views.login_user),
    path('logout/', views.logout_user)
]
