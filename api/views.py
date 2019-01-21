from django.conf import settings
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from json import load as jload

import os

from .Classes.QueryHelper import QueryHelper as QH


def get_map_token(request):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')
    return JsonResponse({'map_token': settings.MAPBOX_TOKEN})


def get_user(request):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    response = {
        'set': True
    }

    if request.user.is_authenticated:
        response.update({
            'id': request.user.id,
            'name': request.user.username
        })

        # Check user's last played game
        last_played = QH.get_last_played(request.user.id).fetchall_dict()

        if last_played:
            response.update({
                'last_played': last_played
            })

    return JsonResponse(response)


def login_user(request):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    user = authenticate(username=request.POST.get('username'), password=request.POST.get('password'))
    if user is not None:
        login(request=request, user=user)
        return JsonResponse({'id': user.id, 'name': user.username})
    else:
        return JsonResponse({'invalid': 'Invalid username or password'})


def register_user(request):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    # Check if user exists
    username = request.POST.get('username')
    password = request.POST.get('password')
    qh = QH('SELECT * FROM auth_user WHERE username = %s', [username]).fetchall()

    if qh:
        return JsonResponse({'invalid': 'Username already exists'})

    # Create, authenticate and login user
    User.objects.create_user(username=username, password=password)
    user = authenticate(username=username, password=password)
    login(request, user=user)
    return JsonResponse({'id': user.id, 'name': user.username})


def logout_user(request):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    logout(request)
    return JsonResponse({'set': True})


def get_games(request):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    games = QH.get_games(request.user.id).fetchall_array()

    return JsonResponse({'games': games})


def get_game_progress(request, game_id):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    game_name = QH.get_game_name(game_id)

    game_progress = QH.get_game_progress({
        'user_id': request.user.id,
        'game_id': game_id,
        'game_name': game_name
    }).fetchall_array()

    if not game_progress:
        return JsonResponse({'progress': []})

    # Check the game type to see if we need to add additional data to the response
    if game_name == 'countryAreaTop10':
        for item in game_progress:
            path = f"{os.path.dirname(__file__)}/data/countries/{item['name']}.geojson"
            with open(path) as f:
                item.update({
                    'geojson': jload(f)
                })

    return JsonResponse({'progress': game_progress if game_progress else []})


def set_last_played(request, game_id):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    QH.set_last_played({'user_id': request.user.id, 'game_id': game_id})

    return JsonResponse({'game_id': game_id})


def game_guess(request, game_id):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    game_name = QH.get_game_name(game_id)
    user_guess = request.POST.get('guess').lower()
    user_id = request.user.id

    # Instantiate object to return with guess results
    guess_result = {
        'data': {}
    }

    # Check if there is any result in the database
    qh = QH.get_game_guess({
        'game_name': game_name,
        'user_guess': user_guess
    }).fetchall_dict()

    if not qh:
        guess_result.update({
            'msg': f'{user_guess} not found or not in the top 100',
        })
        return JsonResponse(guess_result)

    # There is now data for the guess, process it and send back an appropriate message
    guess_result.update({
        'data': qh
    })

    # Get answers for the selected game to see if a guess matches
    game_answers = QH.get_game_answers({
        'user_id': user_id,
        'game_id': game_id,
        'game_name': game_name
    }).fetchall_array()

    # Check if the guess is in the answers and if it's already been guessed
    if user_guess in [row['answer'] for row in game_answers]:
        for row in game_answers:
            if row['answer_id'] is None and row['answer'] == user_guess:
                # Add answer to the database if it hasn't been guessed
                QH.add_user_game_answer({
                    'user_id': user_id,
                    'answer_id': row['id'],
                    'game_id': game_id
                })
                guess_result.update({
                    'msg': 'Nice guess',
                    'new': True
                })
                break
        else:
            guess_result.update({
                'msg': f"You've already guessed {user_guess}",
            })
    else:
        guess_result.update({
            'msg': f"{user_guess} is not in the top 10",
        })

    # Check the game type to see if we need to add additional data to the response
    if game_name == 'countryAreaTop10':
        country_name = guess_result['data']['name']
        path = f"{os.path.dirname(__file__)}/data/countries/{country_name}.geojson"
        with open(path) as f:
            guess_result['data'].update({
                'geojson': jload(f)
            })

    return JsonResponse(guess_result)
