/**
 * @fileoverview History module tests
 */

describe('History', () => {
  let history;

  beforeEach(() => {
    const { History } = require('../../src/js/history.js');
    history = new History({ maxSize: 5 });
  });

  describe('push', () => {
  test('should add state to history', () => {
    history.push({ slides: [1] });
    history.push({ slides: [1, 2] });
    expect(history.canUndo()).toBe(true);
  });

    test('should limit history to maxSize', () => {
      for (let i = 0; i < 10; i++) {
        history.push({ slides: [i] });
      }
      // maxSize is 5, so there should be at most 5 undoable states
      let undoCount = 0;
      while (history.canUndo()) {
        history.undo();
        undoCount++;
      }
      expect(undoCount).toBeLessThanOrEqual(5);
    });
  });

  describe('undo/redo', () => {
    test('should undo to previous state', () => {
      history.push({ slides: [1] });
      history.push({ slides: [1, 2] });
      const result = history.undo();
      expect(result).toBeDefined();
      expect(history.canRedo()).toBe(true);
    });

    test('should redo to next state', () => {
      history.push({ slides: [1] });
      history.push({ slides: [1, 2] });
      history.undo();
      const result = history.redo();
      expect(result).toBeDefined();
    });

    test('should not undo when no history', () => {
      expect(history.canUndo()).toBe(false);
    });

    test('should not redo when no future states', () => {
      expect(history.canRedo()).toBe(false);
    });

    test('should clear redo stack on new push', () => {
      history.push({ slides: [1] });
      history.push({ slides: [1, 2] });
      history.undo();
      expect(history.canRedo()).toBe(true);
      history.push({ slides: [3] });
      expect(history.canRedo()).toBe(false);
    });
  });
});
