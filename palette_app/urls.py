from django.urls import path
from .views import palette_view

urlpatterns = [
    path('', palette_view, name='palette_view'),
]