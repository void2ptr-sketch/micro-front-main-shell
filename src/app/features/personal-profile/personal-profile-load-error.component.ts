import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-personal-profile-load-error',
  imports: [MatCardModule],
  template: `
    <mat-card class="personal-profile-error">
      <mat-card-title>Personal Profile недоступен</mat-card-title>
      <mat-card-content>
        <p>Не удалось загрузить remote-приложение.</p>
        <p>Запустите Personal Profile в отдельном терминале:</p>
        <pre>cd micro-front-personal-profile && npm start</pre>
        <p>Затем обновите страницу. Remote: http://localhost:4202/remoteEntry.json</p>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    .personal-profile-error pre {
      padding: 0.75rem;
      background: color-mix(in srgb, currentColor 6%, transparent);
      overflow: auto;
    }
  `,
})
export class PersonalProfileLoadErrorComponent {}
