import { environment } from '../../../../environments/environment';
import {
  cloudberryPath,
  CloudberryRoutePath,
} from '../../../features/cloudberry/cloudberry.paths';
import {
  personalProfilePath,
  PersonalProfileRoutePath,
} from '../../../features/personal-profile/personal-profile.paths';

export type MainMenuRemoteId = 'cloudberry' | 'personal-profile';

export type MainMenuItem = {
  id: MainMenuRemoteId;
  label: string;
  title: string;
  path: string;
  icon: string;
};

const MAIN_MENU_CATALOG: Record<MainMenuRemoteId, Omit<MainMenuItem, 'id'>> = {
  cloudberry: {
    label: 'Cloudberry',
    title: 'FinOps / облачные расходы',
    path: cloudberryPath(CloudberryRoutePath.dashboard),
    icon: 'cloud',
  },
  'personal-profile': {
    label: 'Personal Profile',
    title: 'Профиль и настройки пользователя',
    path: personalProfilePath(PersonalProfileRoutePath.userInfo),
    icon: 'account_circle',
  },
};

export const resolveMainMenuItems = (): MainMenuItem[] =>
  (Object.keys(environment.remoteEntries) as MainMenuRemoteId[])
    .filter((id) => id in MAIN_MENU_CATALOG)
    .map((id) => ({ id, ...MAIN_MENU_CATALOG[id] }));
