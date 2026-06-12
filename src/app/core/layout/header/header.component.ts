import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { environment } from '../../../../environments/environment';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly appName = environment.appName;
  readonly appState = inject(AppStateService);
}
