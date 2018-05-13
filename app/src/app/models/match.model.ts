import { Game } from './game.model';

export interface Match {
  games: Array<Game>;
  date: Date;
  winner?: string;
  loser?: string;
  player1: string;
  player2: string;
}
