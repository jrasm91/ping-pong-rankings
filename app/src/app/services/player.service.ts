import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Player } from '../models/player.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';

@Injectable()
export class PlayerService {

  private players = new BehaviorSubject<Array<Player>>([]);

  constructor(
    @Inject(HttpClient) private http: HttpClient
  ) {
    this.loadPlayers();
  }

  private loadPlayers() {
    this.http.get<Array<Player>>('/api/players').subscribe(players => {
      this.players.next(players);
    });
  }

  getPlayers() {
    return this.players.asObservable();
  }

  getPlayerById(id: string): Observable<any> {
    return this.http.get<any>(`/api/players/${id}`)
      .catch((error: any) => {
        if (error.status === 404) {
          return Observable.of(null);
        }
        Observable.throw(error);
      });
  }

  createPlayer(player: Player): Observable<Player> {
    return this.http.post('/api/players', player)
      .flatMap(realPlayer => {
        this.loadPlayers();
        return Observable.of(realPlayer as Player);
      });
  }
}
