from django.db import models

from Film.models import Film


class Review(models.Model):
    text = models.TextField(default=None)
    is_positive = models.BooleanField(default=True)
    film = models.ForeignKey(Film, on_delete=models.CASCADE)

    def __str__(self):
        return self.text[:30]

    class Meta:
        verbose_name = 'Review'
        verbose_name_plural = 'Reviews'
