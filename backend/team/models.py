from django.db import models
from tournament.models import Tournament

class Team(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name="teams")
    name = models.CharField(max_length=100)
    is_team = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({self.tournament.name})"
