# match/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MatchViewSet, TableViewSet

router = DefaultRouter()
router.register(r'tournaments/(?P<tournament_id>[^/.]+)/matches', MatchViewSet, basename='match')

urlpatterns = [
    path('', include(router.urls)),
    path('tournament/<int:tournament_id>/table-info/', TableViewSet.as_view({'get': 'list'}), name='table-info'),
]
