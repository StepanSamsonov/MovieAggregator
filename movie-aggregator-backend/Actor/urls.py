from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'actor/(?P<actor_id>\w+)/$', views.actor_view, name='actor'),
    url(r'actor', views.actor_view, name='actor'),
]
