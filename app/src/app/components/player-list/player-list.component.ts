import { Component, Inject, OnInit } from '@angular/core';
import { Player } from '../../models/player.model';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  players: Array<Player> = [];


  constructor(@Inject(PlayerService) private playerStore: PlayerService) { }

  ngOnInit() {
    this.playerStore.getPlayers().subscribe(players => {
      this.players = players;
    });
  }

}
