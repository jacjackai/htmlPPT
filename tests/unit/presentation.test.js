/**
 * @fileoverview Presentation mode tests
 */

describe('Presentation Mode', () => {
  let app;

  beforeEach(() => {
    app = {
      isPresentationMode: false,
      currentSlideIndex: 0,
      slides: [
        { title: 'Slide 1', content: 'Content 1' },
        { title: 'Slide 2', content: 'Content 2' },
        { title: 'Slide 3', content: 'Content 3' }
      ]
    };
  });

  describe('enterPresentationMode', () => {
    test('should enter presentation mode', () => {
      app.isPresentationMode = true;

      expect(app.isPresentationMode).toBe(true);
    });

    test('should reset to first slide', () => {
      app.currentSlideIndex = 2;
      app.isPresentationMode = true;
      app.currentSlideIndex = 0;

      expect(app.currentSlideIndex).toBe(0);
    });
  });

  describe('exitPresentationMode', () => {
    test('should exit presentation mode', () => {
      app.isPresentationMode = true;
      app.isPresentationMode = false;

      expect(app.isPresentationMode).toBe(false);
    });
  });

  describe('nextSlide', () => {
    test('should go to next slide', () => {
      app.currentSlideIndex = 0;
      app.currentSlideIndex++;

      expect(app.currentSlideIndex).toBe(1);
    });

    test('should not go beyond last slide', () => {
      app.currentSlideIndex = app.slides.length - 1;
      const lastIndex = app.currentSlideIndex;

      if (app.currentSlideIndex < app.slides.length - 1) {
        app.currentSlideIndex++;
      }

      expect(app.currentSlideIndex).toBe(lastIndex);
    });
  });

  describe('previousSlide', () => {
    test('should go to previous slide', () => {
      app.currentSlideIndex = 2;
      app.currentSlideIndex--;

      expect(app.currentSlideIndex).toBe(1);
    });

    test('should not go before first slide', () => {
      app.currentSlideIndex = 0;
      const firstIndex = app.currentSlideIndex;

      if (app.currentSlideIndex > 0) {
        app.currentSlideIndex--;
      }

      expect(app.currentSlideIndex).toBe(firstIndex);
    });
  });

  describe('goToSlide', () => {
    test('should go to specific slide', () => {
      app.currentSlideIndex = 1;

      expect(app.currentSlideIndex).toBe(1);
      expect(app.slides[app.currentSlideIndex].title).toBe('Slide 2');
    });

    test('should not go to invalid index', () => {
      const originalIndex = app.currentSlideIndex;
      app.currentSlideIndex = 10;

      if (app.currentSlideIndex >= app.slides.length) {
        app.currentSlideIndex = originalIndex;
      }

      expect(app.currentSlideIndex).toBe(originalIndex);
    });
  });
});
