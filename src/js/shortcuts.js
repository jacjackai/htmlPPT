/**
 * @fileoverview Keyboard shortcuts management
 * @module shortcuts
 */

/**
 * Keyboard shortcuts configuration
 */
export const shortcuts = {
  // Global shortcuts
  global: {
    F5: 'present',
    Escape: 'exit',
    'Ctrl+S': 'save',
    'Ctrl+N': 'newSlide',
    'Ctrl+O': 'open',
    'Ctrl+E': 'export',
    'Ctrl+D': 'toggleTheme',
    'Ctrl+Z': 'undo',
    'Ctrl+Y': 'redo',
    'Ctrl+Shift+Z': 'redo',
    'Ctrl+?': 'showShortcuts',
  },

  // Editor shortcuts
  editor: {
    'Ctrl+B': 'bold',
    'Ctrl+I': 'italic',
    'Ctrl+U': 'underline',
    'Ctrl+K': 'link',
    'Ctrl+Shift+>': 'increaseFontSize',
    'Ctrl+Shift+<': 'decreaseFontSize',
  },

  // Presentation mode shortcuts
  presentation: {
    ArrowRight: 'nextSlide',
    ArrowDown: 'nextSlide',
    ArrowLeft: 'previousSlide',
    ArrowUp: 'previousSlide',
    Space: 'nextSlide',
    Enter: 'nextSlide',
    PageDown: 'nextSlide',
    PageUp: 'previousSlide',
    Home: 'firstSlide',
    End: 'lastSlide',
    Escape: 'exit',
    F11: 'toggleFullscreen',
    1: 'goToSlide1',
    2: 'goToSlide2',
    3: 'goToSlide3',
    4: 'goToSlide4',
    5: 'goToSlide5',
    6: 'goToSlide6',
    7: 'goToSlide7',
    8: 'goToSlide8',
    9: 'goToSlide9',
    0: 'goToSlide10',
  },

  // Slide navigation shortcuts
  navigation: {
    ArrowUp: 'previousSlide',
    ArrowDown: 'nextSlide',
    ArrowLeft: 'previousSlide',
    ArrowRight: 'nextSlide',
    PageUp: 'previousSlide',
    PageDown: 'nextSlide',
    Home: 'firstSlide',
    End: 'lastSlide',
  },
};

/**
 * ShortcutManager class for managing keyboard shortcuts
 */
export class ShortcutManager {
  /**
   * Create shortcut manager
   * @param {Object} options - Shortcut manager options
   * @param {Object} options.shortcuts - Custom shortcuts
   * @param {boolean} options.enabled - Enable shortcuts
   */
  constructor(options = {}) {
    this.shortcuts = { ...shortcuts, ...options.shortcuts };
    this.enabled = options.enabled !== false;
    this.handlers = {};
    this.active = true;
    this.mode = 'global'; // global, presentation, editor
    this.bindEvents();
  }

  /**
   * Bind keyboard events
   */
  bindEvents() {
    this.handleKeydown = this.handleKeydown.bind(this);
    document.addEventListener('keydown', this.handleKeydown);
  }

  /**
   * Unbind keyboard events
   */
  unbindEvents() {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  /**
   * Handle keydown event
   * @param {KeyboardEvent} event - Keyboard event
   */
  handleKeydown(event) {
    if (!this.enabled || !this.active) {
      return;
    }

    const shortcut = this.getShortcutFromEvent(event);
    if (!shortcut) {
      return;
    }

    const action = this.getAction(shortcut);
    if (action) {
      event.preventDefault();
      this.executeAction(action, event);
    }
  }

  /**
   * Get shortcut string from event
   * @param {KeyboardEvent} event - Keyboard event
   * @returns {string|null} Shortcut string or null
   */
  getShortcutFromEvent(event) {
    const parts = [];

    if (event.ctrlKey || event.metaKey) {
      parts.push('Ctrl');
    }
    if (event.altKey) {
      parts.push('Alt');
    }
    if (event.shiftKey) {
      parts.push('Shift');
    }

    // Handle special keys
    const specialKeys = {
      ' ': 'Space',
      ArrowUp: 'ArrowUp',
      ArrowDown: 'ArrowDown',
      ArrowLeft: 'ArrowLeft',
      ArrowRight: 'ArrowRight',
      Enter: 'Enter',
      Escape: 'Escape',
      Tab: 'Tab',
      Backspace: 'Backspace',
      Delete: 'Delete',
      Insert: 'Insert',
      Home: 'Home',
      End: 'End',
      PageUp: 'PageUp',
      PageDown: 'PageDown',
      F1: 'F1',
      F2: 'F2',
      F3: 'F3',
      F4: 'F4',
      F5: 'F5',
      F6: 'F6',
      F7: 'F7',
      F8: 'F8',
      F9: 'F9',
      F10: 'F10',
      F11: 'F11',
      F12: 'F12',
    };

    const key = specialKeys[event.key] || event.key;
    parts.push(key);

    return parts.join('+');
  }

  /**
   * Get action for shortcut
   * @param {string} shortcut - Shortcut string
   * @returns {string|null} Action or null
   */
  getAction(shortcut) {
    const modeShortcuts = this.shortcuts[this.mode] || {};
    return modeShortcuts[shortcut] || this.shortcuts.global[shortcut] || null;
  }

  /**
   * Execute action
   * @param {string} action - Action name
   * @param {KeyboardEvent} event - Keyboard event
   */
  executeAction(action, event) {
    if (this.handlers[action]) {
      this.handlers[action](event);
    }
  }

  /**
   * Register handler for action
   * @param {string} action - Action name
   * @param {Function} handler - Handler function
   */
  register(action, handler) {
    this.handlers[action] = handler;
  }

  /**
   * Unregister handler for action
   * @param {string} action - Action name
   */
  unregister(action) {
    delete this.handlers[action];
  }

  /**
   * Set mode
   * @param {string} mode - Mode name
   */
  setMode(mode) {
    this.mode = mode;
  }

  /**
   * Get current mode
   * @returns {string} Current mode
   */
  getMode() {
    return this.mode;
  }

  /**
   * Enable shortcuts
   */
  enable() {
    this.enabled = true;
  }

  /**
   * Disable shortcuts
   */
  disable() {
    this.enabled = false;
  }

  /**
   * Activate shortcuts
   */
  activate() {
    this.active = true;
  }

  /**
   * Deactivate shortcuts
   */
  deactivate() {
    this.active = false;
  }

  /**
   * Check if shortcuts are enabled
   * @returns {boolean} Enabled status
   */
  isEnabled() {
    return this.enabled;
  }

  /**
   * Check if shortcuts are active
   * @returns {boolean} Active status
   */
  isActive() {
    return this.active;
  }

  /**
   * Get all shortcuts for mode
   * @param {string} mode - Mode name
   * @returns {Object} Shortcuts for mode
   */
  getShortcutsForMode(mode) {
    return this.shortcuts[mode] || {};
  }

  /**
   * Get all shortcuts
   * @returns {Object} All shortcuts
   */
  getAllShortcuts() {
    return this.shortcuts;
  }

  /**
   * Add custom shortcut
   * @param {string} mode - Mode name
   * @param {string} shortcut - Shortcut string
   * @param {string} action - Action name
   */
  addShortcut(mode, shortcut, action) {
    if (!this.shortcuts[mode]) {
      this.shortcuts[mode] = {};
    }
    this.shortcuts[mode][shortcut] = action;
  }

  /**
   * Remove shortcut
   * @param {string} mode - Mode name
   * @param {string} shortcut - Shortcut string
   */
  removeShortcut(mode, shortcut) {
    if (this.shortcuts[mode]) {
      delete this.shortcuts[mode][shortcut];
    }
  }

  /**
   * Reset shortcuts to default
   */
  reset() {
    this.shortcuts = { ...shortcuts };
  }

  /**
   * Destroy shortcut manager
   */
  destroy() {
    this.unbindEvents();
    this.handlers = {};
    this.shortcuts = {};
  }
}

/**
 * Create shortcut help HTML
 * @param {Object} shortcuts - Shortcuts object
 * @returns {string} HTML string
 */
export function createShortcutHelp(shortcuts = shortcuts) {
  let html = '<div class="shortcut-help">';

  // Global shortcuts
  html += '<h3>全局快捷键</h3>';
  html += '<table class="shortcut-table">';
  html += '<thead><tr><th>快捷键</th><th>功能</th></tr></thead>';
  html += '<tbody>';

  const actionLabels = {
    present: '进入演示模式',
    exit: '退出演示模式',
    save: '保存',
    newSlide: '新建幻灯片',
    open: '打开项目',
    export: '导出项目',
    toggleTheme: '切换主题',
    undo: '撤销',
    redo: '重做',
    showShortcuts: '显示快捷键帮助',
    bold: '粗体',
    italic: '斜体',
    underline: '下划线',
    link: '插入链接',
    increaseFontSize: '增大字体',
    decreaseFontSize: '减小字体',
    nextSlide: '下一张幻灯片',
    previousSlide: '上一张幻灯片',
    firstSlide: '第一张幻灯片',
    lastSlide: '最后一张幻灯片',
    toggleFullscreen: '全屏切换',
    goToSlide1: '跳转到第1张',
    goToSlide2: '跳转到第2张',
    goToSlide3: '跳转到第3张',
    goToSlide4: '跳转到第4张',
    goToSlide5: '跳转到第5张',
    goToSlide6: '跳转到第6张',
    goToSlide7: '跳转到第7张',
    goToSlide8: '跳转到第8张',
    goToSlide9: '跳转到第9张',
    goToSlide10: '跳转到第10张',
  };

  Object.entries(shortcuts.global).forEach(([key, action]) => {
    html += `<tr><td><kbd>${key}</kbd></td><td>${actionLabels[action] || action}</td></tr>`;
  });

  html += '</tbody></table>';

  // Presentation shortcuts
  html += '<h3>演示模式快捷键</h3>';
  html += '<table class="shortcut-table">';
  html += '<thead><tr><th>快捷键</th><th>功能</th></tr></thead>';
  html += '<tbody>';

  Object.entries(shortcuts.presentation).forEach(([key, action]) => {
    html += `<tr><td><kbd>${key}</kbd></td><td>${actionLabels[action] || action}</td></tr>`;
  });

  html += '</tbody></table>';
  html += '</div>';

  return html;
}

/**
 * Get shortcut label
 * @param {string} action - Action name
 * @returns {string} Action label
 */
export function getShortcutLabel(action) {
  const labels = {
    present: '进入演示模式',
    exit: '退出演示模式',
    save: '保存',
    newSlide: '新建幻灯片',
    open: '打开项目',
    export: '导出项目',
    toggleTheme: '切换主题',
    undo: '撤销',
    redo: '重做',
    showShortcuts: '显示快捷键帮助',
    bold: '粗体',
    italic: '斜体',
    underline: '下划线',
    link: '插入链接',
    increaseFontSize: '增大字体',
    decreaseFontSize: '减小字体',
    nextSlide: '下一张幻灯片',
    previousSlide: '上一张幻灯片',
    firstSlide: '第一张幻灯片',
    lastSlide: '最后一张幻灯片',
    toggleFullscreen: '全屏切换',
  };

  return labels[action] || action;
}
