from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/students/', include('apps.students.urls')),
    path('api/analysis/', include('apps.analysis.urls')),
    path('api/chat/', include('apps.chat.urls')),
]
