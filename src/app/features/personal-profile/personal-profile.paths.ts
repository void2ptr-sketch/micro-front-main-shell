/** Path segments exposed by Personal Profile remote. */
export const PersonalProfileRoutePath = {
  home: 'home',
  security: 'security',
  locale: 'locale',
  theme: 'theme',
} as const;

export type PersonalProfileRoutePath =
  (typeof PersonalProfileRoutePath)[keyof typeof PersonalProfileRoutePath];

export const PERSONAL_PROFILE_BASE_PATH = '/profile';

export const personalProfilePath = (segment: PersonalProfileRoutePath): string =>
  `${PERSONAL_PROFILE_BASE_PATH}/${segment}`;
