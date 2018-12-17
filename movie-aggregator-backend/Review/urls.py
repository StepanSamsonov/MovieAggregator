from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'review/(?P<review_id>\w+)/$', views.review_view, name='review'),
    url(r'review', views.review_view, name='review'),
]
