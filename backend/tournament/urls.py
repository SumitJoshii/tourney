from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TableViewSet, TournamentTypeViewSet, TournamentViewSet

router = DefaultRouter()
router.register(r'tournament-types', TournamentTypeViewSet)
router.register(r'tournaments', TournamentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('info/<int:tournament_id>/table-info/', TableViewSet.as_view({'get': 'list'}), name='tournament-table'),
    path('<int:pk>/update_winner/', TournamentViewSet.as_view({'post': 'update_winner'}), name='update-winner')

]
