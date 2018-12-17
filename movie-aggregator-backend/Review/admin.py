from django.contrib import admin
from .models import Review


class ReviewAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Review._meta.fields]
    del list_display[list_display.index('text')]
    del list_display[list_display.index('film')]
    list_filter = ['is_positive']
    search_fields = ['title']

    class Meta:
        model = Review


admin.site.register(Review, ReviewAdmin)
