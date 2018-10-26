from django.urls import path

from . import views

urlpatterns = [
    path('', views.all_places),
    path('login/', views.login_user)
]