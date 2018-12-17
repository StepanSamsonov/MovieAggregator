from django.db import models

from Actor.models import Actor
from Company.models import Company
from Genre.models import Genre


class Film(models.Model):
    budget = models.IntegerField(default=0)
    name = models.CharField(max_length=100, blank=True, null=True, default=None)
    language = models.CharField(max_length=100, blank=True, null=True, default=None)
    overview = models.TextField(default=None)
    country = models.CharField(max_length=100, blank=True, null=True, default=None)
    date = models.DateField(default=None)
    revenue = models.BigIntegerField(default=0)
    runtime = models.IntegerField(default=0)
    tagline = models.TextField(default=None)
    image = models.CharField(max_length=100, blank=True, null=True, default=None)

    actors = models.ManyToManyField(Actor)
    genres = models.ManyToManyField(Genre)
    companies = models.ManyToManyField(Company)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Film'
        verbose_name_plural = 'Films'
