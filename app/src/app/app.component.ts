import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  routes = [{
    name: 'Home',
    link: '/home'
  }, {
    name: 'Matches',
    link: '/matches'
  }, {
    name: 'Players',
    link: '/players'
  }];
}