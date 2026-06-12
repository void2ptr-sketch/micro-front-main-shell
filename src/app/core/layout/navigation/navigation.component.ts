import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { CLOUDBERRY_NAV_ITEMS, SHELL_NAV_ITEMS } from './navigation.types';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatListModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  readonly shellNavItems = SHELL_NAV_ITEMS;
  readonly cloudberryNavItems = CLOUDBERRY_NAV_ITEMS;
}
