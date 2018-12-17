from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'film/(?P<film_id>\w+)/$', views.film_view, name='film'),
    url(r'film', views.film_view, name='film'),
]
