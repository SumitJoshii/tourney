import { api } from 'src/boot/axios';
import { useApiHelper } from 'src/utils/api';
import { Match } from 'src/models/match';

export default () => {
  const apiHelper = useApiHelper({
    api: api,
    baseUrl: '/api/',
  });
  return {
    getMatches: (tournamentId: number) =>
      apiHelper.get(`match/tournaments/${tournamentId}/matches/`) as Promise<
        Match[]
      >,
    saveScore: (tournamentId: number, match: Match) =>
      apiHelper.put(`match/tournaments/${tournamentId}/matches/${match.id}/`, {
        data: match,
      }) as Promise<Match>,
  };
};
