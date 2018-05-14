import { Component, OnInit, Inject } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player.model';
import { Match } from '../../models/match.model';
import { MatchService } from '../../services/match.service';
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
    @Inject(PlayerService) private playerStore: PlayerService,
    @Inject(MatchService) private matchStore: MatchService
  ) { }

  ngOnInit() {
    this.resetMatch();
    this.resetGame();
    this.playerStore.getPlayers().subscribe(players => this.players = players);
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
    this.matchStore.addMatch(this.newMatch).subscribe(
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
      date: new Date().toISOString().slice(0, 11) + '14:30:00',
      winner: '',
      loser: '',
      player1: '',
      player2: ''
    };
  }

}
