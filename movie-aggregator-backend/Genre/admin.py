from django.contrib import admin
from .models import Genre


class GenreAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Genre._meta.fields]
    del list_display[list_display.index('description')]
    del list_display[list_display.index('image')]
    list_filter = []
    search_fields = ['name']

    class Meta:
        model = Genre


admin.site.register(Genre, GenreAdmin)
