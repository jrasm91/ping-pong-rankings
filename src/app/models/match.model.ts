import { Game } from './game.model';
import { Player } from './player.model';

export interface Match {
  games: Array<Game>;
  player1: string;
  player2: string;

  winnerId?: string;
  winnerName?: string;
  winnerScore?: number;

  loserId?: string;
  loserName?: string;
  loserScore?: number;
}
