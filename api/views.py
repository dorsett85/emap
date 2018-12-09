from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from .Classes.QueryHelper import QueryHelper


def get_user(request):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    # Instantiate response object
    response = {
        'id': None,
        'name': None,
        'game': None
    }

    if request.user.is_authenticated:
        response['id'] = request.user.id
        response['name'] = request.user.username

        # Check user's last played game
        last_played = QueryHelper.get_last_played(request.user.id).fetchall_dict()

        if last_played.results:
            response['game'] = last_played.results
            return JsonResponse(response)
        else:
            return JsonResponse(response)

    # No user logged in
    else:
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
    return JsonResponse({'id': None, 'name': None}, safe=False)


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
    return JsonResponse({'progress': None})


def set_last_played(request):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    # If a user is logged in, set their last game
    if request.user.is_authenticated:
        QueryHelper.set_last_played({'user_id': request.user.id, 'game_id': request.POST.get('gameId')})

    return JsonResponse({'game_id': request.POST.get('gameId')})


def game_guess(request):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    request_dict = {
        'user_id': request.user.id,
        'game_id': request.POST.get('gameId'),
        'game_name': request.POST.get('gameName'),
        'guess': request.POST.get('guess').lower()
    }

    # Check which game the guess is for
    if request_dict['game_name'] == 'cityPopTop10':
        qh = QueryHelper('''
            SELECT lower(ac.name) AS name, auga.answer_id
            FROM api_city AS ac
                LEFT JOIN api_user_game_answer AS auga
                ON ac.id = auga.answer_id
            ORDER BY ac.population DESC
            LIMIT 10            
        ''', request_dict).fetchall_array()

    if request_dict['guess'] in [row['name'] for row in qh.results]:
        if next(row['answer_id'] for row in qh.results if row['name'] == request_dict['guess']) is None:
            qh = QueryHelper('''
                -- Add guess to the answers table
                INSERT INTO api_user_game_answer(user_id, answer_id, game_id)
                VALUES (
                    %(user_id)s, 
                    (
                        SELECT id
                        FROM api_city
                        WHERE lower(name) = %(guess)s
                    ), 
                    %(game_id)s
                )
            ''', request_dict)

    # Query the database
    qh = QueryHelper('''
        SELECT name, lat, lon, country, population 
        FROM api_city 
        WHERE lower(name) = %s
    ''', [request_dict['guess'].lower()]).fetchall_dict()

    if qh.results:
        return JsonResponse(qh.results)
    else:
        return JsonResponse('', safe=False)
