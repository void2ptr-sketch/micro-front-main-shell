import { resolveMainMenuItems } from './main-menu.types';

describe('resolveMainMenuItems', () => {
    it('returns registered remote applications', () => {
        const items = resolveMainMenuItems();

        expect(items.length).toBeGreaterThan(0);
        expect(items.some((item) => item.id === 'cloudberry')).toBe(true);
        expect(items.some((item) => item.id === 'personal-profile')).toBe(true);
    });
});
