# match/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MatchViewSet

router = DefaultRouter()
router.register(r'tournaments/(?P<tournament_id>[^/.]+)/matches', MatchViewSet, basename='match')

urlpatterns = [
    path('', include(router.urls)),
]
