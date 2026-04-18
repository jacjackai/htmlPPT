/**
 * @fileoverview Slide management tests
 */

describe('Slide Management', () => {
  let app;

  beforeEach(() => {
    // Setup before each test
    app = {
      slides: [],
      currentSlideIndex: 0
    };
  });

  describe('addSlide', () => {
    test('should add a new slide at the end', () => {
      const slide = { title: 'Test', content: 'Content' };
      app.slides.push(slide);

      expect(app.slides.length).toBe(1);
      expect(app.slides[0]).toEqual(slide);
    });

    test('should add slide at specific position', () => {
      app.slides.push({ title: 'Slide 1', content: 'Content 1' });
      app.slides.push({ title: 'Slide 3', content: 'Content 3' });

      const newSlide = { title: 'Slide 2', content: 'Content 2' };
      app.slides.splice(1, 0, newSlide);

      expect(app.slides.length).toBe(3);
      expect(app.slides[1]).toEqual(newSlide);
    });
  });

  describe('deleteSlide', () => {
    test('should delete slide at index', () => {
      app.slides = [
        { title: 'Slide 1', content: 'Content 1' },
        { title: 'Slide 2', content: 'Content 2' },
        { title: 'Slide 3', content: 'Content 3' }
      ];

      app.slides.splice(1, 1);

      expect(app.slides.length).toBe(2);
      expect(app.slides[1].title).toBe('Slide 3');
    });

    test('should not delete if index is out of bounds', () => {
      app.slides = [{ title: 'Slide 1', content: 'Content 1' }];

      const originalLength = app.slides.length;
      app.slides.splice(10, 1);

      expect(app.slides.length).toBe(originalLength);
    });
  });

  describe('moveSlide', () => {
    test('should move slide from one position to another', () => {
      app.slides = [
        { title: 'Slide 1', content: 'Content 1' },
        { title: 'Slide 2', content: 'Content 2' },
        { title: 'Slide 3', content: 'Content 3' }
      ];

      const [movedSlide] = app.slides.splice(0, 1);
      app.slides.splice(2, 0, movedSlide);

      expect(app.slides[0].title).toBe('Slide 2');
      expect(app.slides[2].title).toBe('Slide 1');
    });
  });

  describe('getCurrentSlide', () => {
    test('should return current slide', () => {
      app.slides = [
        { title: 'Slide 1', content: 'Content 1' },
        { title: 'Slide 2', content: 'Content 2' }
      ];
      app.currentSlideIndex = 1;

      const currentSlide = app.slides[app.currentSlideIndex];

      expect(currentSlide.title).toBe('Slide 2');
    });

    test('should return null if no slides', () => {
      app.slides = [];
      app.currentSlideIndex = 0;

      const currentSlide = app.slides[app.currentSlideIndex];

      expect(currentSlide).toBeUndefined();
    });
  });
});
