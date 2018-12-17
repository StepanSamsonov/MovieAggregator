from django.db import models

from Actor.models import Actor
from Company.models import Company


class Genre(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True, default=None)
    description = models.TextField(default=None)
    image = models.TextField(default=None)

    actors = models.ManyToManyField(Actor)
    companies = models.ManyToManyField(Company)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Genre'
        verbose_name_plural = 'Genres'
