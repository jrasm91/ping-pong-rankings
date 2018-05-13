import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Match } from '../models/match.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MatchService {

  private matches = new BehaviorSubject<Array<Match>>([]);
  private loaded = false;

  constructor(
    @Inject(HttpClient) private http: HttpClient
  ) {
    this.loadMatches();
  }

  private loadMatches() {
    this.loaded = true;

    const obs = this.http.get<Array<Match>>('/api/matches').share();

    obs.subscribe(matches => {
      this.matches.next(matches);
    });

    return obs;
  }

  getMatches() {
    if (this.loaded) {
      return this.matches.asObservable();
    }
    return this.loadMatches();
  }

  createMatch(match: Match) {
    return this.http.post('/api/match', match);
  }

  getMatchesByPlayer(id): Observable<Array<Match>> {
    return this.getMatches().flatMap((matches: Array<Match>) => {
      const filtered = matches.filter(match => match.winner === id || match.loser === id);
      return Observable.of(filtered);
    });
  }

}
