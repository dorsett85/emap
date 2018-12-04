from django.db import connection
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User


def get_user(request):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    if request.user.is_active and request.user is not 'AnonymousUser':
        return JsonResponse({'id': request.user.id, 'name': request.user.username})
    else:
        return JsonResponse(None, safe=False)


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
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM auth_user WHERE username = %s', [username])
    user_exists = cursor.fetchall()

    if not user_exists:

        # Create, authenticate and login user
        User.objects.create_user(username=username, password=password)
        user = authenticate(username=username, password=password)
        login(request, user=user)
        return JsonResponse({'id': user.id, 'name': user.username})

    else:
        return JsonResponse({'invalid': 'Username already exists'})


def logout_user(request):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    logout(request)
    return JsonResponse(None, safe=False)


def get_games(request, user_id):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    cursor = connection.cursor()

    # Check which games to return based on user
    if user_id == 'null':
        # TODO restrict game access to non-registered users
        cursor.execute(
            '''
            SELECT id, name, title, description, num_answers, difficulty 
            FROM api_game
            '''
        )
    else:
        cursor.execute(
            '''
            SELECT ag.id, ag.name, ag.title, ag.description, ag.num_answers, ag.difficulty
            FROM api_game AS ag
            WHERE ag.id IN
              (
                SELECT aug.game_id
                FROM api_user_game AS aug
                  INNER JOIN auth_user au on aug.user_id = au.id
                WHERE au.id = '%s'
              );
            ''', [user_id]
        )

    rows = cursor.fetchall()
    if rows:
        keys = [col[0] for col in cursor.description]
        game_list = [{key: val for key, val in zip(keys, row)} for row in rows]
        return JsonResponse(game_list, safe=False)
    else:
        return JsonResponse('', safe=False)


def get_last_played(request, user_id):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    # If a user is logged in, get their last game
    if user_id != 'null':
        cursor = connection.cursor()
        cursor.execute(
            '''
            SELECT ag.id, ag.name, ag.title, ag.description, ag.num_answers, ag.difficulty
            FROM api_game as ag
            WHERE ag.id = 
              (
                SELECT aug.game_id 
                FROM api_user_game AS aug
                WHERE aug.user_id = %s and aug.last_played = true
              )
            ''', [user_id]
        )

        rows = cursor.fetchall()
        if rows:
            keys = [col[0] for col in cursor.description]
            vals = [val for val in rows[0]]
            place = dict(zip(keys, vals))
            return JsonResponse(place)
        else:
            return JsonResponse('', safe=False)

    else:
        return JsonResponse('', safe=False)


def set_last_played(request, user_id):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    # If a user is logged in, set their last game
    if user_id != 'null':
        cursor = connection.cursor()
        cursor.execute(
            '''
            UPDATE api_user_game SET last_played = false
            WHERE user_id = %(user_id)s;
            
            UPDATE api_user_game SET last_played = true
            WHERE user_id = %(user_id)s and game_id = %(game_id)s;
            ''', {'user_id': user_id, 'game_id': request.POST.get('gameId')}
        )

    return JsonResponse('', safe=False)


def get_place(request, name):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    # Query the database
    cursor = connection.cursor()
    cursor.execute(
        '''
        SELECT name, lat, lon, country, population 
        FROM api_city 
        WHERE lower(name) = %s
        ''', [name.lower()]
    )

    # Check if any matches are returned
    rows = cursor.fetchall()
    if rows:
        keys = [col[0] for col in cursor.description]
        vals = [val for val in rows[0]]
        place = dict(zip(keys, vals))
        return JsonResponse(place)
    else:
        return JsonResponse('', safe=False)
