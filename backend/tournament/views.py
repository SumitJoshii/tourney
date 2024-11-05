from rest_framework import viewsets, status
from rest_framework.decorators import action

from team.serializers import TeamReadOnlyWithoutTournamentSerializer
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
    
    #get the url in action
    @action(detail=True, methods=['post'])
    def update_winner(self, request, pk=None):
        try:
            tournament = self.get_object()
            winner_name = request.data.get('winner')

            if not winner_name:
                return Response(
                    {"error": "Winner name is required."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Update the tournament winner
            tournament.winner = winner_name
            tournament.is_finished = True
            tournament.save()

            return Response(
                {"message": "Tournament winner updated successfully"},
                status=status.HTTP_200_OK
            )
        except Tournament.DoesNotExist:
            return Response(
                {"error": "Tournament not found"},
                status=status.HTTP_404_NOT_FOUND
            )


class TableViewSet(viewsets.ViewSet):
    
    def list(self, request, tournament_id=None):
        # Get tournament and related finished matches
        try:
            tournament = Tournament.objects.get(id=tournament_id)
        except Tournament.DoesNotExist:
            return Response({"error": "Tournament not found"}, status=status.HTTP_404_NOT_FOUND)

        # Get all teams for the tournament
        teams = Team.objects.filter(tournament=tournament)
        team_stats = {team.id: {
            "team": TeamReadOnlyWithoutTournamentSerializer(team).data,
            "played": 0,
            "won": 0,
            "lost": 0,
            "tie": 0,
            "points": 0,
            "cumulative_deciding_factor": 0
        } for team in teams}

        # Get all finished matches for the tournament
        matches = Match.objects.filter(tournament=tournament, is_finished=True)
        
        for match in matches:
            team1_stats = team_stats[match.team1.id]
            team2_stats = team_stats[match.team2.id]
            
            team1_stats["played"] += 1
            team2_stats["played"] += 1

            if match.is_tie:
                # If the match is tied
                team1_stats["tie"] += 1
                team2_stats["tie"] += 1
                team1_stats["points"] += 0.5
                team2_stats["points"] += 0.5
            else:
                # Determine the winner and update stats accordingly
                if match.winner == match.team1:
                    team1_stats["won"] += 1
                    team2_stats["lost"] += 1
                    team1_stats["points"] += 1
                    team1_stats["cumulative_deciding_factor"] += match.deciding_factor
                    team2_stats["cumulative_deciding_factor"] -= match.deciding_factor
                else:
                    team2_stats["won"] += 1
                    team1_stats["lost"] += 1
                    team2_stats["points"] += 1
                    team2_stats["cumulative_deciding_factor"] += match.deciding_factor
                    team1_stats["cumulative_deciding_factor"] -= match.deciding_factor

        
        # Convert the team_stats dictionary into a list of stats dictionaries
        response_data = list(team_stats.values())

        # Sort by points, and then by cumulative_deciding_factor if points are tied
        response_data.sort(key=lambda x: (x["points"], x["cumulative_deciding_factor"]), reverse=True)
        
        return Response(response_data, status=status.HTTP_200_OK)