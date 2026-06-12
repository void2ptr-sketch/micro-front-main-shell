export type NavItem = {
  label: string;
  path: string;
  icon: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Главная', path: '/', icon: 'home' },
  { label: 'Cloudberry', path: '/cloudberry/dashboard', icon: 'cloud' },
  { label: 'Безопасность', path: '/security/change-password', icon: 'lock' },
];
