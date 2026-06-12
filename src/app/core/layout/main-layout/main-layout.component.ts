import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { effect } from '@angular/core';

import { AppStateService } from '../../services/app-state.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, MatSnackBarModule, HeaderComponent, NavigationComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  private readonly appState = inject(AppStateService);
  private readonly snackBar = inject(MatSnackBar);

  constructor() {
    effect(() => {
      const error = this.appState.error();
      if (error) {
        this.snackBar.open(error, 'Закрыть', { duration: 5000 });
        this.appState.clearError();
      }
    });
  }
}
