from django.db import connection
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate, login, logout


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
    cursor.execute('SELECT city, lat, lon, country, population FROM api_place WHERE city = %s', [name])

    # Check if any matches are returned
    rows = cursor.fetchall()
    if rows:
        keys = [col[0] for col in cursor.description]
        vals = [val for val in rows[0]]
        place = dict(zip(keys, vals))
        return JsonResponse(place)
    else:
        return JsonResponse('', safe=False)


def get_games(request):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    import psycopg2
    conn = psycopg2.connect("dbname=emap host='localhost' user='clayton' password='Phillydor85!'")
    cur = conn.cursor()
    return JsonResponse('', safe=False)

    cursor = connection.cursor()
    cursor.execute('SELECT name, description, num_questions, difficulty FROM api_game')
    rows = cursor.fetchall()
    if rows:
        keys = [col[0] for col in cursor.description]
        game_list = [{key: val for key, val in zip(keys, row)} for row in rows]
        return JsonResponse(game_list, safe=False)
    else:
        return JsonResponse('', safe=False)
