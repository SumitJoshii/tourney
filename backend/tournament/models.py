from django.db import models

class TournamentType(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Tournament(models.Model):
    type = models.ForeignKey(TournamentType, on_delete=models.CASCADE, related_name="tournaments")
    name = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    number_of_teams = models.IntegerField()
    is_finished = models.BooleanField(db_default=False)
    winner = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name
