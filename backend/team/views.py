# team/views.py
from rest_framework import viewsets
from .models import Team
from .serializers import TeamReadOnlySerializer, TeamSerializer

class TeamViewSet(viewsets.ModelViewSet):
    serializer_class = TeamReadOnlySerializer

    def get_queryset(self):
        tournament_id = self.kwargs.get('tournament_id')
        return Team.objects.filter(tournament__id=tournament_id)
