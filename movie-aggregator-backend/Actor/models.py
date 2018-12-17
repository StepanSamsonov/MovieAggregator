from django.db import models


class Actor(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True, default=None)
    image = models.CharField(max_length=100, blank=True, null=True, default=None)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Actor'
        verbose_name_plural = 'Actors'
