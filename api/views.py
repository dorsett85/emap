from django.db import connection
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate, login, logout


def login_user(request):
    # return logout(request)
    if request.is_ajax():
        # if request.POST.get('logout'):
        #     logout(request)
        if request.user.is_active and request.user is not 'AnonymousUser':
            return JsonResponse(request.user.username, safe=False)
        else:
            user = authenticate(username=request.POST.get('username'), password=request.POST.get('password'))
            if user is not None:
                login(request=request, user=user)
                return JsonResponse(user.username, safe=False)
            else:
                JsonResponse('You must register before logging in')
    else:
        return HttpResponse('Must be an ajax request')


def all_places(request):
    if request.is_ajax():
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

    else:
        return HttpResponse('Must be an ajax request')

