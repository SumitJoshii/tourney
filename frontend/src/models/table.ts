import { TeamWithoutTournament } from './team';

export interface Table {
  team: TeamWithoutTournament;
  played: number;
  won: number;
  lost: number;
  tie: number;
  points: number;
  cumulative_deciding_factor: number;
}
