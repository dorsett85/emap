from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListPlace.as_view()),
    path('<int:pk>', views.DetailPlace.as_view())
]