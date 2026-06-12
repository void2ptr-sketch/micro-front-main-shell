import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private readonly loadingCount = signal(0);
  private readonly errorMessage = signal<string | null>(null);

  readonly isLoading = computed(() => this.loadingCount() > 0);
  readonly error = this.errorMessage.asReadonly();

  startLoading(): void {
    this.loadingCount.update((count) => count + 1);
  }

  stopLoading(): void {
    this.loadingCount.update((count) => Math.max(0, count - 1));
  }

  setError(message: string | null): void {
    this.errorMessage.set(message);
  }

  clearError(): void {
    this.errorMessage.set(null);
  }
}
