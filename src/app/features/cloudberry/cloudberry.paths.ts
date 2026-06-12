/** Path segments exposed by Cloudberry remote (must match AppRoutePath in cloudberry). */
export const CloudberryRoutePath = {
  dashboard: 'dashboard',
  connections: 'connections',
  budgets: 'budgets',
  reports: 'reports',
  costs: 'costs',
  profile: 'profile',
} as const;

export type CloudberryRoutePath =
  (typeof CloudberryRoutePath)[keyof typeof CloudberryRoutePath];

export const CLOUDBERRY_BASE_PATH = '/cloudberry';

export const cloudberryPath = (segment: CloudberryRoutePath): string =>
  `${CLOUDBERRY_BASE_PATH}/${segment}`;
