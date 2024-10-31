from rest_framework import viewsets
from .models import Match
from .serializers import MatchSerializer

class MatchViewSet(viewsets.ModelViewSet):
    serializer_class = MatchSerializer

    def get_queryset(self):
        tournament_id = self.kwargs.get('tournament_id')
        return Match.objects.filter(tournament__id=tournament_id)
