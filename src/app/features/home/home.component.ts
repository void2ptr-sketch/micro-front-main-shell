import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly appName = environment.appName;
  readonly remoteEntries = Object.keys(environment.remoteEntries);
}
