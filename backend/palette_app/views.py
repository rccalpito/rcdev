from django.shortcuts import render
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from .forms import ImageUploadForm
import os
import cv2
from sklearn.cluster import KMeans
import numpy as np

def load_image(image_path):
    # Load image using OpenCV
    image = cv2.imread(image_path)
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    return image_rgb

def get_dominant_colors(image, k=5):
    # Resize and find dominant colors
    image = cv2.resize(image, (64, 64))
    pixels = image.reshape((-1, 3))
    kmeans = KMeans(n_clusters=k)
    kmeans.fit(pixels)
    dominant_colors = kmeans.cluster_centers_.astype(int)
    return dominant_colors

def palette_view(request):
    if request.method == 'POST':
        form = ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            image = form.cleaned_data['image']
            fs = FileSystemStorage()
            filename = fs.save(image.name, image)
            file_url = fs.url(filename)

            # Load and process the image
            image_path = os.path.join(settings.MEDIA_ROOT, filename)
            image_rgb = load_image(image_path)

            # Generate dominant colors
            dominant_colors = get_dominant_colors(image_rgb)

            # Create a palette image
            palette = np.zeros((50, 300, 3), dtype='uint8')
            step = 300 // len(dominant_colors)
            for i, color in enumerate(dominant_colors):
                palette[:, i * step:(i + 1) * step, :] = color

            # Save the palette image
            palette_filename = 'palette_' + filename
            palette_path = os.path.join(settings.MEDIA_ROOT, palette_filename)
            cv2.imwrite(palette_path, cv2.cvtColor(palette, cv2.COLOR_RGB2BGR))

            return render(request, 'palette_app/result.html', {
                'file_url': file_url,
                'palette_url': fs.url(palette_filename),
            })
    else:
        form = ImageUploadForm()

    return render(request, 'palette_app/upload.html', {'form': form})