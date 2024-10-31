import { TeamWithoutTournament } from './team';
import { Tournament } from './tournament';

export interface Match {
  id?: number;
  tournament: Tournament;
  team1: TeamWithoutTournament;
  team2: TeamWithoutTournament;
  date: string;
  score_team1: number;
  score_team2: number;
  deciding_factor: number;
  is_finished: boolean;
  is_tie: boolean;
  winner: TeamWithoutTournament;
}
