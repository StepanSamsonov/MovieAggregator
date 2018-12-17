from django.contrib import admin
from .models import Actor


class ActorAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Actor._meta.fields]
    search_fields = ['name']

    class Meta:
        model = Actor


admin.site.register(Actor, ActorAdmin)
