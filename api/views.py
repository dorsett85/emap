from django.http import JsonResponse, HttpResponse

from .models import Place


def all_places(request):
    if request.is_ajax():
        place = request.POST.get('place')
        return JsonResponse(place, safe=False)
    else:
        return HttpResponse('Must be an ajax request')

