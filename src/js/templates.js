/**
 * @fileoverview Template system for HTML PPT
 * @module templates
 */

/**
 * Template class representing a slide template
 */
export class Template {
  /**
   * Create a new template
   * @param {Object} options - Template options
   * @param {string} options.id - Template ID
   * @param {string} options.name - Template name
   * @param {string} options.description - Template description
   * @param {string} options.category - Template category
   * @param {Object} options.content - Template content structure
   * @param {Object} options.styles - Template styles
   * @param {string} options.thumbnail - Template thumbnail URL
   */
  constructor(options = {}) {
    this.id = options.id || this.generateId();
    this.name = options.name || 'Untitled Template';
    this.description = options.description || '';
    this.category = options.category || 'general';
    this.content = options.content || {};
    this.styles = options.styles || {};
    this.thumbnail = options.thumbnail || '';
  }

  /**
   * Generate unique ID for template
   * @returns {string} Unique ID
   */
  generateId() {
    return `template_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Apply template to slide
   * @param {Object} slide - Slide object
   * @returns {Object} Modified slide
   */
  applyToSlide(slide) {
    return {
      ...slide,
      content: this.interpolateContent(slide.content),
      styles: { ...this.styles, ...slide.styles },
    };
  }

  /**
   * Interpolate content with slide data
   * @param {string} content - Content string
   * @returns {string} Interpolated content
   */
  interpolateContent(content) {
    let result = this.content.default || '';

    // Replace placeholders
    Object.keys(this.content).forEach((key) => {
      if (key !== 'default') {
        const placeholder = `{{${key}}}`;
        result = result.replace(new RegExp(placeholder, 'g'), this.content[key]);
      }
    });

    return result;
  }

  /**
   * Convert template to plain object
   * @returns {Object} Plain object representation
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      category: this.category,
      content: this.content,
      styles: this.styles,
      thumbnail: this.thumbnail,
    };
  }

  /**
   * Create template from plain object
   * @param {Object} data - Plain object data
   * @returns {Template} Template instance
   */
  static fromJSON(data) {
    return new Template(data);
  }
}

/**
 * TemplateManager class for managing templates
 */
export class TemplateManager {
  /**
   * Create template manager
   * @param {Object} options - Template manager options
   */
  constructor(options = {}) {
    this.templates = new Map();
    this.categories = new Set();
    this.listeners = {};

    // Register default templates
    this.registerDefaultTemplates();
  }

  /**
   * Register default templates
   */
  registerDefaultTemplates() {
    // Title slide template
    this.register(
      new Template({
        id: 'title-slide',
        name: '标题幻灯片',
        description: '用于演示文稿的开场标题',
        category: 'title',
        content: {
          default: `# {{title}}

{{subtitle}}

---

{{author}} | {{date}}`,
        },
        styles: {
          textAlign: 'center',
          fontSize: '2rem',
        },
      })
    );

    // Content slide template
    this.register(
      new Template({
        id: 'content-slide',
        name: '内容幻灯片',
        description: '用于展示主要内容',
        category: 'content',
        content: {
          default: `## {{title}}

{{content}}

---

{{notes}}`,
        },
        styles: {
          textAlign: 'left',
          fontSize: '1.5rem',
        },
      })
    );

    // Bullet points template
    this.register(
      new Template({
        id: 'bullet-points',
        name: '要点列表',
        description: '用于展示要点列表',
        category: 'list',
        content: {
          default: `## {{title}}

{{points}}

---

{{notes}}`,
        },
        styles: {
          textAlign: 'left',
          fontSize: '1.3rem',
        },
      })
    );

    // Two column template
    this.register(
      new Template({
        id: 'two-column',
        name: '双栏布局',
        description: '左右两栏布局',
        category: 'layout',
        content: {
          default: `## {{title}}

| {{leftTitle}} | {{rightTitle}} |
|---|---|
| {{leftContent}} | {{rightContent}} |

---

{{notes}}`,
        },
        styles: {
          textAlign: 'left',
          fontSize: '1.2rem',
        },
      })
    );

    // Image slide template
    this.register(
      new Template({
        id: 'image-slide',
        name: '图片幻灯片',
        description: '用于展示图片',
        category: 'media',
        content: {
          default: `## {{title}}

![{{imageAlt}}]({{imageUrl}})

{{caption}}

---

{{notes}}`,
        },
        styles: {
          textAlign: 'center',
          fontSize: '1.5rem',
        },
      })
    );

    // Quote slide template
    this.register(
      new Template({
        id: 'quote-slide',
        name: '引用幻灯片',
        description: '用于展示引用',
        category: 'quote',
        content: {
          default: `## {{title}}

> {{quote}}

— {{author}}

---

{{notes}}`,
        },
        styles: {
          textAlign: 'center',
          fontSize: '1.5rem',
        },
      })
    );

    // Code slide template
    this.register(
      new Template({
        id: 'code-slide',
        name: '代码幻灯片',
        description: '用于展示代码',
        category: 'code',
        content: {
          default: `## {{title}}

\`\`\`{{language}}
{{code}}
\`\`\`

{{description}}

---

{{notes}}`,
        },
        styles: {
          textAlign: 'left',
          fontSize: '1rem',
        },
      })
    );

    // Comparison template
    this.register(
      new Template({
        id: 'comparison',
        name: '对比表格',
        description: '用于对比展示',
        category: 'table',
        content: {
          default: `## {{title}}

| {{leftLabel}} | {{rightLabel}} |
|---|---|
| {{item1Left}} | {{item1Right}} |
| {{item2Left}} | {{item2Right}} |
| {{item3Left}} | {{item3Right}} |

---

{{notes}}`,
        },
        styles: {
          textAlign: 'left',
          fontSize: '1.2rem',
        },
      })
    );

    // Thank you slide template
    this.register(
      new Template({
        id: 'thank-you',
        name: '感谢幻灯片',
        description: '用于演示文稿结尾',
        category: 'ending',
        content: {
          default: `# Thank You!

{{message}}

---

{{contact}}

{{website}}`,
        },
        styles: {
          textAlign: 'center',
          fontSize: '2rem',
        },
      })
    );

    // Question slide template
    this.register(
      new Template({
        id: 'question',
        name: '问答幻灯片',
        description: '用于问答环节',
        category: 'interactive',
        content: {
          default: `# Questions?

{{message}}

---

{{contact}}`,
        },
        styles: {
          textAlign: 'center',
          fontSize: '2rem',
        },
      })
    );
  }

  /**
   * Register template
   * @param {Template} template - Template instance
   */
  register(template) {
    this.templates.set(template.id, template);
    this.categories.add(template.category);
    this.emit('register', template);
  }

  /**
   * Unregister template
   * @param {string} id - Template ID
   */
  unregister(id) {
    const template = this.templates.get(id);
    if (template) {
      this.templates.delete(id);
      this.emit('unregister', template);
    }
  }

  /**
   * Get template by ID
   * @param {string} id - Template ID
   * @returns {Template|null} Template or null
   */
  getTemplate(id) {
    return this.templates.get(id) || null;
  }

  /**
   * Get all templates
   * @returns {Array<Template>} All templates
   */
  getAllTemplates() {
    return Array.from(this.templates.values());
  }

  /**
   * Get templates by category
   * @param {string} category - Category name
   * @returns {Array<Template>} Templates in category
   */
  getTemplatesByCategory(category) {
    return this.getAllTemplates().filter((template) => template.category === category);
  }

  /**
   * Get all categories
   * @returns {Array<string>} All categories
   */
  getCategories() {
    return Array.from(this.categories);
  }

  /**
   * Search templates
   * @param {string} query - Search query
   * @returns {Array<Template>} Matching templates
   */
  search(query) {
    const lowerQuery = query.toLowerCase();
    return this.getAllTemplates().filter(
      (template) =>
        template.name.toLowerCase().includes(lowerQuery) ||
        template.description.toLowerCase().includes(lowerQuery) ||
        template.category.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Apply template to slide
   * @param {string} templateId - Template ID
   * @param {Object} slide - Slide object
   * @returns {Object} Modified slide
   */
  applyTemplate(templateId, slide) {
    const template = this.getTemplate(templateId);
    if (template) {
      return template.applyToSlide(slide);
    }
    return slide;
  }

  /**
   * Create slide from template
   * @param {string} templateId - Template ID
   * @param {Object} data - Slide data
   * @returns {Object} Created slide
   */
  createSlideFromTemplate(templateId, data = {}) {
    const template = this.getTemplate(templateId);
    if (!template) {
      return data;
    }

    const slide = {
      title: data.title || template.name,
      content: template.interpolateContent(data),
      styles: { ...template.styles, ...data.styles },
    };

    return slide;
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
   * Destroy template manager
   */
  destroy() {
    this.templates.clear();
    this.categories.clear();
    this.removeAllListeners();
  }
}

/**
 * Get template preview HTML
 * @param {Template} template - Template instance
 * @returns {string} Preview HTML
 */
export function getTemplatePreview(template) {
  return `
    <div class="template-preview" data-template-id="${template.id}">
      <div class="template-thumbnail">
        ${template.thumbnail ? `<img src="${template.thumbnail}" alt="${template.name}">` : '<div class="placeholder">No preview</div>'}
      </div>
      <div class="template-info">
        <h3>${template.name}</h3>
        <p class="template-category">${template.category}</p>
        <p class="template-description">${template.description}</p>
      </div>
    </div>
  `;
}

/**
 * Create template gallery HTML
 * @param {Array<Template>} templates - Templates array
 * @returns {string} Gallery HTML
 */
export function createTemplateGallery(templates) {
  return `
    <div class="template-gallery">
      ${templates.map((template) => getTemplatePreview(template)).join('')}
    </div>
  `;
}
