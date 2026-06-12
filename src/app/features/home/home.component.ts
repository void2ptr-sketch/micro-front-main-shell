import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { environment } from '../../../environments/environment';
import { cloudberryPath, CloudberryRoutePath } from '../cloudberry/cloudberry.paths';
import {
  personalProfilePath,
  PersonalProfileRoutePath,
} from '../personal-profile/personal-profile.paths';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly appName = environment.appName;
  readonly remoteEntries = Object.keys(environment.remoteEntries);
  readonly cloudberryDashboardPath = cloudberryPath(CloudberryRoutePath.dashboard);
  readonly personalProfileUserInfoPath = personalProfilePath(PersonalProfileRoutePath.userInfo);
}
