import { Component, Inject, OnInit } from '@angular/core';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  constructor(@Inject(MatchService) private matchStore: MatchService) { }

  ngOnInit() { }

}
