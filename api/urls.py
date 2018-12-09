from django.urls import path

from . import views

urlpatterns = [
    path('get_user/', views.get_user),
    path('register/', views.register_user),
    path('login/', views.login_user),
    path('logout/', views.logout_user),

    # Games api
    path('games/', views.get_games),
    path('games/<int:game_id>/progress', views.get_game_progress),
    path('games/set_last_played', views.set_last_played),
    path('games/guess', views.game_guess)
]
