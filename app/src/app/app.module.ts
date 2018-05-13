import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MatchCardComponent } from './components/match-card/match-card.component';
import { PlayerCardComponent } from './components/player-card/player-card.component';
import { GamesFormatPipe } from './pipes/games-format.pipe';
import { SetsFormatPipe } from './pipes/sets-format.pipe';
import { MatchService } from './services/match.service';
import { PlayerService } from './services/player.service';
import { AboutComponent } from './views/about/about.component';
import { HomeComponent } from './views/home/home.component';
import { MatchDetailComponent } from './views/match-detail/match-detail.component';
import { MatchesComponent } from './views/matches/matches.component';
import { PlayerDetailComponent } from './views/player-detail/player-detail.component';
import { PlayersComponent } from './views/players/players.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { MatchListComponent } from './components/match-list/match-list.component';

const appRoutes: Routes = [{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
}, {
  path: 'home',
  component: HomeComponent
}, {
  path: 'matches',
  component: MatchesComponent
}, {
  path: 'matches/:id',
  component: MatchDetailComponent
}, {
  path: 'players',
  component: PlayersComponent
}, {
  path: 'players/:id',
  component: PlayerDetailComponent
}];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MatchesComponent,
    PlayersComponent,
    PlayerDetailComponent,
    MatchDetailComponent,
    AboutComponent,
    PlayerCardComponent,
    MatchCardComponent,
    SetsFormatPipe,
    GamesFormatPipe,
    PlayerListComponent,
    MatchListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    PlayerService,
    MatchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
