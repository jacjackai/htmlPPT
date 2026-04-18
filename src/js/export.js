/**
 * @fileoverview Export configuration for HTML PPT
 * @module export
 */

/**
 * Export formats
 */
export const ExportFormats = {
  JSON: 'json',
  BASE64: 'base64',
  PDF: 'pdf',
  HTML: 'html',
  MARKDOWN: 'markdown',
};

/**
 * Export class for handling data export
 */
export class Exporter {
  /**
   * Create exporter instance
   * @param {Object} options - Exporter options
   * @param {Object} options.data - Data to export
   * @param {string} options.format - Export format
   * @param {Object} options.options - Export options
   */
  constructor(options = {}) {
    this.data = options.data || {};
    this.format = options.format || ExportFormats.JSON;
    this.options = options.options || {};
  }

  /**
   * Export data
   * @returns {Promise<string>} Exported data
   */
  async export() {
    switch (this.format) {
      case ExportFormats.JSON:
        return this.exportJSON();
      case ExportFormats.BASE64:
        return this.exportBase64();
      case ExportFormats.HTML:
        return this.exportHTML();
      case ExportFormats.MARKDOWN:
        return this.exportMarkdown();
      case ExportFormats.PDF:
        return this.exportPDF();
      default:
        throw new Error(`Unsupported export format: ${this.format}`);
    }
  }

  /**
   * Export as JSON
   * @returns {string} JSON string
   */
  exportJSON() {
    const json = JSON.stringify(this.data, null, 2);
    return json;
  }

  /**
   * Export as Base64
   * @returns {string} Base64 string
   */
  exportBase64() {
    const json = this.exportJSON();
    return btoa(json);
  }

  /**
   * Export as HTML
   * @returns {string} HTML string
   */
  exportHTML() {
    let html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.data.title || 'Presentation'}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
        }
        .slide {
            background: white;
            margin: 20px auto;
            padding: 40px;
            max-width: 800px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            min-height: 600px;
        }
        .slide h1 {
            color: #4a6fa5;
            margin-bottom: 20px;
        }
        .slide h2 {
            color: #6e9cd2;
            margin-bottom: 15px;
        }
        .slide p {
            line-height: 1.6;
            color: #333;
        }
        .slide ul, .slide ol {
            line-height: 1.8;
        }
        .slide code {
            background: #f8f9fa;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: Monaco, Consolas, monospace;
        }
        .slide pre {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
        }
        .page-break {
            page-break-after: always;
        }
    </style>
</head>
<body>
`;

    if (this.data.slides && Array.isArray(this.data.slides)) {
      this.data.slides.forEach((slide, index) => {
        html += `<div class="slide${index < this.data.slides.length - 1 ? ' page-break' : ''}">
`;

        if (slide.title) {
          html += `    <h1>${this.escapeHtml(slide.title)}</h1>
`;
        }

        if (slide.content) {
          html += `    <div class="content">${this.markdownToHtml(slide.content)}</div>
`;
        }

        html += `</div>
`;
      });
    }

    html += `</body>
</html>`;

    return html;
  }

  /**
   * Export as Markdown
   * @returns {string} Markdown string
   */
  exportMarkdown() {
    let markdown = `# ${this.data.title || 'Presentation'}

`;

    if (this.data.description) {
      markdown += `${this.data.description}

`;
    }

    if (this.data.slides && Array.isArray(this.data.slides)) {
      this.data.slides.forEach((slide, index) => {
        markdown += `---

## Slide ${index + 1}: ${slide.title || 'Untitled'}

${slide.content || ''}

`;
      });
    }

    return markdown;
  }

  /**
   * Export as PDF
   * @returns {Promise<Blob>} PDF blob
   */
  async exportPDF() {
    // This would require a PDF library like jsPDF
    // For now, we'll export as HTML and let the user print to PDF
    const html = this.exportHTML();

    // Create a blob
    const blob = new Blob([html], { type: 'text/html' });
    return blob;
  }

  /**
   * Escape HTML special characters
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Convert Markdown to HTML
   * @param {string} markdown - Markdown string
   * @returns {string} HTML string
   */
  markdownToHtml(markdown) {
    if (!markdown) return '';

    let html = this.escapeHtml(markdown);

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Lists
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>');

    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p>');
    html = `<p>${html}</p>`;

    // Line breaks
    html = html.replace(/\n/g, '<br>');

    return html;
  }

  /**
   * Download exported data
   * @param {string} filename - Filename
   */
  download(filename = 'presentation') {
    this.export().then((data) => {
      let blob;
      let type;

      switch (this.format) {
        case ExportFormats.JSON:
          blob = new Blob([data], { type: 'application/json' });
          type = 'json';
          break;
        case ExportFormats.BASE64:
          blob = new Blob([data], { type: 'text/plain' });
          type = 'txt';
          break;
        case ExportFormats.HTML:
          blob = new Blob([data], { type: 'text/html' });
          type = 'html';
          break;
        case ExportFormats.MARKDOWN:
          blob = new Blob([data], { type: 'text/markdown' });
          type = 'md';
          break;
        case ExportFormats.PDF:
          blob = data;
          type = 'pdf';
          break;
        default:
          blob = new Blob([data], { type: 'text/plain' });
          type = 'txt';
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.${type}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  /**
   * Get export format
   * @returns {string} Export format
   */
  getFormat() {
    return this.format;
  }

  /**
   * Set export format
   * @param {string} format - Export format
   */
  setFormat(format) {
    this.format = format;
  }

  /**
   * Get export data
   * @returns {Object} Export data
   */
  getData() {
    return this.data;
  }

  /**
   * Set export data
   * @param {Object} data - Export data
   */
  setData(data) {
    this.data = data;
  }

  /**
   * Get export options
   * @returns {Object} Export options
   */
  getOptions() {
    return this.options;
  }

  /**
   * Set export options
   * @param {Object} options - Export options
   */
  setOptions(options) {
    this.options = options;
  }

  /**
   * Destroy exporter
   */
  destroy() {
    this.data = null;
    this.options = null;
  }
}

/**
 * Create exporter instance
 * @param {Object} data - Data to export
 * @param {string} format - Export format
 * @param {Object} options - Export options
 * @returns {Exporter} Exporter instance
 */
export function createExporter(data, format = ExportFormats.JSON, options = {}) {
  return new Exporter({ data, format, options });
}

/**
 * Quick export function
 * @param {Object} data - Data to export
 * @param {string} format - Export format
 * @param {string} filename - Filename
 * @returns {Promise<void>}
 */
export async function quickExport(data, format = ExportFormats.JSON, filename = 'presentation') {
  const exporter = new Exporter({ data, format });
  await exporter.download(filename);
  exporter.destroy();
}
