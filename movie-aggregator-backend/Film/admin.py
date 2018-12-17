from django.contrib import admin
from .models import Film


class FilmAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Film._meta.fields]
    del list_display[list_display.index('overview')]
    del list_display[list_display.index('tagline')]
    list_filter = ['budget', 'language', 'country']
    search_fields = ['name']

    class Meta:
        model = Film


admin.site.register(Film, FilmAdmin)
