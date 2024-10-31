# match/serializers.py
from rest_framework import serializers

from backend.serializers import ValidateModelSerializer
from team.models import Team
from tournament.models import Tournament
from .models import Match
from tournament.serializers import TournamentReadOnlySerializer
from team.serializers import TeamReadOnlyWithoutTournamentSerializer

class MatchSerializer(ValidateModelSerializer):
    NESTED_FIELDS_TO_QUERYSET = {
        "tournament": Tournament.objects.all(),
        "team1": Team.objects.all(),
        "team2": Team.objects.all(),
    }
    # what is this
    
    tournament = TournamentReadOnlySerializer(required=False)
    team1 = TeamReadOnlyWithoutTournamentSerializer(required=False)
    team2 = TeamReadOnlyWithoutTournamentSerializer(required=False)
    

    class Meta:
        model = Match
        fields = [
            'id', 'tournament', 'date', 'team1', 'team2', 'score_team1', 'score_team2',
            'deciding_factor', 'is_finished', 'is_tie', 'winner'
        ]
