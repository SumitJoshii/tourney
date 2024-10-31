import { api } from 'src/boot/axios';
import { useApiHelper } from 'src/utils/api';
import { Tournament, TournamentType } from 'src/models/tournament';

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
  };
};
