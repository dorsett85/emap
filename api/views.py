from django.db import connection
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User


def get_user(request):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    if request.user.is_active and request.user is not 'AnonymousUser':
        return JsonResponse(request.user.username, safe=False)
    else:
        return JsonResponse(None, safe=False)


def login_user(request):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    if request.user.is_active and request.user is not 'AnonymousUser':
        return JsonResponse(request.user.username, safe=False)
    else:
        user = authenticate(username=request.POST.get('username'), password=request.POST.get('password'))
        if user is not None:
            login(request=request, user=user)
            return JsonResponse(user.username, safe=False)
        else:
            return JsonResponse(False, safe=False)


def register_user(request):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    username = request.POST.get('username')
    password = request.POST.get('password')

    if username and password:
        User.objects.create_user(username=username, password=password)
        user = authenticate(username=username, password=password)
        login(request, user=user)
        return JsonResponse(user.username, safe=False)

    print('not valid')
    return JsonResponse(False, safe=False)


def logout_user(request):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    logout(request)
    return JsonResponse(None, safe=False)


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


def get_games(request, user):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    cursor = connection.cursor()

    # Check which games to return based on user
    if user == 'null':
        cursor.execute(
            '''
            SELECT name, description, num_questions, difficulty 
            FROM api_game
            '''
        )
    else:
        cursor.execute(
            '''
            SELECT ag.name, ag.description, ag.num_questions, ag.difficulty
            FROM api_game AS ag
            WHERE ag.id IN
              (
                SELECT aug.game_id
                FROM api_user_game AS aug
                  INNER JOIN auth_user au on aug.user_id = au.id
                WHERE au.username = '%s'
              );
            ''', [user]
        )

    rows = cursor.fetchall()
    if rows:
        keys = [col[0] for col in cursor.description]
        game_list = [{key: val for key, val in zip(keys, row)} for row in rows]
        return JsonResponse(game_list, safe=False)
    else:
        return JsonResponse('', safe=False)
