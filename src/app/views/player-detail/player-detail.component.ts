import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../../models/player.model';
import { ApiService } from '../../services/api.service';
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
  playerMatches: Array<Match> = [];
  playerCompares: Array<PlayerCompare> = [];

  constructor(
    private route: ActivatedRoute,
    @Inject(ApiService) private api: ApiService,
  ) {
    const playerId = this.route.snapshot.params.id;

    this.api.getPlayerById(playerId).flatMap(player => {
      this.player = player;
      return this.api.getMatchesByPlayer(playerId);
    }).subscribe(matches => {
      this.playerMatches = matches;
      this.calcMatchCompare(matches);
    });
  }

  ngOnInit() { }

  calcMatchCompare(matches: Array<Match>) {
    const opponentMap = {};

    matches.forEach(match => {
      const opponentId = this.player._id === match.winnerId ? match.loserId : match.winnerId;
      const opponentName = opponentId === match.winnerId ? match.winnerName : match.loserName;
      if (!opponentMap[opponentId]) {
        opponentMap[opponentId] = {
          opponentName,
          wins: 0,
          losses: 0,
          streak: 0
        };
      }

      const opponent = opponentMap[opponentId];
      if (this.player._id === match.winnerId) {
        opponent.wins += 1;
        if (opponent.streak >= 0) {
          opponent.streak += 1;
        } else {
          opponent.streak = 1;
        }
      } else {
        opponent.losses += 1;
        if (opponent.streak <= 0) {
          opponent.streak -= 1;
        } else {
          opponent.streak = -1;
        }
      }
    });
    this.playerCompares = Object.values(opponentMap);
  }
}
