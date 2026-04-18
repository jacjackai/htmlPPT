/**
 * @fileoverview Presentation mode module
 * @module presentation
 */

/**
 * Presentation class for managing presentation mode
 */
export class Presentation {
  /**
   * Create presentation instance
   * @param {Object} options - Presentation options
   * @param {Array} options.slides - Slides to present
   * @param {number} options.startIndex - Starting slide index
   * @param {boolean} options.autoPlay - Auto play mode
   * @param {number} options.interval - Auto play interval (ms)
   * @param {boolean} options.loop - Loop presentation
   */
  constructor(options = {}) {
    this.slides = options.slides || [];
    this.currentIndex = options.startIndex || 0;
    this.autoPlay = options.autoPlay || false;
    this.interval = options.interval || 5000;
    this.loop = options.loop || false;
    this.isActive = false;
    this.timer = null;
    this.listeners = {};
  }

  /**
   * Start presentation
   * @param {number} startIndex - Starting slide index
   */
  start(startIndex = 0) {
    this.currentIndex = startIndex;
    this.isActive = true;
    this.emit('start', this.currentIndex);

    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  /**
   * Stop presentation
   */
  stop() {
    this.isActive = false;
    this.stopAutoPlay();
    this.emit('end');
  }

  /**
   * Go to next slide
   * @returns {boolean} Success status
   */
  next() {
    if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex++;
      this.emit('change', this.currentIndex);
      return true;
    } else if (this.loop) {
      this.currentIndex = 0;
      this.emit('change', this.currentIndex);
      return true;
    }
    return false;
  }

  /**
   * Go to previous slide
   * @returns {boolean} Success status
   */
  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.emit('change', this.currentIndex);
      return true;
    } else if (this.loop) {
      this.currentIndex = this.slides.length - 1;
      this.emit('change', this.currentIndex);
      return true;
    }
    return false;
  }

  /**
   * Go to specific slide
   * @param {number} index - Slide index
   * @returns {boolean} Success status
   */
  goTo(index) {
    if (index >= 0 && index < this.slides.length) {
      this.currentIndex = index;
      this.emit('change', this.currentIndex);
      return true;
    }
    return false;
  }

  /**
   * Go to first slide
   * @returns {boolean} Success status
   */
  first() {
    return this.goTo(0);
  }

  /**
   * Go to last slide
   * @returns {boolean} Success status
   */
  last() {
    return this.goTo(this.slides.length - 1);
  }

  /**
   * Get current slide
   * @returns {Object|null} Current slide or null
   */
  getCurrentSlide() {
    return this.slides[this.currentIndex] || null;
  }

  /**
   * Get current slide index
   * @returns {number} Current slide index
   */
  getCurrentIndex() {
    return this.currentIndex;
  }

  /**
   * Get total slide count
   * @returns {number} Total slide count
   */
  getSlideCount() {
    return this.slides.length;
  }

  /**
   * Check if presentation is active
   * @returns {boolean} Active status
   */
  isPresentationActive() {
    return this.isActive;
  }

  /**
   * Start auto play
   */
  startAutoPlay() {
    this.stopAutoPlay();
    this.timer = setInterval(() => {
      if (!this.next() && !this.loop) {
        this.stop();
      }
    }, this.interval);
  }

  /**
   * Stop auto play
   */
  stopAutoPlay() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  /**
   * Toggle auto play
   */
  toggleAutoPlay() {
    if (this.timer) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
  }

  /**
   * Update slides
   * @param {Array} slides - New slides
   */
  updateSlides(slides) {
    this.slides = slides;
    if (this.currentIndex >= this.slides.length) {
      this.currentIndex = Math.max(0, this.slides.length - 1);
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
   * Remove all event listeners
   */
  removeAllListeners() {
    this.listeners = {};
  }

  /**
   * Destroy presentation
   */
  destroy() {
    this.stop();
    this.removeAllListeners();
    this.slides = [];
    this.currentIndex = 0;
  }
}

/**
 * PresentationController class for controlling presentation UI
 */
export class PresentationController {
  /**
   * Create presentation controller
   * @param {Presentation} presentation - Presentation instance
   * @param {Object} elements - DOM elements
   */
  constructor(presentation, elements = {}) {
    this.presentation = presentation;
    this.elements = elements;
    this.bindEvents();
  }

  /**
   * Bind DOM events
   */
  bindEvents() {
    // Next button
    if (this.elements.nextBtn) {
      this.elements.nextBtn.addEventListener('click', () => this.next());
    }

    // Previous button
    if (this.elements.prevBtn) {
      this.elements.prevBtn.addEventListener('click', () => this.previous());
    }

    // Exit button
    if (this.elements.exitBtn) {
      this.elements.exitBtn.addEventListener('click', () => this.exit());
    }

    // Keyboard events
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
  }

  /**
   * Handle keyboard events
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleKeydown(e) {
    if (!this.presentation.isPresentationActive()) {
      return;
    }

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ':
        e.preventDefault();
        this.next();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        this.previous();
        break;
      case 'Home':
        e.preventDefault();
        this.presentation.first();
        break;
      case 'End':
        e.preventDefault();
        this.presentation.last();
        break;
      case 'Escape':
        e.preventDefault();
        this.exit();
        break;
    }
  }

  /**
   * Go to next slide
   */
  next() {
    this.presentation.next();
    this.updateUI();
  }

  /**
   * Go to previous slide
   */
  previous() {
    this.presentation.previous();
    this.updateUI();
  }

  /**
   * Exit presentation
   */
  exit() {
    this.presentation.stop();
    this.hide();
  }

  /**
   * Update UI
   */
  updateUI() {
    const slide = this.presentation.getCurrentSlide();
    const index = this.presentation.getCurrentIndex();
    const total = this.presentation.getSlideCount();

    if (this.elements.title) {
      this.elements.title.textContent = slide?.title || '';
    }

    if (this.elements.content) {
      this.elements.content.innerHTML = slide?.content || '';
    }

    if (this.elements.pageInfo) {
      this.elements.pageInfo.textContent = `${index + 1} / ${total}`;
    }
  }

  /**
   * Show presentation
   */
  show() {
    if (this.elements.container) {
      this.elements.container.style.display = 'flex';
    }
    this.updateUI();
  }

  /**
   * Hide presentation
   */
  hide() {
    if (this.elements.container) {
      this.elements.container.style.display = 'none';
    }
  }

  /**
   * Destroy controller
   */
  destroy() {
    document.removeEventListener('keydown', this.handleKeydown);
    this.presentation.destroy();
  }
}
