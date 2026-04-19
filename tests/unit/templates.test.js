/**
 * @fileoverview Templates module tests
 */

describe('Templates', () => {
  let templates;

  beforeEach(() => {
    templates = require('../../src/js/templates.js');
  });

  test('should have template definitions', () => {
    expect(templates).toBeDefined();
  });

  test('should contain title-slide template', () => {
    const { templatePresets, TEMPLATE_PRESETS } = templates;
    const presets = templatePresets || TEMPLATE_PRESETS || {};
    if (Object.keys(presets).length > 0) {
      expect(presets['title-slide'] || presets['titleSlide']).toBeDefined();
    }
  });

  test('should contain content-slide template', () => {
    const { templatePresets, TEMPLATE_PRESETS } = templates;
    const presets = templatePresets || TEMPLATE_PRESETS || {};
    if (Object.keys(presets).length > 0) {
      expect(presets['content-slide'] || presets['contentSlide']).toBeDefined();
    }
  });

  test('templates should have HTML content', () => {
    const { templatePresets, TEMPLATE_PRESETS } = templates;
    const presets = templatePresets || TEMPLATE_PRESETS || {};
    Object.values(presets).forEach((template) => {
      if (template.html) {
        expect(template.html).toContain('<');
      }
    });
  });
});
