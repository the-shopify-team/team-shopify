from django.urls import path
from .views import *

urlpatterns = [
    path('guest', GuestLoginViews.as_view(), name='loginguest'),
    path('guestupdate', UpdateGuestUser.as_view(), name='updateguest'),
    path('all', UserView.as_view(), name='all users'),
    path('user/<int:pk>', UserDetailsView.as_view(), name='user detail')
]