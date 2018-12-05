from django.urls import path

from . import views

urlpatterns = [
    path('get_user/', views.get_user),
    path('register/', views.register_user),
    path('login/', views.login_user),
    path('logout/', views.logout_user),

    # Games api
    path('games/<user_id>', views.get_games),
    path('games/<user_id>/get_last_played', views.get_last_played),
    path('games/<user_id>/set_last_played', views.set_last_played),
    path('games/<user_id>/guess', views.game_guess)
]
