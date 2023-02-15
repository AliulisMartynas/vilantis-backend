from django.urls import path
from . import views

urlpatterns = [
    path('urls/', views.getUrls, name="urls"),
    path('urls/<str:pk>/', views.getUrl, name="url"),
]
