export const environment = {
  production: true,
  apiUrl: '/api',
  appName: 'Micro Front Main Shell',
  remoteEntries: {
    cloudberry: '/cloudberry/remoteEntry.json',
    'personal-profile': '/profile/remoteEntry.json',
  },
} as const;

export type Environment = typeof environment;
