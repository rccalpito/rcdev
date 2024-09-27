from sklearn.cluster import KMeans
import cv2

def get_dominant_colors(image, k=5):
    image = cv2.resize(image, (64, 64))
    pixels = image.reshape((-1, 3))
    kmeans = KMeans(n_clusters=k)
    kmeans.fit(pixels)
    dominant_colors = kmeans.cluster_centers_.astype(int)

    return dominant_colors