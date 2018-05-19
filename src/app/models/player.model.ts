import { Match } from './match.model';

export interface Player {
  _id?: string;
  name: string;
  matches: Array<Match>;
  score: number;
  wins?: number;
  losses?: number;
}
