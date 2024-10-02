from django.urls import path
from .views import generate_common_colors

urlpatterns = [
    path('', generate_common_colors, name='generate_common_colors'),
    path('color-palette/', generate_common_colors, name='color-palette-upload')
]