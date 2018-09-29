from django.test import TestCase
from .models import Place


class PlaceModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Place.objects.create(name='Montana')
        Place.objects.create(description='a description here')

    def test_name_content(self):
        place = Place.objects.get(id=1)
        expected_object_name = f'{place.name}'
        self.assertEquals(expected_object_name, 'Montana')

    def test_description_content(self):
        place = Place.objects.get(id=2)
        expected_object_name = f'{place.description}'
        self.assertEquals(expected_object_name, 'a description here')


