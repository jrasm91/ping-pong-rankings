import { Component, OnInit, Inject } from '@angular/core';
import { Match } from '../../models/match.model';
import { MatchService } from '../../services/match.service';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  newMatch: Match;
  errorMessage = '';

  constructor(@Inject(MatchService) private matchStore: MatchService) { }

  ngOnInit() {
    this.resetMatch();
  }

  addMatch() {
    this.errorMessage = '';
    this.matchStore.createMatch(this.newMatch).subscribe(
      match => { },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
      });
    this.resetMatch();
  }

  resetMatch() {
    this.newMatch = {
      games: [],
      date: new Date(),
      winner: '',
      loser: '',
      player1: '',
      player2: ''
    };
  }
}
