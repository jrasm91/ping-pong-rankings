import { Component, Inject, OnInit } from '@angular/core';
import { Player } from '../../models/player.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  players: Array<Player> = [];

  constructor(@Inject(ApiService) private api: ApiService) { }

  ngOnInit() {
    this.api.players.subscribe(players => {
      this.players = players;
    });
  }

}
