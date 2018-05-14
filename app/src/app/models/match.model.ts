import { Game } from './game.model';
import { Player } from './player.model';

export interface Match {
  games: Array<Game>;
  date: string;
  winner?: string;
  loser?: string;
  player1: string;
  player2: string;
  _winner?: Player;
  _loser?: Player;
}
