/**
 * @fileoverview Application configuration
 * @module config
 */

/**
 * Default application configuration
 * @type {Object}
 */
export const APP_CONFIG = {
  // Auto save settings
  autoSave: {
    enabled: true,
    interval: 60000, // 60 seconds (adjusted from 30 seconds)
    maxRetries: 3,
    retryDelay: 5000,
  },

  // Presentation settings
  presentation: {
    autoPlay: false,
    interval: 5000,
    loop: false,
  },

  // History settings
  history: {
    maxSize: 50,
  },

  // Theme settings
  theme: {
    default: 'dark',
    persist: true,
  },

  // Notification settings
  notifications: {
    autoHide: true,
    hideDelay: 3000,
  },

  // Export settings
  export: {
    defaultFormat: 'json',
    includeMetadata: true,
  },
};

/**
 * Get configuration value
 * @param {string} path - Configuration path (dot notation)
 * @param {*} defaultValue - Default value if not found
 * @returns {*} Configuration value
 */
export function getConfig(path, defaultValue = null) {
  const keys = path.split('.');
  let value = APP_CONFIG;

  for (const key of keys) {
    if (value && Object.prototype.hasOwnProperty.call(value, key)) {
      value = value[key];
    } else {
      return defaultValue;
    }
  }

  return value;
}

/**
 * Set configuration value
 * @param {string} path - Configuration path (dot notation)
 * @param {*} value - Value to set
 */
export function setConfig(path, value) {
  const keys = path.split('.');
  let current = APP_CONFIG;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key]) {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
}

/**
 * Merge custom configuration with defaults
 * @param {Object} customConfig - Custom configuration
 * @returns {Object} Merged configuration
 */
export function mergeConfig(customConfig = {}) {
  return {
    ...APP_CONFIG,
    ...customConfig,
    autoSave: {
      ...APP_CONFIG.autoSave,
      ...customConfig.autoSave,
    },
    presentation: {
      ...APP_CONFIG.presentation,
      ...customConfig.presentation,
    },
    history: {
      ...APP_CONFIG.history,
      ...customConfig.history,
    },
    theme: {
      ...APP_CONFIG.theme,
      ...customConfig.theme,
    },
    notifications: {
      ...APP_CONFIG.notifications,
      ...customConfig.notifications,
    },
    export: {
      ...APP_CONFIG.export,
      ...customConfig.export,
    },
  };
}
