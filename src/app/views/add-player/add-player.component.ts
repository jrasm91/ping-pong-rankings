import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Player } from '../../models/player.model';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
  newPlayer: Player;
  errorMessage = '';

  constructor(
    @Inject(ApiService) private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.resetPlayer();
  }

  addPlayer() {
    this.errorMessage = '';
    this.api.addPlayer(this.newPlayer).subscribe(
      player => {
        this.router.navigateByUrl('/players');
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
      });
    // this.resetPlayer();
  }

  resetPlayer() {
    this.newPlayer = {
      score: 1500,
      name: '',
      matches: []
    };
  }
}
