import { Component, OnInit, Inject } from '@angular/core';
import { Player } from '../../models/player.model';
import { ApiService } from '../../services/api.service';
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

  constructor(@Inject(ApiService) private api: ApiService) { }

  ngOnInit() {
    this.resetPlayer();
    this.api.players.subscribe(players => {
      this.players = players;
    });
  }

  addPlayer() {
    this.errorMessage = '';
    this.api.addPlayer(this.newPlayer).subscribe(
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
