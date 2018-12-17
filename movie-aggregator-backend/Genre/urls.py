from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'genre/(?P<genre_id>\w+)/$', views.genre_view, name='genre'),
    url(r'genre', views.genre_view, name='genre'),
]
