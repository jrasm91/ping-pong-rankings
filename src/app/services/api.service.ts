import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/share';
import { Match } from '../models/match.model';
import { Player } from '../models/player.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ApiService {

  private _players = new BehaviorSubject<Array<Player>>([]);
  private _matches = new BehaviorSubject<Array<Match>>([]);

  private MATCH_LIMIT = 250;

  constructor(
    @Inject(HttpClient) private http: HttpClient
  ) {
    this.refresh();
  }

  private refresh() {
    this.http.get<Array<Player>>(`/api/players`).subscribe(players => {
      this._players.next(players);
    });

    this.http.get<Array<Match>>(`/api/matches?limit=${this.MATCH_LIMIT}`).subscribe(matches => {
      this._matches.next(matches);
    });
  }

  get matches(): Observable<Array<Match>> {
    return this._matches.asObservable();
  }

  get players() {
    return this._players.asObservable();
  }

  addMatch(match: Match) {
    const obs = this.http.post<Match>('/api/matches', match).share();

    obs.subscribe(() => {
      this.refresh();
    });

    return obs;
  }

  addPlayer(player: Player): Observable<Player> {
    const obs = this.http.post<Player>('/api/players', player).share();

    obs.subscribe(() => {
      this.refresh();
    });

    return obs;
  }

  getMatchesByPlayer(id): Observable<Array<Match>> {
    return this.http.get<Array<Match>>(`/api/players/${id}/matches`);
  }

  getPlayerById(id: string): Observable<Player> {
    return this.players.flatMap((players: Player[]) => {
      const player = players.filter(p => p._id === id)[0] || null;
      return Observable.of(player);
    });
    // return this.http.get<Player>(`/api/players/${id}`)
    //   .catch((error: any) => {
    //     if (error.status === 404) {
    //       return Observable.of(null);
    //     }
    //     Observable.throw(error);
    //   });
  }
}
