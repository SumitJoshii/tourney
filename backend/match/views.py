from rest_framework import viewsets

from team.models import Team
from team.serializers import TeamReadOnlyWithoutTournamentSerializer
from .models import Match
from .serializers import MatchSerializer
from rest_framework.response import Response
from django.db import models

class MatchViewSet(viewsets.ModelViewSet):
    serializer_class = MatchSerializer

    def get_queryset(self):
        tournament_id = self.kwargs.get('tournament_id')
        return Match.objects.filter(tournament__id=tournament_id)


class TableViewSet(viewsets.ViewSet):
    def list(self, request, *args, **kwargs):
        tournament_id = self.kwargs.get('tournament_id')
        if not tournament_id:
            return Response({"error": "Tournament ID is required"}, status=400)

        teams = Team.objects.filter(tournament__id=tournament_id)
        matches = Match.objects.filter(tournament__id=tournament_id, is_finished=True)
        table_info = []
        for team in teams:
            matches_played = matches.filter(models.Q(team1=team) | models.Q(team2=team)).count()

            matches_won = 0
            matches_lost = 0
            matches_tied = 0
            cumulative_deciding_factor = 0

            for match in matches.filter(models.Q(team1=team) | models.Q(team2=team)):
                if match.is_tie:
                    matches_tied += 1
                    cumulative_deciding_factor += 0
                elif match.winner == team:
                    matches_won += 1
                    if match.team1 == team:
                        cumulative_deciding_factor += abs(match.score_team1 - match.score_team2)
                    else:
                        cumulative_deciding_factor += abs(match.score_team2 - match.score_team1)
                else:
                    matches_lost += 1
                    if match.team1 == team:
                        cumulative_deciding_factor -= abs(match.score_team1 - match.score_team2)
                    else:
                        cumulative_deciding_factor -= abs(match.score_team2 - match.score_team1)

            points = matches_won + (0.5 * matches_tied)

            team_data = TeamReadOnlyWithoutTournamentSerializer(team).data

            table_info.append({
                "team": team_data,
                "matches_played": matches_played,
                "matches_won": matches_won,
                "matches_lost": matches_lost,
                "matches_tied": matches_tied,
                "points": points,
                "cumulative_deciding_factor": cumulative_deciding_factor,
            })

        return Response(table_info)