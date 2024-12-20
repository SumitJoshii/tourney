import { api } from 'src/boot/axios';
import { useApiHelper } from 'src/utils/api';
import { Tournament, TournamentType } from 'src/models/tournament';
import { Table } from 'src/models/table';
import { TeamWithoutTournament } from 'src/models/team';

export default () => {
  const apiHelper = useApiHelper({
    api: api,
    baseUrl: '/api/',
  });
  return {
    createTournament: (data: Tournament) =>
      apiHelper.post('tournament/tournaments/', data) as Promise<Tournament>,

    getTournaments: () =>
      apiHelper.get('tournament/tournaments/') as Promise<Tournament[]>,

    getTournamentTypes: () =>
      apiHelper.get('tournament/tournament-types/') as Promise<
        TournamentType[]
      >,
    updateTeamName: (tournamentId: number, team: TeamWithoutTournament) =>
      apiHelper.patch(
        `team/tournaments/${tournamentId}/teams/${team.id}/`,
        team
      ) as Promise<TeamWithoutTournament>,
    updateTournamentWinner: (tournamentId: number, winnerName: string) =>
      apiHelper.post(`tournament/${tournamentId}/update_winner/`, {
        winner: winnerName,
      }),
    getTournament: (tournamentId: number) =>
      apiHelper.get(
        `tournament/tournaments/${tournamentId}/`
      ) as Promise<Tournament>,
    getTableInfo: (tournamentId: number) =>
      apiHelper.get(`tournament/info/${tournamentId}/table-info`) as Promise<
        Table[]
      >,
  };
};
