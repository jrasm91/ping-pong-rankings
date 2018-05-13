import { Component, OnInit, Inject } from '@angular/core';
import { Player } from '../../models/player.model';
import { PlayerService } from '../../services/player.service';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players: Array<Player> = [];
  newPlayer: Player;
  errorMessage = '';

  constructor(@Inject(PlayerService) private playerStore: PlayerService) { }

  ngOnInit() {
    this.resetPlayer();
    this.playerStore.getPlayers().subscribe(players => {
      this.players = players;
    });
  }

  addPlayer() {
    this.errorMessage = '';
    this.playerStore.createPlayer(this.newPlayer).subscribe(
      player => { },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
      });
    this.resetPlayer();
  }

  resetPlayer() {
    this.newPlayer = {
      score: 1500,
      name: '',
      matches: []
    };
  }
}
