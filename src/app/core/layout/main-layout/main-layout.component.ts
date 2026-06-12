import { Component, ElementRef, inject, OnDestroy, signal, viewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { effect } from '@angular/core';
import { filter } from 'rxjs';

import { AppStateService } from '../../services/app-state.service';
import {
  cleanupAllRemoteShellArtifacts,
  cleanupRemoteShellArtifacts,
  resolvePersonalProfileFeature,
  resolveShellContentSegment,
  type ShellContentSegment,
} from '../shell-remote-cleanup';
import type { PersonalProfileRoutePath } from '../../../features/personal-profile/personal-profile.paths';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, MatSnackBarModule, HeaderComponent, NavigationComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnDestroy {
  private readonly appState = inject(AppStateService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  private readonly contentRef = viewChild.required<ElementRef<HTMLElement>>('content');

  readonly outletReady = signal(true);
  readonly activeContentSegment = signal<ShellContentSegment>(
    resolveShellContentSegment(this.router.url),
  );

  private activeSegment = resolveShellContentSegment(this.router.url);
  private activeProfileFeature: PersonalProfileRoutePath | null = resolvePersonalProfileFeature(
    this.router.url,
  );
  private refreshToken = 0;

  private readonly navigationSubscription = this.router.events
    .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe((event) => {
      this.handleNavigation(event.urlAfterRedirects);
    });

  constructor() {
    effect(() => {
      const error = this.appState.error();
      if (error) {
        this.snackBar.open(error, 'Закрыть', { duration: 5000 });
        this.appState.clearError();
      }
    });
  }

  ngOnDestroy(): void {
    this.navigationSubscription.unsubscribe();
    cleanupAllRemoteShellArtifacts();
  }

  onOutletActivate(): void {
    this.resetContentScroll();
  }

  private handleNavigation(url: string): void {
    cleanupRemoteShellArtifacts(url);

    const nextSegment = resolveShellContentSegment(url);
    const nextProfileFeature = resolvePersonalProfileFeature(url);

    if (nextSegment === this.activeSegment) {
      if (
        nextSegment === 'profile' &&
        nextProfileFeature !== null &&
        nextProfileFeature !== this.activeProfileFeature
      ) {
        this.activeProfileFeature = nextProfileFeature;
        window.setTimeout(() => {
          this.purgeProfileOutletOrphans();
          window.requestAnimationFrame(() => this.purgeProfileOutletOrphans());
        }, 0);
      }

      this.resetContentScroll();
      return;
    }

    const previousSegment = this.activeSegment;
    this.activeSegment = nextSegment;
    this.activeProfileFeature = nextProfileFeature;
    this.activeContentSegment.set(nextSegment);
    cleanupAllRemoteShellArtifacts();

    const leavingRemoteForHome =
      nextSegment === 'home' &&
      (previousSegment === 'profile' || previousSegment === 'cloudberry');

    if (leavingRemoteForHome) {
      this.refreshOutlet();
    }

    this.resetContentScroll();
  }

  private purgeProfileOutletOrphans(): void {
    const outletWrapper = this.contentRef().nativeElement.querySelector('.layout__outlet');

    if (!(outletWrapper instanceof HTMLElement)) {
      return;
    }

    const shells = Array.from(
      outletWrapper.querySelectorAll(':scope > app-personal-profile-remote-shell'),
    );

    for (const [index, shell] of shells.entries()) {
      if (!(shell instanceof HTMLElement)) {
        continue;
      }

      const isActive = index === shells.length - 1;
      shell.style.display = isActive ? '' : 'none';
      shell.toggleAttribute('aria-hidden', !isActive);
    }
  }

  private refreshOutlet(): void {
    this.outletReady.set(false);
    this.purgeContentHost();
    const targetUrl = this.router.url;
    const token = ++this.refreshToken;

    window.setTimeout(() => {
      if (token !== this.refreshToken) {
        return;
      }

      this.outletReady.set(true);

      window.setTimeout(() => {
        if (token !== this.refreshToken) {
          return;
        }

        void this.router.navigateByUrl(targetUrl, { onSameUrlNavigation: 'reload' });
      }, 0);
    }, 0);
  }

  /** Routed views are inserted as siblings of router-outlet; purge stale DOM after rapid segment switches. */
  private purgeContentHost(): void {
    const host = this.contentRef().nativeElement;

    for (const node of Array.from(host.childNodes)) {
      host.removeChild(node);
    }
  }

  private resetContentScroll(): void {
    this.contentRef().nativeElement.scrollTop = 0;
  }
}
