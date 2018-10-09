from django.http import JsonResponse

from .models import Place


def all_places(request):
    print(request.is_ajax())
    return JsonResponse('This is the data', safe=False)

