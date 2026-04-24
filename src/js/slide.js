/**
 * @fileoverview Slide management module
 * @module slide
 */

/**
 * Slide class representing a single slide
 */
export class Slide {
  /**
   * Create a new slide
   * @param {Object} options - Slide options
   * @param {string} options.title - Slide title
   * @param {string} options.content - Slide content
   * @param {string} options.theme - Slide theme
   */
  constructor({ title = '', content = '', theme = null } = {}) {
    this.id = this.generateId();
    this.title = title;
    this.content = content;
    this.theme = theme;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Generate unique ID for slide
   * @returns {string} Unique ID
   */
  generateId() {
    return `slide_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Update slide content
   * @param {Object} updates - Updates to apply
   */
  update(updates) {
    Object.assign(this, updates);
    this.updatedAt = new Date();
  }

  /**
   * Convert slide to plain object
   * @returns {Object} Plain object representation
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      theme: this.theme,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Create slide from plain object
   * @param {Object} data - Plain object data
   * @returns {Slide} Slide instance
   */
  static fromJSON(data) {
    const slide = new Slide();
    Object.assign(slide, data);
    return slide;
  }
}

/**
 * SlideManager class for managing multiple slides
 */
export class SlideManager {
  /**
   * Create slide manager
   * @param {Array<Slide>} slides - Initial slides
   */
  constructor(slides = []) {
    this.slides = slides;
    this.currentSlideIndex = 0;
  }

  /**
   * Get all slides
   * @returns {Array<Slide>} All slides
   */
  getSlides() {
    return this.slides;
  }

  /**
   * Get current slide
   * @returns {Slide|null} Current slide or null
   */
  getCurrentSlide() {
    return this.slides[this.currentSlideIndex] || null;
  }

  /**
   * Get current slide index
   * @returns {number} Current slide index
   */
  getCurrentSlideIndex() {
    return this.currentSlideIndex;
  }

  /**
   * Set current slide index
   * @param {number} index - New current slide index
   */
  setCurrentSlideIndex(index) {
    if (index >= 0 && index < this.slides.length) {
      this.currentSlideIndex = index;
    }
  }

  /**
   * Add new slide
   * @param {Object} options - Slide options
   * @param {number} position - Position to insert (default: end)
   * @returns {Slide} Created slide
   */
  addSlide(options = {}, position = null) {
    const slide = new Slide(options);

    if (position !== null && position >= 0 && position <= this.slides.length) {
      this.slides.splice(position, 0, slide);
    } else {
      this.slides.push(slide);
    }

    return slide;
  }

  /**
   * Update slide at index
   * @param {number} index - Slide index
   * @param {Object} updates - Updates to apply
   * @returns {Slide|null} Updated slide or null
   */
  updateSlide(index, updates) {
    const slide = this.slides[index];
    if (slide) {
      slide.update(updates);
      return slide;
    }
    return null;
  }

  /**
   * Delete slide at index
   * @param {number} index - Slide index
   * @returns {Slide|null} Deleted slide or null
   */
  deleteSlide(index) {
    if (index >= 0 && index < this.slides.length) {
      return this.slides.splice(index, 1)[0];
    }
    return null;
  }

  /**
   * Move slide from one position to another
   * @param {number} fromIndex - Source index
   * @param {number} toIndex - Target index
   * @returns {boolean} Success status
   */
  moveSlide(fromIndex, toIndex) {
    if (
      fromIndex >= 0 &&
      fromIndex < this.slides.length &&
      toIndex >= 0 &&
      toIndex < this.slides.length &&
      fromIndex !== toIndex
    ) {
      const [slide] = this.slides.splice(fromIndex, 1);
      this.slides.splice(toIndex, 0, slide);
      return true;
    }
    return false;
  }

  /**
   * Switch to slide at index
   * @param {number} index - Slide index
   * @returns {boolean} Success status
   */
  switchToSlide(index) {
    if (index >= 0 && index < this.slides.length) {
      this.currentSlideIndex = index;
      return true;
    }
    return false;
  }

  /**
   * Get slide at index
   * @param {number} index - Slide index
   * @returns {Slide|null} Slide or null
   */
  getSlide(index) {
    return this.slides[index] || null;
  }

  /**
   * Get slide count
   * @returns {number} Number of slides
   */
  getSlideCount() {
    return this.slides.length;
  }

  /**
   * Clear all slides
   */
  clear() {
    this.slides = [];
    this.currentSlideIndex = 0;
  }

  /**
   * Convert manager to plain object
   * @returns {Object} Plain object representation
   */
  toJSON() {
    return {
      slides: this.slides.map((slide) => slide.toJSON()),
      currentSlideIndex: this.currentSlideIndex,
    };
  }

  /**
   * Create manager from plain object
   * @param {Object} data - Plain object data
   * @returns {SlideManager} SlideManager instance
   */
  static fromJSON(data) {
    const slides = (data.slides || []).map((slideData) => Slide.fromJSON(slideData));
    const manager = new SlideManager(slides);
    manager.currentSlideIndex = data.currentSlideIndex || 0;
    return manager;
  }
}
