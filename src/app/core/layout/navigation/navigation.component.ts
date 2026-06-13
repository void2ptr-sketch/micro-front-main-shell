import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { filter } from 'rxjs';

import {
  resolveShellContentSegment,
  type ShellContentSegment,
} from '../shell-remote-cleanup';
import { CLOUDBERRY_NAV_ITEMS, PERSONAL_PROFILE_NAV_ITEMS } from './navigation.types';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatListModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  private readonly router = inject(Router);

  readonly activeSegment = signal<ShellContentSegment>(
    resolveShellContentSegment(this.router.url),
  );

  readonly cloudberryNavItems = CLOUDBERRY_NAV_ITEMS;
  readonly personalProfileNavItems = PERSONAL_PROFILE_NAV_ITEMS;

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.activeSegment.set(resolveShellContentSegment(event.urlAfterRedirects));
      });
  }
}
