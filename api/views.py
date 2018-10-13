from django.db import connection
from django.http import JsonResponse, HttpResponse


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
            place = [[k, v] for k, v in zip(keys, vals)]
            return JsonResponse(place, safe=False)
        else:
            return JsonResponse('No matching search results', safe=False)

    else:
        return HttpResponse('Must be an ajax request')

