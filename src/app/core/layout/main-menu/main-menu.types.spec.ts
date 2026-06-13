import { resolveMainMenuItems } from './main-menu.types';

describe('resolveMainMenuItems', () => {
  it('returns registered remote applications', () => {
    const items = resolveMainMenuItems();

    expect(items.length).toBeGreaterThan(0);
    expect(items.some((item) => item.id === 'cloudberry')).toBeTrue();
    expect(items.some((item) => item.id === 'personal-profile')).toBeTrue();
  });
});
