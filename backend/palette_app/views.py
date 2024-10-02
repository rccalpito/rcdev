from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from .forms import ImageUploadForm
from .services.computer_vision.load_image import load_image
from .services.math.get_dominant_colors import get_dominant_colors
from django.http import JsonResponse

# @csrf_exempt

def generate_common_colors(request):
    if request.method == 'POST':
        form = ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            image = form.cleaned_data['image']
            image_rgb = load_image(image.read())
            dominant_colors = get_dominant_colors(image_rgb, 5).tolist()

            return JsonResponse({"dominant_colors": dominant_colors})
        else:
            return JsonResponse({"error": "Invalid form"}, status=400)
    return JsonResponse({"error": "POST request required"}, status=400)

