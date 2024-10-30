from django.contrib import admin
from .models import Match

class MatchAdmin(admin.ModelAdmin):
    list_display = ('tournament', 'team1', 'team2', 'date', 'score_team1', 'score_team2', 'is_finished', 'is_tie')
    list_filter = ('tournament', 'date', 'is_finished', 'is_tie')
    search_fields = ('tournament__name', 'team1__name', 'team2__name')

admin.site.register(Match, MatchAdmin)