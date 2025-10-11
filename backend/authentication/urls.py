from django.urls import path
from .views import *

urlpatterns = [
    path('guest', GuestLoginViews.as_view(), name='loginguest'),
    path('guestupdate', UpdateGuestUser.as_view(), name='updateguest')
]