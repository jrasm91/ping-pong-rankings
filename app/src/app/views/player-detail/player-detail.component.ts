import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player.model';
import { MatchService } from '../../services/match.service';
import { Match } from '../../models/match.model';

interface PlayerCompare {
  name: string;
  wins: number;
  losses: number;
  streak: number;
}

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {

  player: Player;
  playerCompares: Array<PlayerCompare> = [];

  constructor(
    private route: ActivatedRoute,
    @Inject(PlayerService) private playerStore: PlayerService,
    @Inject(MatchService) private matchStore: MatchService
  ) {
    const playerId = this.route.snapshot.params.id;
    this.player = playerId;

    this.playerStore.getPlayerById(playerId).flatMap(player => {
      this.player = player;
      return this.matchStore.getMatchesByPlayer(playerId);
    }).subscribe(matches => this.calcMatchCompare(matches));
  }

  ngOnInit() { }

  calcMatchCompare(matches: Array<Match>) {
    const opponentMap = {};

    matches.forEach(match => {
      const opponentId = this.player.id === match.winner ? match.loser : match.winner;
      if (!opponentMap[opponentId]) {
        opponentMap[opponentId] = {
          name: opponentId,
          wins: 0,
          losses: 0,
          streak: 0
        };
      }

      const opponentCompare = opponentMap[opponentId];
      if (this.player.id === match.winner) {
        opponentCompare.wins += 1;
        if (opponentCompare.streak >= 0) {
          opponentCompare.streak += 1;
        } else {
          opponentCompare.streak = 1;
        }
      } else {
        opponentCompare.losses += 1;
        if (opponentCompare.streak <= 0) {
          opponentCompare.streak -= 1;
        } else {
          opponentCompare.streak = -1;
        }
      }
    });
    this.playerCompares = Object.values(opponentMap);
  }
}
