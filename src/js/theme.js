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
    this.defaultTheme = options.defaultTheme || 'dark';
    this.listeners = {};

    // Register default themes
    this.registerDefaultThemes();
  }

  /**
   * Register default themes
   */
  registerDefaultThemes() {
    // Light theme - Bright and cheerful with golden buttons
    this.register(
      'light',
      new Theme({
        name: 'light',
        colors: {
          'primary-color': '#ffd700', /* Golden yellow */
          'primary-light': '#ffed4e',
          'primary-dark': '#e6c200',
          'secondary-color': '#ffcc00',
          'bg-color': '#f5f5f7',
          'sidebar-bg': '#2b2d42',
          'slide-bg': '#ffffff',
          'border-color': '#dee2e6',
          'text-color': '#333333',
          'text-secondary': '#666666',
          'code-bg': '#f8f9fa',
          'panel-header-bg': '#ffd700',
          'panel-header-color': '#1f2937',
          'btn-color': '#ffd700', /* Golden buttons */
          'btn-color-dark': '#e6c200', /* Darker gold for hover */
          'btn-text-color': '#1f2937', /* Dark gray text for contrast */
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

    // Dark theme - Elegant dark with indigo buttons
    this.register(
      'dark',
      new Theme({
        name: 'dark',
        colors: {
          'primary-color': '#6366f1', /* Indigo */
          'primary-light': '#818cf8',
          'primary-dark': '#4f46e5',
          'secondary-color': '#8b5cf6', /* Purple accent */
          'bg-color': '#121212',
          'sidebar-bg': '#1e1e1e',
          'slide-bg': '#181818',
          'border-color': '#333333',
          'text-color': '#e0e0e0',
          'text-secondary': '#a0a0a0',
          'code-bg': '#1e1e1e',
          'panel-header-bg': '#2a2a2a',
          'panel-header-color': '#e0e0e0',
          'btn-color': '#6366f1', /* Indigo buttons */
          'btn-color-dark': '#4f46e5', /* Darker indigo for hover */
          'btn-text-color': '#ffffff', /* White text for contrast */
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

    // Business theme - Professional blue with matching buttons
    this.register(
      'business',
      new Theme({
        name: 'business',
        colors: {
          'primary-color': '#1a365d', /* Dark blue */
          'primary-light': '#2c5282',
          'primary-dark': '#102a4e',
          'secondary-color': '#2b6cb0',
          'bg-color': '#f7fafc',
          'sidebar-bg': '#1a365d',
          'slide-bg': '#ffffff',
          'border-color': '#e2e8f0',
          'text-color': '#2d3748',
          'text-secondary': '#718096',
          'code-bg': '#edf2f7',
          'panel-header-bg': '#1a365d',
          'panel-header-color': '#ffffff',
          'btn-color': '#2b6cb0', /* Business blue buttons */
          'btn-color-dark': '#1a365d', /* Darker blue for hover */
          'btn-text-color': '#ffffff', /* White text for contrast */
        },
        fonts: {
          heading: 'Georgia, "Times New Roman", Times, serif',
          body: 'Arial, Helvetica, sans-serif',
          code: '"Courier New", Courier, monospace',
        },
        spacing: {
          xs: '0.25rem',
          sm: '0.5rem',
          md: '1rem',
          lg: '1.5rem',
          xl: '2rem',
          xxl: '3rem',
        },
      })
    );

    // Creative theme - Vibrant purple with matching buttons
    this.register(
      'creative',
      new Theme({
        name: 'creative',
        colors: {
          'primary-color': '#9b59b6', /* Purple */
          'primary-light': '#bb7bd1',
          'primary-dark': '#7d3c98',
          'secondary-color': '#e74c3c',
          'bg-color': '#fdf2f8',
          'sidebar-bg': '#9b59b6',
          'slide-bg': '#ffffff',
          'border-color': '#f3d9fa',
          'text-color': '#5a3e6b',
          'text-secondary': '#a0a0a0',
          'code-bg': '#f8f0fc',
          'panel-header-bg': '#9b59b6',
          'panel-header-color': '#ffffff',
          'btn-color': '#9b59b6', /* Purple buttons */
          'btn-color-dark': '#7d3c98', /* Darker purple for hover */
          'btn-text-color': '#ffffff', /* White text for contrast */
        },
        fonts: {
          heading: '"Comic Sans MS", cursive, sans-serif',
          body: 'Arial, Helvetica, sans-serif',
          code: '"Courier New", Courier, monospace',
        },
        spacing: {
          xs: '0.25rem',
          sm: '0.5rem',
          md: '1rem',
          lg: '1.5rem',
          xl: '2rem',
          xxl: '3rem',
        },
      })
    );

    // Minimal theme - Clean white with subtle gray buttons
    this.register(
      'minimal',
      new Theme({
        name: 'minimal',
        colors: {
          'primary-color': '#6c757d', /* Gray */
          'primary-light': '#adb5bd',
          'primary-dark': '#495057',
          'secondary-color': '#f5f5f5',
          'bg-color': '#ffffff',
          'sidebar-bg': '#f8f9fa',
          'slide-bg': '#ffffff',
          'border-color': '#e9ecef',
          'text-color': '#212529',
          'text-secondary': '#6c757d',
          'code-bg': '#f8f9fa',
          'panel-header-bg': '#e9ecef',
          'panel-header-color': '#212529',
          'btn-color': '#6c757d', /* Gray buttons */
          'btn-color-dark': '#495057', /* Darker gray for hover */
          'btn-text-color': '#ffffff', /* White text for contrast */
        },
        fonts: {
          heading: 'Helvetica, Arial, sans-serif',
          body: 'Helvetica, Arial, sans-serif',
          code: '"Courier New", Courier, monospace',
        },
        spacing: {
          xs: '0.25rem',
          sm: '0.5rem',
          md: '1rem',
          lg: '1.5rem',
          xl: '2rem',
          xxl: '3rem',
        },
      })
    );

    // Ocean theme - Sky blue with matching buttons
    this.register(
      'ocean',
      new Theme({
        name: 'ocean',
        colors: {
          'primary-color': '#29b6f6', /* Sky blue */
          'primary-light': '#4fc3f7',
          'primary-dark': '#0288d1',
          'secondary-color': '#4fc3f7',
          'bg-color': '#e3f2fd',
          'sidebar-bg': '#29b6f6',
          'slide-bg': '#ffffff',
          'border-color': '#90caf9',
          'text-color': '#0d47a1',
          'text-secondary': '#5472d3',
          'code-bg': '#e3f2fd',
          'panel-header-bg': '#1565c0',
          'panel-header-color': '#ffffff',
          'btn-color': '#29b6f6', /* Sky blue buttons */
          'btn-color-dark': '#0288d1', /* Darker blue for hover */
          'btn-text-color': '#ffffff', /* White text for contrast */
        },
        fonts: {
          heading: 'Georgia, "Times New Roman", Times, serif',
          body: 'Arial, Helvetica, sans-serif',
          code: '"Courier New", Courier, monospace',
        },
        spacing: {
          xs: '0.25rem',
          sm: '0.5rem',
          md: '1rem',
          lg: '1.5rem',
          xl: '2rem',
          xxl: '3rem',
        },
      })
    );

    // Forest theme - Nature green with matching buttons
    this.register(
      'forest',
      new Theme({
        name: 'forest',
        colors: {
          'primary-color': '#388e3c', /* Green */
          'primary-light': '#4caf50',
          'primary-dark': '#1b5e20',
          'secondary-color': '#66bb6a',
          'bg-color': '#e8f5e9',
          'sidebar-bg': '#388e3c',
          'slide-bg': '#ffffff',
          'border-color': '#c8e6c9',
          'text-color': '#1b5e20',
          'text-secondary': '#558b2f',
          'code-bg': '#f1f8e9',
          'panel-header-bg': '#2e7d32',
          'panel-header-color': '#ffffff',
          'btn-color': '#4caf50', /* Green buttons */
          'btn-color-dark': '#2e7d32', /* Darker green for hover */
          'btn-text-color': '#ffffff', /* White text for contrast */
        },
        fonts: {
          heading: 'Georgia, "Times New Roman", Times, serif',
          body: 'Arial, Helvetica, sans-serif',
          code: '"Courier New", Courier, monospace',
        },
        spacing: {
          xs: '0.25rem',
          sm: '0.5rem',
          md: '1rem',
          lg: '1.5rem',
          xl: '2rem',
          xxl: '3rem',
        },
      })
    );

    // Sunset theme - Warm orange with matching buttons
    this.register(
      'sunset',
      new Theme({
        name: 'sunset',
        colors: {
          'primary-color': '#ff8f00', /* Orange */
          'primary-light': '#ff9800',
          'primary-dark': '#e65100',
          'secondary-color': '#ff8a65',
          'bg-color': '#fff8e1',
          'sidebar-bg': '#ff8f00',
          'slide-bg': '#ffffff',
          'border-color': '#ffcc80',
          'text-color': '#e65100',
          'text-secondary': '#f57c00',
          'code-bg': '#fff3e0',
          'panel-header-bg': '#f57c00',
          'panel-header-color': '#ffffff',
          'btn-color': '#ff8f00', /* Orange buttons */
          'btn-color-dark': '#e65100', /* Darker orange for hover */
          'btn-text-color': '#ffffff', /* White text for contrast */
        },
        fonts: {
          heading: 'Georgia, "Times New Roman", Times, serif',
          body: 'Arial, Helvetica, sans-serif',
          code: '"Courier New", Courier, monospace',
        },
        spacing: {
          xs: '0.25rem',
          sm: '0.5rem',
          md: '1rem',
          lg: '1.5rem',
          xl: '2rem',
          xxl: '3rem',
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
