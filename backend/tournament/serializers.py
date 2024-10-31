from rest_framework import serializers

from backend.serializers import ValidateModelSerializer
from .models import TournamentType, Tournament

class TournamentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TournamentType
        fields = ['id', 'name', 'description']


class TournamentTypeReadOnlySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    name = serializers.CharField(required=False)
    description = serializers.CharField(required=False)

    class Meta:
        model = TournamentType
        fields = ['id', 'name', 'description']


class TournamentSerializer(ValidateModelSerializer):
    NESTED_FIELDS_TO_QUERYSET = {
        "type": TournamentType.objects.all(),
    }
    type = TournamentTypeReadOnlySerializer(required=False)

    class Meta:
        model = Tournament
        fields = ['id', 'type', 'name', 'start_date', 'end_date', 'number_of_teams']


class TournamentReadOnlySerializer(serializers.ModelSerializer):
    NESTED_FIELDS_TO_QUERYSET = {
        "type": TournamentType.objects.all(),
    }
    id = serializers.IntegerField(required=False)
    name = serializers.CharField(required=False)
    start_date = serializers.DateField(required=False)
    end_date = serializers.DateField(required=False)
    number_of_teams = serializers.IntegerField(required=False)
    type = TournamentTypeReadOnlySerializer(required=False)
    

    class Meta:
        model = Tournament
        fields = ['id', 'type', 'name', 'start_date', 'end_date', 'number_of_teams']

