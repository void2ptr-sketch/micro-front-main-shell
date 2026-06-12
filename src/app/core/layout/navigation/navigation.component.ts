import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { NAV_ITEMS } from './navigation.types';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatListModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  readonly navItems = NAV_ITEMS;
}
