import {
  CLOUDBERRY_BASE_PATH,
  cloudberryPath,
  CloudberryRoutePath,
} from '../../../features/cloudberry/cloudberry.paths';

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

/** @deprecated Use SHELL_NAV_ITEMS + CLOUDBERRY_NAV_ITEMS */
export const NAV_ITEMS: NavItem[] = [...SHELL_NAV_ITEMS, ...CLOUDBERRY_NAV_ITEMS];

export const isCloudberryPath = (path: string): boolean => path.startsWith(CLOUDBERRY_BASE_PATH);
