/**
 * @fileoverview History module for undo/redo functionality
 * @module history
 */

/**
 * History class for managing undo/redo operations
 */
export class History {
  /**
   * Create history instance
   * @param {Object} options - History options
   * @param {number} options.maxSize - Maximum history size
   */
  constructor(options = {}) {
    this.maxSize = options.maxSize || 50;
    this.stack = [];
    this.currentIndex = -1;
    this.listeners = {};
  }

  /**
   * Push state to history
   * @param {*} state - State to push
   */
  push(state) {
    // Remove any states after current index
    this.stack = this.stack.slice(0, this.currentIndex + 1);

    // Add new state
    this.stack.push(state);
    this.currentIndex++;

    // Limit stack size
    if (this.stack.length > this.maxSize) {
      this.stack.shift();
      this.currentIndex--;
    }

    this.emit('push', state);
  }

  /**
   * Undo last operation
   * @returns {*} Previous state or null
   */
  undo() {
    if (this.canUndo()) {
      this.currentIndex--;
      const state = this.stack[this.currentIndex];
      this.emit('undo', state);
      return state;
    }
    return null;
  }

  /**
   * Redo last undone operation
   * @returns {*} Next state or null
   */
  redo() {
    if (this.canRedo()) {
      this.currentIndex++;
      const state = this.stack[this.currentIndex];
      this.emit('redo', state);
      return state;
    }
    return null;
  }

  /**
   * Check if can undo
   * @returns {boolean} Can undo status
   */
  canUndo() {
    return this.currentIndex > 0;
  }

  /**
   * Check if can redo
   * @returns {boolean} Can redo status
   */
  canRedo() {
    return this.currentIndex < this.stack.length - 1;
  }

  /**
   * Get current state
   * @returns {*} Current state or null
   */
  getCurrent() {
    return this.stack[this.currentIndex] || null;
  }

  /**
   * Get previous state
   * @returns {*} Previous state or null
   */
  getPrevious() {
    if (this.canUndo()) {
      return this.stack[this.currentIndex - 1];
    }
    return null;
  }

  /**
   * Get next state
   * @returns {*} Next state or null
   */
  getNext() {
    if (this.canRedo()) {
      return this.stack[this.currentIndex + 1];
    }
    return null;
  }

  /**
   * Clear history
   */
  clear() {
    this.stack = [];
    this.currentIndex = -1;
    this.emit('clear');
  }

  /**
   * Get history size
   * @returns {number} History size
   */
  size() {
    return this.stack.length;
  }

  /**
   * Get all states
   * @returns {Array} All states
   */
  getAll() {
    return [...this.stack];
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
   * Remove all event listeners
   */
  removeAllListeners() {
    this.listeners = {};
  }

  /**
   * Destroy history
   */
  destroy() {
    this.clear();
    this.removeAllListeners();
  }
}

/**
 * Command class for command pattern
 */
export class Command {
  /**
   * Create command
   * @param {Function} execute - Execute function
   * @param {Function} undo - Undo function
   */
  constructor(execute, undo) {
    this.execute = execute;
    this.undo = undo;
  }

  /**
   * Execute command
   * @returns {*} Result
   */
  run() {
    return this.execute();
  }

  /**
   * Undo command
   * @returns {*} Result
   */
  revert() {
    return this.undo();
  }
}

/**
 * CommandHistory class for command-based history
 */
export class CommandHistory extends History {
  /**
   * Create command history
   * @param {Object} options - History options
   */
  constructor(options = {}) {
    super(options);
    this.commands = [];
  }

  /**
   * Execute command
   * @param {Command} command - Command to execute
   * @returns {*} Result
   */
  execute(command) {
    const result = command.run();
    this.commands.push(command);
    this.push({
      type: 'command',
      command: command,
      result: result,
    });
    return result;
  }

  /**
   * Undo last command
   * @returns {*} Result
   */
  undo() {
    const state = super.undo();
    if (state && state.type === 'command') {
      return state.command.revert();
    }
    return null;
  }

  /**
   * Redo last undone command
   * @returns {*} Result
   */
  redo() {
    const state = super.redo();
    if (state && state.type === 'command') {
      return state.command.run();
    }
    return null;
  }
}
