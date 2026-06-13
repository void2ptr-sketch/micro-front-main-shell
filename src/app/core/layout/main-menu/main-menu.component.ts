import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { resolveMainMenuItems } from './main-menu.types';

@Component({
  selector: 'app-main-menu',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, RouterLink, RouterLinkActive],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent {
  readonly menuItems = resolveMainMenuItems();
}
