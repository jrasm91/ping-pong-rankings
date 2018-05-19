import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../models/game.model';

@Pipe({
  name: 'gamesFormat'
})
export class GamesFormatPipe implements PipeTransform {
  transform(games: Array<Game>, reverse: boolean): any {
    return (games || [])
      .map(game => {
        return reverse ? `${game.player1} - ${game.player2}` : `${game.player2} - ${game.player1}`;
      }).join(', ');
  }
}
