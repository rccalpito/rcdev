from backend.config.vite import *
from backend.config.installed_apps import *
from backend.config.middleware import *
from backend.config.templates import *
from backend.config.database import *
from backend.config.internationalization import *
from backend.config.static import *
from backend.config.security import *
from backend.config.wsgi import *
from backend.config.development import *


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

ROOT_URLCONF = "backend.urls"

CORS_ORIGIN_ALLOW_ALL = True

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
]

CORS_ALLOW_METHODS = ['POST']

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:5173',  # Frontend origin
]