import { Match } from './match.model';

export interface Player {
  id?: string;
  name: string;
  matches: Array<Match>;
  score: number;
}
