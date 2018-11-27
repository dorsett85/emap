from django.urls import path

from . import views

urlpatterns = [
    path('get_user/', views.get_user),
    path('register/', views.register_user),
    path('login/', views.login_user),
    path('logout/', views.logout_user),

    # Games api
    path('games/<user>', views.get_games),

    # Place api
    path('place/<name>', views.get_place)
]
