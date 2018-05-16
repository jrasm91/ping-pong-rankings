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
import { ApiService } from './services/api.service';
import { AboutComponent } from './views/about/about.component';
import { HomeComponent } from './views/home/home.component';
import { MatchDetailComponent } from './views/match-detail/match-detail.component';
import { MatchesComponent } from './views/matches/matches.component';
import { PlayerDetailComponent } from './views/player-detail/player-detail.component';
import { PlayersComponent } from './views/players/players.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { MatchListComponent } from './components/match-list/match-list.component';
import { ButtonAddMatchComponent } from './components/button-add-match/button-add-match.component';
import { ButtonAddPlayerComponent } from './components/button-add-player/button-add-player.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddMatchComponent } from './views/add-match/add-match.component';

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
  path: 'matches/add',
  component: AddMatchComponent
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
    MatchListComponent,
    ButtonAddMatchComponent,
    ButtonAddPlayerComponent,
    FooterComponent,
    AddMatchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
