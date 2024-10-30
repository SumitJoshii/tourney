from django.contrib import admin
from .models import Team

class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'tournament', 'is_team')
    list_filter = ('tournament', 'is_team')
    search_fields = ('name', 'tournament__name')

admin.site.register(Team, TeamAdmin)