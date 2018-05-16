import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Match } from '../../models/match.model';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})


export class MatchListComponent implements OnInit {

  matches: Array<Match> = [];

  constructor(@Inject(ApiService) private api: ApiService) { }

  ngOnInit() {
    this.api.matches.subscribe(matches => {
      this.matches = matches;
    });
  }

}
