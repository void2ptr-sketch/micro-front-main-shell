import {
  CLOUDBERRY_BASE_PATH,
  cloudberryPath,
  CloudberryRoutePath,
} from '../../../features/cloudberry/cloudberry.paths';
import {
  PERSONAL_PROFILE_BASE_PATH,
  personalProfilePath,
  PersonalProfileRoutePath,
} from '../../../features/personal-profile/personal-profile.paths';

export type NavItem = {
  label: string;
  path: string;
  icon: string;
};

export const SHELL_NAV_ITEMS: NavItem[] = [
  { label: 'Главная', path: '/', icon: 'home' },
];

export const CLOUDBERRY_NAV_ITEMS: NavItem[] = [
  { label: 'Обзор', path: cloudberryPath(CloudberryRoutePath.dashboard), icon: 'dashboard' },
  {
    label: 'Подключения',
    path: cloudberryPath(CloudberryRoutePath.connections),
    icon: 'lan',
  },
  { label: 'Бюджеты', path: cloudberryPath(CloudberryRoutePath.budgets), icon: 'savings' },
  { label: 'Отчёты', path: cloudberryPath(CloudberryRoutePath.reports), icon: 'assessment' },
  { label: 'Расходы', path: cloudberryPath(CloudberryRoutePath.costs), icon: 'payments' },
  { label: 'Профиль', path: cloudberryPath(CloudberryRoutePath.profile), icon: 'person' },
];

export const PERSONAL_PROFILE_NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: personalProfilePath(PersonalProfileRoutePath.userInfo), icon: 'account_circle' },
  {
    label: 'Безопасность',
    path: personalProfilePath(PersonalProfileRoutePath.security),
    icon: 'lock',
  },
  { label: 'Язык', path: personalProfilePath(PersonalProfileRoutePath.locale), icon: 'translate' },
  { label: 'Оформление', path: personalProfilePath(PersonalProfileRoutePath.theme), icon: 'palette' },
];

/** @deprecated Use grouped nav item constants */
export const NAV_ITEMS: NavItem[] = [
  ...SHELL_NAV_ITEMS,
  ...CLOUDBERRY_NAV_ITEMS,
  ...PERSONAL_PROFILE_NAV_ITEMS,
];

export const isCloudberryPath = (path: string): boolean => path.startsWith(CLOUDBERRY_BASE_PATH);

export const isPersonalProfilePath = (path: string): boolean =>
  path.startsWith(PERSONAL_PROFILE_BASE_PATH);
