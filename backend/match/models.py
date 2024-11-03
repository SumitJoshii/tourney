from django.db import models
from team.models import Team
from tournament.models import Tournament

class Match(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name="matches")
    team1 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="home_matches")
    team2 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="away_matches")
    date = models.DateField(null=True, blank=True)
    score_team1 = models.IntegerField(null=True, blank=True)
    score_team2 = models.IntegerField(null=True, blank=True)
    deciding_factor = models.FloatField(null=True, blank=True)
    is_finished = models.BooleanField(default=False)
    is_tie = models.BooleanField(default=False)


    def __str__(self):
        return f"{self.team1.name} vs {self.team2.name} - {self.tournament.name}"

    #Check
    @property
    def winner(self):
        if self.score_team1 is not None and self.score_team2 is not None:
            return self.team1 if self.score_team1 > self.score_team2 else self.team2
        return None

