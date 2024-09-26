from backend.config.base import BASE_DIR

# Django Vite settings
STATIC_URL = '/static/frontend/'
STATICFILES_DIRS = [BASE_DIR / 'frontend' / '.vite']
STATIC_ROOT = BASE_DIR / 'staticfiles'
VITE_MANIFEST_PATH = BASE_DIR / 'frontend' / '.vite' / 'manifest.json'