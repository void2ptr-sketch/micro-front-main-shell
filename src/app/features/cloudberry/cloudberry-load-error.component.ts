import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-cloudberry-load-error',
  imports: [MatCardModule],
  template: `
    <mat-card class="cloudberry-error">
      <mat-card-title>Cloudberry недоступен</mat-card-title>
      <mat-card-content>
        <p>Не удалось загрузить remote-приложение.</p>
        <p>Запустите Cloudberry в отдельном терминале:</p>
        <pre>cd micro-front-cloudberry && npm start</pre>
        <p>Затем обновите страницу. Remote: http://localhost:4201/remoteEntry.json</p>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    .cloudberry-error pre {
      padding: 0.75rem;
      background: color-mix(in srgb, currentColor 6%, transparent);
      overflow: auto;
    }
  `,
})
export class CloudberryLoadErrorComponent {}
