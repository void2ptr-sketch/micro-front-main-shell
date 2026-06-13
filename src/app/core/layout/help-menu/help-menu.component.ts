import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { HELP_MENU_ITEMS } from './help-menu.types';

@Component({
  selector: 'app-help-menu',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, RouterLink, RouterLinkActive],
  templateUrl: './help-menu.component.html',
  styleUrl: './help-menu.component.scss',
})
export class HelpMenuComponent {
  readonly menuItems = HELP_MENU_ITEMS;
}
