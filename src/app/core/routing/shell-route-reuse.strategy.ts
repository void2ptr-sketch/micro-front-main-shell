import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';
import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
@Injectable()
export class ShellRouteReuseStrategy implements RouteReuseStrategy {
    shouldDetach(): boolean {
    private storedRoutes = new Map<string, DetachedRouteHandle>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- RouteReuseStrategy interface
    store(_route: ActivatedRouteSnapshot, _handle: DetachedRouteHandle | null): void {
        // Shell never caches detached routes.
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        // Нет необходимости хранить маршруты
    }
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
    store(_route: ActivatedRouteSnapshot, _handle: DetachedRouteHandle | null): void {
    }
    shouldAttach(): boolean {
        const futureGrandchildPath = future.firstChild?.firstChild?.routeConfig?.path ?? '';
        const currentGrandchildPath = current.firstChild?.firstChild?.routeConfig?.path ?? '';

        return futureGrandchildPath === currentGrandchildPath;