from rest_framework import viewsets, status
from .models import TournamentType, Tournament
from .serializers import TournamentTypeSerializer, TournamentSerializer
from rest_framework.response import Response
from team.models import Team
from match.models import Match
import itertools

class TournamentTypeViewSet(viewsets.ModelViewSet):
    queryset = TournamentType.objects.all()
    serializer_class = TournamentTypeSerializer

class TournamentViewSet(viewsets.ModelViewSet):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        tournament = serializer.save()

        tournament_type = tournament.type.name
        number_of_teams = tournament.number_of_teams

        teams = []
        for i in range(1, number_of_teams + 1):
            team = Team.objects.create(name=f"Team {i}", tournament=tournament)
            teams.append(team)

        if tournament_type == "RR":
            matchups = itertools.combinations(teams, 2)
        elif tournament_type == "DRR":
            matchups = list(itertools.combinations(teams, 2)) * 2
        else:
            return Response({"error": "Unsupported tournament type"}, status=status.HTTP_400_BAD_REQUEST)

        print("matchups", matchups)

        for team1, team2 in matchups:
            Match.objects.create(tournament=tournament, team1=team1, team2=team2, date=tournament.start_date)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
