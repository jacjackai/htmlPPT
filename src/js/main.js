/**
 * @fileoverview Main application module
 * @module app
 */

import { SlideManager } from './slide.js';
import { Presentation, PresentationController } from './presentation.js';
import { ProjectStorage, AutoSave } from './storage.js';
import { History } from './history.js';
import { ThemeManager } from './theme.js';

/**
 * HTMLPPT main application class
 */
export class HTMLPPT {
  /**
   * Create HTMLPPT instance
   * @param {Object} options - Application options
   * @param {string|HTMLElement} options.container - Container selector or element
   * @param {string} options.theme - Initial theme
   * @param {boolean} options.autoSave - Enable auto save
   * @param {number} options.autoSaveInterval - Auto save interval (ms)
   * @param {number} options.maxHistory - Maximum history size
   */
  constructor(options = {}) {
    // Options
    this.options = {
      container: options.container || '#app',
      theme: options.theme || 'dark',
      autoSave: options.autoSave !== false,
      autoSaveInterval: options.autoSaveInterval || 30000,
      maxHistory: options.maxHistory || 50,
    };

    // Initialize modules
    this.slideManager = new SlideManager();
    this.themeManager = new ThemeManager({ defaultTheme: this.options.theme });
    this.storage = new ProjectStorage();
    this.history = new History({ maxSize: this.options.maxHistory });
    this.presentation = null;
    this.presentationController = null;

    // Current filename
    this.filename = options.filename || 'HTML PPT';

    // Auto save
    this.autoSave = new AutoSave({
      saveFn: () => this.save(),
      interval: this.options.autoSaveInterval,
      enabled: this.options.autoSave,
    });

    // Event listeners
    this.listeners = {};
  }

  /**
   * Initialize application
   */
  async initialize() {
    // Initialize theme
    this.themeManager.initialize();

    // Load saved data
    await this.load();

    // Setup auto save
    if (this.options.autoSave) {
      this.autoSave.start();
    }

    // Emit ready event
    this.emit('ready');
  }

  /**
   * Save current state
   * @returns {Promise<boolean>} Success status
   */
  async save() {
    try {
      const data = {
        slides: this.slideManager.toJSON(),
        theme: this.themeManager.getCurrentThemeName(),
        filename: this.filename,
        timestamp: new Date().toISOString(),
      };

      this.storage.saveProject(data);
      this.emit('save', data);
      return true;
    } catch (error) {
      console.error('Save error:', error);
      this.emit('error', error);
      return false;
    }
  }

  /**
   * Load saved state
   * @returns {Promise<boolean>} Success status
   */
  async load() {
    try {
      const data = this.storage.loadProject();

      if (data && data.slides) {
        // Restore slides
        this.slideManager = SlideManager.fromJSON(data.slides);

        // Restore theme
        if (data.theme) {
          this.themeManager.setTheme(data.theme);
        }

        this.emit('load', data);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Load error:', error);
      this.emit('error', error);
      return false;
    }
  }

  /**
   * Add new slide
   * @param {Object} options - Slide options
   * @param {number} position - Position to insert
   * @returns {Object} Created slide
   */
  addSlide(options = {}, position = null) {
    // Save current state for undo
    this.history.push(this.slideManager.toJSON());

    // Add slide
    const slide = this.slideManager.addSlide(options, position);

    // Auto save
    this.autoSave.save();

    // Emit event
    this.emit('slide:add', slide, this.slideManager.getCurrentSlideIndex());

    return slide;
  }

  /**
   * Update slide
   * @param {number} index - Slide index
   * @param {Object} updates - Updates to apply
   * @returns {Object|null} Updated slide or null
   */
  updateSlide(index, updates) {
    // Save current state for undo
    this.history.push(this.slideManager.toJSON());

    // Update slide
    const slide = this.slideManager.updateSlide(index, updates);

    if (slide) {
      // Auto save
      this.autoSave.save();

      // Emit event
      this.emit('slide:update', slide, index);
    }

    return slide;
  }

  /**
   * Delete slide
   * @param {number} index - Slide index
   * @returns {Object|null} Deleted slide or null
   */
  deleteSlide(index) {
    // Save current state for undo
    this.history.push(this.slideManager.toJSON());

    // Delete slide
    const slide = this.slideManager.deleteSlide(index);

    if (slide) {
      // Auto save
      this.autoSave.save();

      // Emit event
      this.emit('slide:delete', index);
    }

    return slide;
  }

  /**
   * Move slide
   * @param {number} fromIndex - Source index
   * @param {number} toIndex - Target index
   * @returns {boolean} Success status
   */
  moveSlide(fromIndex, toIndex) {
    // Save current state for undo
    this.history.push(this.slideManager.toJSON());

    // Move slide
    const success = this.slideManager.moveSlide(fromIndex, toIndex);

    if (success) {
      // Auto save
      this.autoSave.save();

      // Emit event
      this.emit('slide:move', fromIndex, toIndex);
    }

    return success;
  }

  /**
   * Switch to slide
   * @param {number} index - Slide index
   * @returns {boolean} Success status
   */
  switchToSlide(index) {
    const success = this.slideManager.switchToSlide(index);

    if (success) {
      this.emit('slide:change', index, this.slideManager.getCurrentSlide());
    }

    return success;
  }

  /**
   * Get current slide
   * @returns {Object|null} Current slide or null
   */
  getCurrentSlide() {
    return this.slideManager.getCurrentSlide();
  }

  /**
   * Get current slide index
   * @returns {number} Current slide index
   */
  getCurrentSlideIndex() {
    return this.slideManager.getCurrentSlideIndex();
  }

  /**
   * Get all slides
   * @returns {Array<Object>} All slides
   */
  getSlides() {
    return this.slideManager.getSlides();
  }

  /**
   * Enter presentation mode
   * @param {number} startIndex - Starting slide index
   */
  present(startIndex = 0) {
    // Create presentation instance
    this.presentation = new Presentation({
      slides: this.slideManager.getSlides(),
      startIndex: startIndex,
      autoPlay: false,
      loop: false,
    });

    // Create controller
    this.presentationController = new PresentationController(this.presentation, {
      container: document.getElementById('presentationMode'),
      title: document.getElementById('presentTitle'),
      content: document.getElementById('presentContent'),
      pageInfo: document.getElementById('presentPage'),
      nextBtn: document.getElementById('presentNext'),
      prevBtn: document.getElementById('presentPrev'),
      exitBtn: document.getElementById('presentExit'),
    });

    // Start presentation
    this.presentation.start(startIndex);
    this.presentationController.show();

    // Emit event
    this.emit('present:start', startIndex);
  }

  /**
   * Exit presentation mode
   */
  exit() {
    if (this.presentationController) {
      this.presentationController.exit();
      this.presentationController.destroy();
      this.presentationController = null;
    }

    if (this.presentation) {
      this.presentation.destroy();
      this.presentation = null;
    }

    // Emit event
    this.emit('present:end');
  }

  /**
   * Set theme
   * @param {string} theme - Theme name
   * @returns {boolean} Success status
   */
  setTheme(theme) {
    return this.themeManager.setTheme(theme);
  }

  /**
   * Get current theme
   * @returns {string|null} Current theme name or null
   */
  getTheme() {
    return this.themeManager.getCurrentThemeName();
  }

  /**
   * Toggle theme
   * @returns {string} New theme name
   */
  toggleTheme() {
    const newTheme = this.themeManager.toggleTheme();
    this.emit('theme:change', newTheme);
    return newTheme;
  }

  /**
   * Undo last operation
   * @returns {Object|null} Previous state or null
   */
  undo() {
    const state = this.history.undo();

    if (state) {
      this.slideManager = SlideManager.fromJSON(state);
      this.emit('undo', state);
    }

    return state;
  }

  /**
   * Redo last undone operation
   * @returns {Object|null} Next state or null
   */
  redo() {
    const state = this.history.redo();

    if (state) {
      this.slideManager = SlideManager.fromJSON(state);
      this.emit('redo', state);
    }

    return state;
  }

  /**
   * Check if can undo
   * @returns {boolean} Can undo status
   */
  canUndo() {
    return this.history.canUndo();
  }

  /**
   * Check if can redo
   * @returns {boolean} Can redo status
   */
  canRedo() {
    return this.history.canRedo();
  }

  /**
   * Export data
   * @param {string} format - Export format
   * @param {Object} _options - Export options (unused)
   * @returns {Promise<string>} Exported data
   */
  async export(format = 'json', _options = {}) {
    const data = {
      slides: this.slideManager.toJSON(),
      theme: this.themeManager.getCurrentThemeName(),
      filename: this.filename || 'HTML PPT',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
    };

    switch (format) {
      case 'json':
        return JSON.stringify(data, null, 2);

      case 'base64':
        return btoa(JSON.stringify(data));

      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  /**
   * Import data
   * @param {string} data - Data to import
   * @param {string} format - Data format
   * @returns {Promise<boolean>} Success status
   */
  async import(data, format = 'json') {
    try {
      let parsedData;

      switch (format) {
        case 'json':
          parsedData = typeof data === 'string' ? JSON.parse(data) : data;
          break;

        case 'base64':
          parsedData = JSON.parse(atob(data));
          break;

        default:
          throw new Error(`Unsupported import format: ${format}`);
      }

      // Restore slides
      if (parsedData.slides) {
        this.slideManager = SlideManager.fromJSON(parsedData.slides);
      }

      // Restore theme
      if (parsedData.theme) {
        this.themeManager.setTheme(parsedData.theme);
      }

      // Emit event
      this.emit('import', parsedData);

      return true;
    } catch (error) {
      console.error('Import error:', error);
      this.emit('error', error);
      return false;
    }
  }

  /**
   * Get share URL
   * @returns {string} Share URL
   */
  getShareUrl() {
    const data = {
      version: '1.0.0',
      savedAt: new Date().toISOString(),
      slides: this.slideManager.toJSON(),
      theme: this.themeManager.getCurrentThemeName(),
    };

    // Use more robust encoding to handle special characters
    const jsonString = JSON.stringify(data);
    const encoded = btoa(encodeURIComponent(jsonString));

    const url = new URL(window.location.href);
    url.searchParams.set('mode', 'presentation');
    url.searchParams.set('data', encoded);
    return url.toString();
  }

  /**
   * Load project from URL parameters
   * @param {string} data - URL data parameter
   * @returns {Promise<boolean>} Success status
   */
  async loadFromUrlParams(data) {
    try {
      // Decode URL parameter
      const decodedData = decodeURIComponent(atob(data));
      const projectData = JSON.parse(decodedData);

      // Validate data structure
      if (!projectData || !projectData.slides || !Array.isArray(projectData.slides)) {
        throw new Error('Invalid project data structure');
      }

      // Import project
      const success = await this.import(projectData, 'json');

      if (success) {
        this.emit('url:load:success', projectData);
        return true;
      }

      return false;
    } catch (error) {
      console.error('URL参数加载错误:', error);
      this.emit('url:load:error', error);
      return false;
    }
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
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(data));
    }
  }

  /**
   * Destroy application
   */
  destroy() {
    // Stop auto save
    this.autoSave.destroy();

    // Destroy modules
    this.themeManager.destroy();
    this.history.destroy();

    // Exit presentation
    this.exit();

    // Clear listeners
    this.listeners = {};
  }
}

// Export version
export const version = '1.0.0';

// Export default
export default HTMLPPT;
