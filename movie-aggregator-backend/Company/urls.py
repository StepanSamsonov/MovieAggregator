from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'company/(?P<company_id>\w+)/$', views.company_view, name='company'),
    url(r'company', views.company_view, name='company'),
]
