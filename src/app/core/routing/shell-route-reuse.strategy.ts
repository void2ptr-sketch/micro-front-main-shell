import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';

@Injectable()
export class ShellRouteReuseStrategy implements RouteReuseStrategy {
  shouldDetach(): boolean {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- RouteReuseStrategy interface
  store(_route: ActivatedRouteSnapshot, _handle: DetachedRouteHandle | null): void {
    // Shell never caches detached routes.
  }

  shouldAttach(): boolean {
    return false;
  }

  retrieve(): DetachedRouteHandle | null {
    return null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
    if (future.routeConfig !== current.routeConfig) {
      return false;
    }

    const futureChildPath = future.firstChild?.routeConfig?.path ?? '';
    const currentChildPath = current.firstChild?.routeConfig?.path ?? '';

    if (futureChildPath !== currentChildPath) {
      return false;
    }

    const futureGrandchildPath = future.firstChild?.firstChild?.routeConfig?.path ?? '';
    const currentGrandchildPath = current.firstChild?.firstChild?.routeConfig?.path ?? '';

    return futureGrandchildPath === currentGrandchildPath;
  }
}
