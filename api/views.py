from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from .Classes.QueryHelper import QueryHelper


def get_user(request):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    if request.user.is_authenticated:
        response = {
            'id': request.user.id,
            'name': request.user.username
        }

        # Check user's last played game
        last_played = QueryHelper.get_last_played(request.user.id).fetchall_dict()

        if last_played.results:
            response['last_played'] = last_played.results
            return JsonResponse(response)
        else:
            return JsonResponse(response)

    # No user logged in
    else:
        return JsonResponse({})


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
    qh = QueryHelper('SELECT * FROM auth_user WHERE username = %s', [username]).fetchall()

    if qh.rows:
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
    return JsonResponse({})


def get_games(request):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    # Check which games to return based on user
    if not request.user.is_authenticated:
        games = QueryHelper.get_games().fetchall_array()
    else:
        games = QueryHelper.get_games(request.user.id).fetchall_array()

    return JsonResponse({'games': games.results})


def get_game_progress(request, game_id):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    if request.user.is_authenticated:
        game_progress = QueryHelper.get_game_progress({'user_id': request.user.id, 'game_id': game_id}).fetchall_array()

        if game_progress.results:
            return JsonResponse({'progress': game_progress.results})

    # At this point the user is not logged in or has no game progress
    return JsonResponse({'progress': []})


def set_last_played(request, game_id):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    # If a user is logged in, set their last game
    if request.user.is_authenticated:
        QueryHelper.set_last_played({'user_id': request.user.id, 'game_id': game_id})

    return JsonResponse({'game_id': game_id})


def game_guess(request, game_id):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    game_name = request.POST.get('gameName')
    user_guess = request.POST.get('guess')
    user_id = request.user.id

    # Instantiate object to return with guess results
    guess_result = {
        'results': None
    }

    # If a user is logged in, process their guess
    if request.user.is_authenticated:

        # Get answers for the selected game
        game_answers = QueryHelper.get_all_game_answers({
            'user_id': user_id,
            'game_id': game_id,
            'game_name': game_name
        }).fetchall_array()

        # Check if the guess is in the answers and if it's already been guessed
        if user_guess.lower() in [row['answer'] for row in game_answers.results]:
            for row in game_answers.results:
                if row['answer_id'] is None and row['answer'] == user_guess.lower():

                    # Add answer to the database if it hasn't been guessed
                    QueryHelper.add_user_game_answer({
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

    # Query the database
    qh = QueryHelper('''
        SELECT name, lat, lon, country, population 
        FROM api_city 
        WHERE lower(name) = %s
    ''', [user_guess.lower()]).fetchall_dict()

    if qh.results:
        guess_result.update({
            'results': qh.results
        })
        return JsonResponse(guess_result)
    else:
        guess_result.update({
            'msg': 'No matching search results',
        })
        return JsonResponse(guess_result)
