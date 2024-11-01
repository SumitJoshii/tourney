# team/views.py
from rest_framework import viewsets
from .models import Team
from .serializers import TeamSerializer

class TeamViewSet(viewsets.ModelViewSet):
    serializer_class = TeamSerializer

    def get_queryset(self):
        tournament_id = self.kwargs.get('tournament_id')
        return Team.objects.filter(tournament__id=tournament_id)
