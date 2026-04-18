/**
 * @fileoverview Theme management module
 * @module theme
 */

/**
 * Theme class for managing themes
 */
export class Theme {
  /**
   * Create theme instance
   * @param {Object} options - Theme options
   * @param {string} options.name - Theme name
   * @param {Object} options.colors - Color palette
   * @param {Object} options.fonts - Font settings
   * @param {Object} options.spacing - Spacing settings
   */
  constructor(options = {}) {
    this.name = options.name || 'default';
    this.colors = options.colors || {};
    this.fonts = options.fonts || {};
    this.spacing = options.spacing || {};
    this.customProperties = options.customProperties || {};
  }

  /**
   * Apply theme to document
   */
  apply() {
    const root = document.documentElement;

    // Apply colors
    Object.entries(this.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    // Apply fonts
    Object.entries(this.fonts).forEach(([key, value]) => {
      root.style.setProperty(`--font-${key}`, value);
    });

    // Apply spacing
    Object.entries(this.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });

    // Apply custom properties
    Object.entries(this.customProperties).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    // Set data attribute
    root.setAttribute('data-theme', this.name);
  }

  /**
   * Remove theme from document
   */
  remove() {
    const root = document.documentElement;
    root.removeAttribute('data-theme');

    // Remove all custom properties
    const allProperties = [
      ...Object.keys(this.colors),
      ...Object.keys(this.fonts).map((k) => `font-${k}`),
      ...Object.keys(this.spacing).map((k) => `spacing-${k}`),
      ...Object.keys(this.customProperties),
    ];

    allProperties.forEach((prop) => {
      root.style.removeProperty(`--${prop}`);
    });
  }

  /**
   * Convert theme to CSS variables
   * @returns {string} CSS string
   */
  toCSS() {
    let css = `[data-theme="${this.name}"] {\n`;

    Object.entries(this.colors).forEach(([key, value]) => {
      css += `  --${key}: ${value};\n`;
    });

    Object.entries(this.fonts).forEach(([key, value]) => {
      css += `  --font-${key}: ${value};\n`;
    });

    Object.entries(this.spacing).forEach(([key, value]) => {
      css += `  --spacing-${key}: ${value};\n`;
    });

    Object.entries(this.customProperties).forEach(([key, value]) => {
      css += `  --${key}: ${value};\n`;
    });

    css += '}';
    return css;
  }

  /**
   * Convert theme to plain object
   * @returns {Object} Plain object
   */
  toJSON() {
    return {
      name: this.name,
      colors: this.colors,
      fonts: this.fonts,
      spacing: this.spacing,
      customProperties: this.customProperties,
    };
  }

  /**
   * Create theme from plain object
   * @param {Object} data - Plain object data
   * @returns {Theme} Theme instance
   */
  static fromJSON(data) {
    return new Theme(data);
  }
}

/**
 * ThemeManager class for managing multiple themes
 */
export class ThemeManager {
  /**
   * Create theme manager
   * @param {Object} options - Theme manager options
   */
  constructor(options = {}) {
    this.themes = new Map();
    this.currentTheme = null;
    this.defaultTheme = options.defaultTheme || 'light';
    this.listeners = {};

    // Register default themes
    this.registerDefaultThemes();
  }

  /**
   * Register default themes
   */
  registerDefaultThemes() {
    // Light theme
    this.register(
      'light',
      new Theme({
        name: 'light',
        colors: {
          'primary-color': '#4a6fa5',
          'primary-light': '#7a9dc9',
          'primary-dark': '#1e456c',
          'secondary-color': '#6e9cd2',
          'bg-color': '#f5f5f7',
          'sidebar-bg': '#2b2d42',
          'slide-bg': '#ffffff',
          'border-color': '#dee2e6',
          'text-color': '#333333',
          'code-bg': '#f8f9fa',
          'panel-header-bg': '#4a6fa5',
          'panel-header-color': '#ffffff',
        },
        fonts: {
          heading: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
          body: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
          code: 'Monaco, Consolas, monospace',
        },
        spacing: {
          small: '0.5rem',
          medium: '1rem',
          large: '2rem',
        },
      })
    );

    // Dark theme
    this.register(
      'dark',
      new Theme({
        name: 'dark',
        colors: {
          'primary-color': '#6e9cd2',
          'primary-light': '#9fc3e9',
          'primary-dark': '#3a5e8a',
          'secondary-color': '#8ab6d6',
          'bg-color': '#1a1c23',
          'sidebar-bg': '#2b2d42',
          'slide-bg': '#2d3047',
          'border-color': '#3a3e5b',
          'text-color': '#e9e9ec',
          'code-bg': '#252838',
          'panel-header-bg': '#3a3e5b',
          'panel-header-color': '#e9e9ec',
        },
        fonts: {
          heading: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
          body: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
          code: 'Monaco, Consolas, monospace',
        },
        spacing: {
          small: '0.5rem',
          medium: '1rem',
          large: '2rem',
        },
      })
    );
  }

  /**
   * Register theme
   * @param {string} name - Theme name
   * @param {Theme} theme - Theme instance
   */
  register(name, theme) {
    this.themes.set(name, theme);
    this.emit('register', name, theme);
  }

  /**
   * Unregister theme
   * @param {string} name - Theme name
   */
  unregister(name) {
    this.themes.delete(name);
    this.emit('unregister', name);
  }

  /**
   * Get theme
   * @param {string} name - Theme name
   * @returns {Theme|null} Theme or null
   */
  getTheme(name) {
    return this.themes.get(name) || null;
  }

  /**
   * Get all themes
   * @returns {Array<Theme>} All themes
   */
  getAllThemes() {
    return Array.from(this.themes.values());
  }

  /**
   * Get theme names
   * @returns {Array<string>} Theme names
   */
  getThemeNames() {
    return Array.from(this.themes.keys());
  }

  /**
   * Set current theme
   * @param {string} name - Theme name
   * @returns {boolean} Success status
   */
  setTheme(name) {
    const theme = this.getTheme(name);
    if (theme) {
      // Remove current theme
      if (this.currentTheme) {
        this.currentTheme.remove();
      }

      // Apply new theme
      theme.apply();
      this.currentTheme = theme;

      // Save to localStorage
      this.saveThemePreference(name);

      this.emit('change', name, theme);
      return true;
    }
    return false;
  }

  /**
   * Get current theme
   * @returns {Theme|null} Current theme or null
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Get current theme name
   * @returns {string|null} Current theme name or null
   */
  getCurrentThemeName() {
    return this.currentTheme?.name || null;
  }

  /**
   * Toggle between light and dark theme
   * @returns {string} New theme name
   */
  toggleTheme() {
    const currentName = this.getCurrentThemeName();
    const newName = currentName === 'light' ? 'dark' : 'light';
    this.setTheme(newName);
    return newName;
  }

  /**
   * Save theme preference to localStorage
   * @param {string} name - Theme name
   */
  saveThemePreference(name) {
    try {
      localStorage.setItem('htmlppt_theme', name);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  }

  /**
   * Load theme preference from localStorage
   * @returns {string|null} Theme name or null
   */
  loadThemePreference() {
    try {
      return localStorage.getItem('htmlppt_theme');
    } catch (error) {
      console.error('Failed to load theme preference:', error);
      return null;
    }
  }

  /**
   * Initialize theme from preference
   */
  initialize() {
    const savedTheme = this.loadThemePreference();
    const themeName = savedTheme || this.defaultTheme;
    this.setTheme(themeName);
  }

  /**
   * Add event listener
   * @param {string} event - Event name
   * @param {Function} callback - Callback function
   */
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  /**
   * Remove event listener
   * @param {string} event - Event name
   * @param {Function} callback - Callback function
   */
  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
    }
  }

  /**
   * Emit event
   * @param {string} event - Event name
   * @param {*} data - Event data
   */
  emit(event, ...data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(...data));
    }
  }

  /**
   * Remove all event listeners
   */
  removeAllListeners() {
    this.listeners = {};
  }

  /**
   * Destroy theme manager
   */
  destroy() {
    if (this.currentTheme) {
      this.currentTheme.remove();
    }
    this.themes.clear();
    this.removeAllListeners();
  }
}
