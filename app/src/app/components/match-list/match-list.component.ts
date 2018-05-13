import { Component, OnInit, Inject } from '@angular/core';
import { MatchService } from '../../services/match.service';
import { Match } from '../../models/match.model';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})


export class MatchListComponent implements OnInit {

  matches: Array<Match> = [];

  constructor(@Inject(MatchService) private matchStore: MatchService) { }

  ngOnInit() {
    this.matchStore.getMatches().subscribe(matches => {
      this.matches = matches;
    });
  }

}
