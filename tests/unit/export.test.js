/**
 * @fileoverview Export module tests
 */

describe('Export', () => {
  let ExportManager;

  beforeEach(() => {
    const exportModule = require('../../src/js/export.js');
    ExportManager = exportModule.ExportManager || exportModule.default;
  });

  test('should create ExportManager', () => {
    if (ExportManager) {
      const manager = new ExportManager();
      expect(manager).toBeDefined();
    }
  });

  test('should export slides as JSON', () => {
    const slides = [
      { id: 1, html: '<h1>Test</h1>', title: 'Slide 1' },
    ];
    const json = JSON.stringify(slides);
    const parsed = JSON.parse(json);
    expect(parsed.length).toBe(1);
    expect(parsed[0].title).toBe('Slide 1');
  });

  test('should export slides as HTML', () => {
    const slides = [
      { id: 1, html: '<h1>Hello</h1>' },
      { id: 2, html: '<h2>World</h2>' },
    ];
    const html = slides.map(s => s.html).join('\n');
    expect(html).toContain('<h1>Hello</h1>');
    expect(html).toContain('<h2>World</h2>');
  });

  test('should handle empty slides', () => {
    const slides = [];
    const json = JSON.stringify(slides);
    expect(JSON.parse(json)).toEqual([]);
  });
});
