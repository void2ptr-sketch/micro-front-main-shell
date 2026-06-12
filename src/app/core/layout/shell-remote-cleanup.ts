import {
  PersonalProfileRoutePath,
  type PersonalProfileRoutePath as PersonalProfileFeatureSegment,
} from '../../features/personal-profile/personal-profile.paths';

const CLOUDBERRY_THEME_BODY_CLASSES = [
  'theme-prod',
  'theme-dev',
  'theme-test',
  'theme-lt',
  'theme-preprod',
] as const;

export const PERSONAL_PROFILE_ROUTE_PREFIX = '/profile';

export const CLOUDBERRY_ROUTE_PREFIX = '/cloudberry';

export type ShellContentSegment = 'home' | 'cloudberry' | 'profile';

export const resolveShellContentSegment = (url: string): ShellContentSegment => {
  const path = url.split('?')[0]?.split('#')[0] ?? '';

  if (path.startsWith(CLOUDBERRY_ROUTE_PREFIX)) {
    return 'cloudberry';
  }

  if (path.startsWith(PERSONAL_PROFILE_ROUTE_PREFIX)) {
    return 'profile';
  }

  return 'home';
};

export const resolvePersonalProfileFeature = (url: string): PersonalProfileFeatureSegment | null => {
  const path = url.split('?')[0]?.split('#')[0] ?? '';

  if (!path.startsWith(PERSONAL_PROFILE_ROUTE_PREFIX)) {
    return null;
  }

  const segments = path.split('/').filter(Boolean);
  const profileIndex = segments.indexOf('profile');
  const feature = segments[profileIndex + 1];
  const knownFeatures = Object.values(PersonalProfileRoutePath);

  if (feature && knownFeatures.includes(feature as PersonalProfileFeatureSegment)) {
    return feature as PersonalProfileFeatureSegment;
  }

  return PersonalProfileRoutePath.userInfo;
};

/** Federation may mount routed views as siblings of router-outlet; remove stale nodes. */
export const purgeRouterOutletSiblings = (
  container: HTMLElement,
  keepHostTags: readonly string[] = [],
): void => {
  const keptHostNodes: HTMLElement[] = [];
  const nodesToRemove: ChildNode[] = [];

  for (const node of Array.from(container.childNodes)) {
    if (node.nodeName.toLowerCase() === 'router-outlet') {
      continue;
    }

    if (node instanceof HTMLElement && keepHostTags.length > 0) {
      const tag = node.tagName.toLowerCase();
      if (keepHostTags.some((hostTag) => tag.includes(hostTag))) {
        keptHostNodes.push(node);
        continue;
      }
    }

    nodesToRemove.push(node);
  }

  for (const node of nodesToRemove) {
    container.removeChild(node);
  }

  // Hide stale federation shells instead of detaching them; removeChild breaks follow-up navigations.
  for (const staleShell of keptHostNodes.slice(0, -1)) {
    staleShell.style.display = 'none';
    staleShell.setAttribute('aria-hidden', 'true');
  }

  const activeShell = keptHostNodes.at(-1);
  if (activeShell instanceof HTMLElement) {
    activeShell.style.removeProperty('display');
    activeShell.removeAttribute('aria-hidden');
  }
};

export const cleanupPersonalProfileShellArtifacts = (): void => {
  document.documentElement.removeAttribute('data-theme');
};

export const cleanupCloudberryShellArtifacts = (): void => {
  document.body.classList.remove(...CLOUDBERRY_THEME_BODY_CLASSES);
};

export const cleanupAllRemoteShellArtifacts = (): void => {
  cleanupPersonalProfileShellArtifacts();
  cleanupCloudberryShellArtifacts();
};

export const cleanupRemoteShellArtifacts = (url: string): void => {
  if (!url.startsWith(PERSONAL_PROFILE_ROUTE_PREFIX)) {
    cleanupPersonalProfileShellArtifacts();
  }

  if (!url.startsWith(CLOUDBERRY_ROUTE_PREFIX)) {
    cleanupCloudberryShellArtifacts();
  }
};
