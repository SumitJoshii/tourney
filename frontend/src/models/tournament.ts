export interface TournamentType {
  id?: number;
  name: string;
  description: string;
}

export interface Tournament {
  id?: number;
  name: string;
  number_of_teams: number;
  type: TournamentType;
  start_date: string;
  end_date: string;
}
