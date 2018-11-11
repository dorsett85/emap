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


def all_places(request):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    user_search = request.POST.get('place')

    # Query the database
    cursor = connection.cursor()
    cursor.execute('SELECT city, lat, lon, country, population FROM api_place WHERE city = %s', [user_search])

    # Check if any matches are returned
    rows = cursor.fetchall()
    if rows:
        keys = [col[0] for col in cursor.description]
        vals = [val for val in rows[0]]
        place = dict(zip(keys, vals))
        return JsonResponse(place)
    else:
        return JsonResponse('', safe=False)
