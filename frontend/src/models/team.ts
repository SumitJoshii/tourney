import { Tournament } from './tournament';

export interface TeamWithoutTournament {
  id?: number;
  name: string;
  is_team: boolean;
}

export interface Team extends TeamWithoutTournament {
  tournament: Tournament;
}
