import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Player } from '../../models/player.model';
import { Match } from '../../models/match.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit {

  errorMessage = '';
  players: Array<Player> = [];
  newMatch: Match;
  newGame: Game;

  constructor(
    @Inject(ApiService) private api: ApiService,
  ) { }

  ngOnInit() {
    this.resetMatch();
    this.resetGame();
    this.api.players.subscribe(players => this.players = players);
  }

  addGame() {
    this.newMatch.games.push(this.newGame);
    this.resetGame();
  }

  removeGame(i: number) {
    this.newMatch.games.splice(i, 1);
  }

  resetGame() {
    this.newGame = {
      player1: 21,
      player2: 0
    };
  }

  addMatch() {
    this.errorMessage = '';
    this.api.addMatch(this.newMatch).subscribe(
      match => { },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
      });
    this.resetMatch();
    this.resetGame();
  }

  resetMatch() {
    this.newMatch = {
      games: [],
      player1: '',
      player2: ''
    };
  }

}
