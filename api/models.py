from django.db import models


class Place(models.Model):
    city = models.CharField(max_length=100)
    lat = models.FloatField()
    lon = models.FloatField()
    country = models.CharField(max_length=100)
    population = models.IntegerField()

    def __str__(self):
        """A string representation of the model"""
        return self.city



