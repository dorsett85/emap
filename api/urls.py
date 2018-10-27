from django.urls import path

from . import views

urlpatterns = [
    path('', views.all_places),
    path('check_user/', views.check_user),
    path('login/', views.login_user),
    path('logout/', views.logout_user)
]