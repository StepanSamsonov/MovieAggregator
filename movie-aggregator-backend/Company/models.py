from django.db import models


class Company(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True, default=None)
    founding_date = models.IntegerField(default=0)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Company'
        verbose_name_plural = 'Companies'
