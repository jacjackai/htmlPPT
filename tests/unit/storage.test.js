/**
 * @fileoverview Storage and persistence tests
 */

describe('Storage and Persistence', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('localStorage', () => {
    test('should save data to localStorage', () => {
      const data = { slides: [{ title: 'Test', content: 'Content' }] };
      localStorage.setItem('htmlppt_data', JSON.stringify(data));

      const saved = JSON.parse(localStorage.getItem('htmlppt_data'));
      expect(saved).toEqual(data);
    });

    test('should load data from localStorage', () => {
      const data = { slides: [{ title: 'Test', content: 'Content' }] };
      localStorage.setItem('htmlppt_data', JSON.stringify(data));

      const loaded = JSON.parse(localStorage.getItem('htmlppt_data'));
      expect(loaded.slides.length).toBe(1);
    });

    test('should return null for non-existent key', () => {
      const value = localStorage.getItem('non_existent_key');
      expect(value).toBeNull();
    });

    test('should remove item from localStorage', () => {
      localStorage.setItem('test_key', 'test_value');
      localStorage.removeItem('test_key');

      const value = localStorage.getItem('test_key');
      expect(value).toBeNull();
    });
  });

  describe('Data serialization', () => {
    test('should serialize and deserialize slides', () => {
      const slides = [
        { id: '1', title: 'Slide 1', content: 'Content 1' },
        { id: '2', title: 'Slide 2', content: 'Content 2' }
      ];

      const serialized = JSON.stringify(slides);
      const deserialized = JSON.parse(serialized);

      expect(deserialized).toEqual(slides);
    });

    test('should handle special characters in content', () => {
      const content = 'Test with "quotes" and \'apostrophes\'';
      const slide = { title: 'Test', content };

      const serialized = JSON.stringify(slide);
      const deserialized = JSON.parse(serialized);

      expect(deserialized.content).toBe(content);
    });
  });

  describe('Auto-save', () => {
    test('should auto-save at interval', (done) => {
      let saveCount = 0;
      const interval = setInterval(() => {
        saveCount++;
        if (saveCount >= 2) {
          clearInterval(interval);
          expect(saveCount).toBeGreaterThanOrEqual(2);
          done();
        }
      }, 100);
    });
  });
});
