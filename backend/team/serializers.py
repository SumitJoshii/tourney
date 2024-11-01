# team/serializers.py
from rest_framework import serializers

from backend.serializers import ValidateModelSerializer
from tournament.models import Tournament
from tournament.serializers import TournamentReadOnlySerializer
from .models import Team

class TeamSerializer(ValidateModelSerializer):
    NESTED_FIELDS_TO_QUERYSET = {
        "tournament": Tournament.objects.all(),
    }
    tournament = TournamentReadOnlySerializer(required = False)
    
    class Meta:
        model = Team
        fields = ['id', 'name', 'is_team', 'tournament']


class TeamReadOnlySerializer(serializers.ModelSerializer):
    NESTED_FIELDS_TO_QUERYSET = {
        "tournament": Tournament.objects.all(),
    }
    tournament = TournamentReadOnlySerializer(required = False)

    id = serializers.IntegerField(required=False)
    name = serializers.CharField(required = False)
    is_team = serializers.BooleanField(required = False)
    class Meta:
        model = Team
        fields = ['id', 'name', 'is_team', 'tournament']

class TeamReadOnlyWithoutTournamentSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    name = serializers.CharField(required = False)
    is_team = serializers.BooleanField(required = False)
    class Meta:
        model = Team
        fields = ['id', 'name', 'is_team']
