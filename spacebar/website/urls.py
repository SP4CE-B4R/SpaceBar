from . import views
from django.urls import path

urlpatterns = [
	path('home/', views.Feed.as_view(), name="homeFeed"),
	path('', views.Feed.as_view(), name="homeFeed"),
]