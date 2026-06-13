import { HELP_MENU_ITEMS } from './help-menu.types';

describe('HELP_MENU_ITEMS', () => {
  it('contains home entry', () => {
    expect(HELP_MENU_ITEMS).toEqual([
      jasmine.objectContaining({ label: 'Главная', path: '/', icon: 'home' }),
    ]);
  });
});
