/**
 * @fileoverview Storage module for data persistence
 * @module storage
 */

/**
 * Storage class for managing data persistence
 */
export class Storage {
  /**
   * Create storage instance
   * @param {Object} options - Storage options
   * @param {string} options.prefix - Key prefix
   * @param {Storage} options.storage - Storage implementation (default: localStorage)
   */
  constructor(options = {}) {
    this.prefix = options.prefix || 'htmlppt_';
    this.storage = options.storage || window.localStorage;
  }

  /**
   * Get full key with prefix
   * @param {string} key - Original key
   * @returns {string} Full key
   */
  getKey(key) {
    return `${this.prefix}${key}`;
  }

  /**
   * Set item
   * @param {string} key - Key
   * @param {*} value - Value
   * @returns {boolean} Success status
   */
  setItem(key, value) {
    try {
      const serialized = JSON.stringify(value);
      this.storage.setItem(this.getKey(key), serialized);
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      return false;
    }
  }

  /**
   * Get item
   * @param {string} key - Key
   * @param {*} defaultValue - Default value if not found
   * @returns {*} Value or default
   */
  getItem(key, defaultValue = null) {
    try {
      const serialized = this.storage.getItem(this.getKey(key));
      if (serialized === null) {
        return defaultValue;
      }
      return JSON.parse(serialized);
    } catch (error) {
      console.error('Storage get error:', error);
      return defaultValue;
    }
  }

  /**
   * Remove item
   * @param {string} key - Key
   * @returns {boolean} Success status
   */
  removeItem(key) {
    try {
      this.storage.removeItem(this.getKey(key));
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  }

  /**
   * Clear all items with prefix
   * @returns {boolean} Success status
   */
  clear() {
    try {
      const keys = this.getKeys();
      keys.forEach((key) => this.storage.removeItem(key));
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  }

  /**
   * Get all keys with prefix
   * @returns {Array<string>} Keys
   */
  getKeys() {
    const keys = [];
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key && key.startsWith(this.prefix)) {
        keys.push(key);
      }
    }
    return keys;
  }

  /**
   * Check if key exists
   * @param {string} key - Key
   * @returns {boolean} Exists status
   */
  hasItem(key) {
    return this.storage.getItem(this.getKey(key)) !== null;
  }

  /**
   * Get storage size
   * @returns {number} Size in bytes
   */
  getSize() {
    let size = 0;
    const keys = this.getKeys();
    keys.forEach((key) => {
      const value = this.storage.getItem(key);
      if (value) {
        size += key.length + value.length;
      }
    });
    return size;
  }

  /**
   * Get storage usage percentage
   * @returns {number} Usage percentage (0-100)
   */
  getUsagePercentage() {
    const size = this.getSize();
    const maxSize = 5 * 1024 * 1024; // 5MB typical limit
    return (size / maxSize) * 100;
  }
}

/**
 * ProjectStorage class for managing project data
 */
export class ProjectStorage extends Storage {
  /**
   * Create project storage instance
   * @param {Object} options - Storage options
   */
  constructor(options = {}) {
    super({ ...options, prefix: 'htmlppt_project_' });
  }

  /**
   * Save project data
   * @param {Object} projectData - Project data
   * @returns {boolean} Success status
   */
  saveProject(projectData) {
    return this.setItem('data', projectData);
  }

  /**
   * Load project data
   * @param {Object} defaultValue - Default value
   * @returns {Object} Project data
   */
  loadProject(defaultValue = null) {
    return this.getItem('data', defaultValue);
  }

  /**
   * Save project metadata
   * @param {Object} metadata - Metadata
   * @returns {boolean} Success status
   */
  saveMetadata(metadata) {
    return this.setItem('metadata', metadata);
  }

  /**
   * Load project metadata
   * @param {Object} defaultValue - Default value
   * @returns {Object} Metadata
   */
  loadMetadata(defaultValue = null) {
    return this.getItem('metadata', defaultValue);
  }

  /**
   * Get all projects
   * @returns {Array<Object>} Projects
   */
  getProjects() {
    const keys = this.getKeys();
    const projects = [];
    keys.forEach((key) => {
      const data = this.getItem(key.replace(this.prefix, ''));
      if (data) {
        projects.push(data);
      }
    });
    return projects;
  }

  /**
   * Delete project
   * @param {string} projectId - Project ID
   * @returns {boolean} Success status
   */
  deleteProject(projectId) {
    return this.removeItem(projectId);
  }
}

/**
 * AutoSave class for automatic saving
 */
export class AutoSave {
  /**
   * Create auto save instance
   * @param {Object} options - Auto save options
   * @param {Function} options.saveFn - Save function
   * @param {number} options.interval - Save interval (ms)
   * @param {boolean} options.enabled - Enable auto save
   */
  constructor(options = {}) {
    this.saveFn = options.saveFn || (() => {});
    this.interval = options.interval || 30000;
    this.enabled = options.enabled !== false;
    this.timer = null;
    this.lastSaveTime = null;
  }

  /**
   * Start auto save
   */
  start() {
    if (this.enabled && !this.timer) {
      this.timer = setInterval(() => this.save(), this.interval);
    }
  }

  /**
   * Stop auto save
   */
  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  /**
   * Save immediately
   * @returns {Promise<boolean>} Success status
   */
  async save() {
    try {
      await this.saveFn();
      this.lastSaveTime = new Date();
      return true;
    } catch (error) {
      console.error('Auto save error:', error);
      return false;
    }
  }

  /**
   * Enable auto save
   */
  enable() {
    this.enabled = true;
    this.start();
  }

  /**
   * Disable auto save
   */
  disable() {
    this.enabled = false;
    this.stop();
  }

  /**
   * Toggle auto save
   */
  toggle() {
    if (this.enabled) {
      this.disable();
    } else {
      this.enable();
    }
  }

  /**
   * Check if auto save is enabled
   * @returns {boolean} Enabled status
   */
  isEnabled() {
    return this.enabled;
  }

  /**
   * Get last save time
   * @returns {Date|null} Last save time
   */
  getLastSaveTime() {
    return this.lastSaveTime;
  }

  /**
   * Set save interval
   * @param {number} interval - New interval (ms)
   */
  setInterval(interval) {
    this.interval = interval;
    if (this.enabled) {
      this.stop();
      this.start();
    }
  }

  /**
   * Destroy auto save
   */
  destroy() {
    this.stop();
    this.saveFn = null;
  }
}
