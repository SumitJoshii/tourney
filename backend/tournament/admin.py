from django.contrib import admin
from .models import TournamentType, Tournament


class TournamentTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)

class TournamentAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'start_date', 'end_date', 'number_of_teams')
    list_filter = ('type', 'start_date', 'end_date')
    search_fields = ('name',)

admin.site.register(TournamentType, TournamentTypeAdmin)
admin.site.register(Tournament, TournamentAdmin)

