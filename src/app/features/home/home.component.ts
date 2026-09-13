import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-home',
    imports: [MatCardModule],
    templateUrl: './home.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './home.component.scss',
})
export class HomeComponent {
    readonly appName = environment.appName;
    readonly remoteEntries = Object.keys(environment.remoteEntries);
}
