/**
 * @fileoverview Theme module tests
 */

describe('Theme', () => {
  let Theme, ThemeManager;

  beforeEach(() => {
    const themeModule = require('../../src/js/theme.js');
    Theme = themeModule.Theme;
    ThemeManager = themeModule.ThemeManager;
  });

  describe('Theme class', () => {
    test('should create theme with default options', () => {
      const theme = new Theme();
      expect(theme.name).toBe('default');
      expect(theme.colors).toEqual({});
    });

    test('should create theme with custom options', () => {
      const theme = new Theme({
        name: 'ocean',
        colors: { 'primary-color': '#0077be' },
        fonts: { heading: 'Arial' },
      });
      expect(theme.name).toBe('ocean');
      expect(theme.colors['primary-color']).toBe('#0077be');
    });

    test('should apply theme to document', () => {
      const theme = new Theme({
        name: 'test',
        colors: { 'primary-color': '#ff0000' },
      });
      theme.apply();
      expect(document.documentElement.getAttribute('data-theme')).toBe('test');
      theme.remove();
    });

    test('should remove theme from document', () => {
      const theme = new Theme({ name: 'removable' });
      theme.apply();
      theme.remove();
      expect(document.documentElement.getAttribute('data-theme')).toBeNull();
    });

    test('should generate CSS string', () => {
      const theme = new Theme({
        name: 'css-test',
        colors: { 'primary-color': '#123456' },
      });
      const css = theme.toCSS();
      expect(css).toContain('[data-theme="css-test"]');
      expect(css).toContain('--primary-color: #123456');
    });
  });

  describe('ThemeManager', () => {
    let manager;

    beforeEach(() => {
      manager = new ThemeManager();
    });

    afterEach(() => {
      manager.destroy();
    });

    test('should create ThemeManager', () => {
      expect(manager).toBeDefined();
    });

    test('should set and get current theme', () => {
      manager.setTheme('light');
      expect(manager.getCurrentThemeName()).toBe('light');
    });

    test('should toggle between light and dark', () => {
      manager.setTheme('light');
      manager.toggle();
      expect(manager.getCurrentThemeName()).toBe('dark');
      manager.toggle();
      expect(manager.getCurrentThemeName()).toBe('light');
    });
  });
});
