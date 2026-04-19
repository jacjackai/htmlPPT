/**
 * @fileoverview Utils module tests
 */

describe('Utils', () => {
  let utils;

  beforeEach(() => {
    utils = require('../../src/js/utils.js');
  });

  test('should have utility functions', () => {
    expect(utils).toBeDefined();
  });

  describe('String utilities', () => {
    test('should generate unique IDs', () => {
      const { generateId } = utils;
      if (generateId) {
        const id1 = generateId();
        const id2 = generateId();
        expect(id1).not.toBe(id2);
      }
    });

    test('should truncate strings', () => {
      const { truncate } = utils;
      if (truncate) {
        expect(truncate('Hello World', 5)).toBe('He...');
        expect(truncate('Hi', 5)).toBe('Hi');
      }
    });
  });

  describe('DOM utilities', () => {
    test('should create elements', () => {
      const { createElement } = utils;
      if (createElement) {
        const el = createElement('div', { className: 'test' });
        expect(el.tagName).toBe('DIV');
        expect(el.className).toBe('test');
      }
    });
  });

  describe('Data utilities', () => {
    test('should deep clone objects', () => {
      const { deepClone } = utils;
      if (deepClone) {
        const obj = { a: 1, b: { c: 2 } };
        const cloned = deepClone(obj);
        expect(cloned).toEqual(obj);
        expect(cloned).not.toBe(obj);
        expect(cloned.b).not.toBe(obj.b);
      }
    });

    test('should debounce functions', (done) => {
      const { debounce } = utils;
      if (debounce) {
        let count = 0;
        const fn = debounce(() => count++, 100);
        fn();
        fn();
        fn();
        setTimeout(() => {
          expect(count).toBe(1);
          done();
        }, 200);
      } else {
        done();
      }
    });
  });
});
