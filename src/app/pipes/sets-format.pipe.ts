import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../models/game.model';

@Pipe({
  name: 'setsFormat'
})
export class SetsFormatPipe implements PipeTransform {

  transform(games: Array<Game>, reverse: boolean): any {
    let wins = 0,
      losses = 0;
    (games || []).forEach(game => {
      if (game.player1 > game.player2) {
        wins += 1;
      } else {
        losses += 1;
      }
    });
    return reverse ? `${losses} - ${wins}` : `${wins} - ${losses}`;
  }

}
