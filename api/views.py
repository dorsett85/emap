from rest_framework import generics

from .models import Place
from .serializers import PlaceSerializer


class ListPlace(generics.ListCreateAPIView):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer


class DetailPlace(generics.RetrieveUpdateDestroyAPIView):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
