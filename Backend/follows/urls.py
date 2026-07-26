from django.urls import path
from follows.views import *

urlpatterns = [
    path("<int:user_id>/follow/", follow, name='follow'),
    path("<int:user_id>/followers/", followers, name='followers'),
    path("<int:user_id>/following/", following, name='following'),
]
