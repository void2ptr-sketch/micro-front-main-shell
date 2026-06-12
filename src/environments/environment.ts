export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  appName: 'Micro Front Main Shell',
  remoteEntries: {
    cloudberry: 'http://localhost:4201/remoteEntry.json',
  },
} as const;

export type Environment = typeof environment;
