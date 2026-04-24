/**
 * @fileoverview Application entry point - binds HTMLPPT to DOM
 * @module app-entry
 */

import { HTMLPPT, version } from './main.js';
import { getConfig } from './config.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize current filename first
  let currentFilename = 'HTML PPT';



  // Create app instance with configuration
  const app = new HTMLPPT({
    container: '#app',
    theme: localStorage.getItem('htmlppt_theme') || getConfig('theme.default'),
    autoSave: getConfig('autoSave.enabled'),
    autoSaveInterval: getConfig('autoSave.interval'),
    maxHistory: getConfig('history.maxSize'),
    filename: currentFilename,
  });

  // DOM Elements
  const els = {
    sidebar: document.getElementById('sidebar'),
    mainContent: document.getElementById('mainContent'),
    toggleSidebar: document.getElementById('toggleSidebar'),
    slidesList: document.getElementById('slidesList'),
    codeEditor: document.getElementById('codeEditor'),
    previewArea: document.getElementById('previewArea'),
    addSlide: document.getElementById('addSlide'),
    presentBtn: document.getElementById('presentBtn'),
    saveBtn: document.getElementById('saveBtn'),
    openBtn: document.getElementById('openBtn'),
    newBtn: document.getElementById('newBtn'),
    undoBtn: document.getElementById('undoBtn'),
    redoBtn: document.getElementById('redoBtn'),
    autoSaveToggle: document.getElementById('autoSaveToggle'),

    fileInput: document.getElementById('fileInput'),
    fileDropdown: document.getElementById('fileDropdown'),
    fileSelectorBtn: document.getElementById('fileSelectorBtn'),
    fileNew: document.getElementById('fileNew'),
    fileOpen: document.getElementById('fileOpen'),
    fileSave: document.getElementById('fileSave'),
    presentationMode: document.getElementById('presentationMode'),
    presentationSlide: document.getElementById('presentationSlide'),
    presentationHint: document.getElementById('presentationHint'),
    notification: document.getElementById('notification'),
    autoSaveIndicator: document.getElementById('autoSaveIndicator'),
    resizer: document.getElementById('resizer'),
    codeEditorPanel: document.getElementById('codeEditorPanel'),
    previewPanel: document.getElementById('previewPanel'),

    prevSlideBtn: document.getElementById('prevSlideBtn'),
    nextSlideBtn: document.getElementById('nextSlideBtn'),
    sharePresentationBtn: document.getElementById('sharePresentationBtn'),
    currentSlideNum: document.getElementById('currentSlideNum'),
    totalSlides: document.getElementById('totalSlides'),
    shareModal: document.getElementById('shareModal'),
    closeShareModal: document.getElementById('closeShareModal'),
    cancelShare: document.getElementById('cancelShare'),
    shareLink: document.getElementById('shareLink'),
    copyShareLink: document.getElementById('copyShareLink'),
    editableTitle: document.getElementById('editable-title'),
    themeDropdown: document.getElementById('themeDropdown'),
    themeSelectorBtn: document.getElementById('themeSelectorBtn'),
  };

  // --- Helper functions ---

  function showNotification(message, isError = false) {
    const n = els.notification;
    n.querySelector('span').textContent = message;
    n.querySelector('i').className = isError ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';
    n.style.backgroundColor = isError ? 'var(--danger-color)' : 'var(--success-color)';
    n.classList.add('show');
    
    // Add fade-in animation
    fadeInElement(n);
    
    setTimeout(() => n.classList.remove('show'), 3000);
  }

  function updateSlideList() {
    const slides = app.slideManager.getSlides();
    const currentIndex = app.slideManager.getCurrentSlideIndex();
    els.slidesList.innerHTML = '';

    if (slides.length === 0) {
      els.slidesList.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-file-image"></i>
          <h3>暂无幻灯片</h3>
          <p>点击"新建幻灯片"按钮开始创建您的演示文稿</p>
        </div>
      `;
      return;
    }

    slides.forEach((slide, index) => {
      const item = document.createElement('div');
      item.className = `slide-item${index === currentIndex ? ' active' : ''}`;
      item.draggable = true;
      item.innerHTML = `
        <div class="slide-number"><span>${index + 1}</span></div>
        <div class="preview">${slide.content.substring(0, 50)}...</div>
        <div class="slide-actions">
          <button class="slide-action export-img-btn" data-index="${index}" title="导出为图片"><i class="fas fa-image"></i></button>
          <button class="slide-action add-above" data-index="${index}" title="在上方添加"><i class="fas fa-arrow-up"></i></button>
          <button class="slide-action add-below" data-index="${index}" title="在下方添加"><i class="fas fa-arrow-down"></i></button>
          <button class="slide-action delete-slide" data-index="${index}" title="删除"><i class="fas fa-trash"></i></button>
        </div>
      `;
      item.addEventListener('click', (e) => {
        if (!e.target.closest('.delete-slide')) {
          // Save current edit content before switching slides
          const currentSlide = app.slideManager.getCurrentSlide();
          if (currentSlide) {
            currentSlide.content = els.previewArea.innerHTML;
            els.codeEditor.value = els.previewArea.innerHTML;
          }
          app.slideManager.setCurrentSlideIndex(index);
          loadCurrentSlide();
        }
      });
      item.querySelector('.export-img-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        exportSlideAsImage(index);
      });

      item.querySelector('.add-above').addEventListener('click', (e) => {
        e.stopPropagation();
        addSlideAtPosition(index);
      });

      item.querySelector('.add-below').addEventListener('click', (e) => {
        e.stopPropagation();
        addSlideAtPosition(index + 1);
      });

      item.querySelector('.delete-slide').addEventListener('click', () => {
        app.deleteSlide(index);
        updateSlideList();
        loadCurrentSlide();
        updateUndoRedoButtons();
      });
      // Drag & drop
      item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', index);
        e.dataTransfer.effectAllowed = 'move';
        item.classList.add('dragging');
      });
      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
        // Remove all drag-over classes in case drag was cancelled
        document.querySelectorAll('.slide-item.drag-over').forEach((el) => {
          el.classList.remove('drag-over');
        });
      });
      item.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        item.classList.add('drag-over');
      });
      item.addEventListener('dragleave', () => item.classList.remove('drag-over'));
      item.addEventListener('drop', (e) => {
        e.preventDefault();
        item.classList.remove('drag-over');
        const from = parseInt(e.dataTransfer.getData('text/plain'));
        const to = index;
        if (from !== to) {
          const success = app.slideManager.moveSlide(from, to);
          if (success) {
            app.autoSave.save();
            updateSlideList();
            updateUndoRedoButtons();
            // Update current slide index if needed
            const currentIndex = app.slideManager.getCurrentSlideIndex();
            if (from === currentIndex) {
              app.slideManager.setCurrentSlideIndex(to);
            } else if (from < currentIndex && to >= currentIndex) {
              app.slideManager.setCurrentSlideIndex(currentIndex - 1);
            } else if (from > currentIndex && to <= currentIndex) {
              app.slideManager.setCurrentSlideIndex(currentIndex + 1);
            }
          }
        }
      });
      els.slidesList.appendChild(item);
    });
  }

  function loadCurrentSlide() {
    const slide = app.slideManager.getCurrentSlide();
    if (slide) {
      // Load new slide content
      els.codeEditor.value = slide.content;
      els.previewArea.innerHTML = slide.content;
      updateSlideList();
    }
  }

  function updatePreview() {
    const html = els.codeEditor.value;
    
    // Create isolated container for user content
    const isolatedContent = document.createElement('div');
    isolatedContent.className = 'user-content-wrapper';
    
    // Extract only the body content if full HTML is pasted
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Check if the content contains full HTML structure
    const bodyContent = tempDiv.querySelector('body');
    if (bodyContent) {
      // Extract only the body content
      isolatedContent.innerHTML = bodyContent.innerHTML;
    } else {
      // Use the content as-is
      isolatedContent.innerHTML = html;
    }
    
    // Remove all style and link tags to prevent CSS leakage
    const styleTags = isolatedContent.querySelectorAll('style, link[rel="stylesheet"], link[rel="preload"]');
    styleTags.forEach(tag => tag.remove());
    
    // Remove inline styles that might contain !important rules
    const inlineStyles = isolatedContent.querySelectorAll('[style]');
    inlineStyles.forEach(el => el.removeAttribute('style'));
    
    // Clear and append isolated content
    els.previewArea.innerHTML = '';
    els.previewArea.appendChild(isolatedContent);
  }

  function updateUndoRedoButtons() {
    els.undoBtn.disabled = !app.history.canUndo();
    els.redoBtn.disabled = !app.history.canRedo();
  }

  function initResizer() {
    let isResizing = false;
    console.log('Initializing resizer...', els.resizer);
    
    els.resizer.addEventListener('mousedown', (e) => {
      console.log('Resizer mousedown event triggered');
      isResizing = true;
      // Set appropriate cursor based on layout direction
      const container = els.previewPanel.parentElement;
      const isColumnLayout = window.getComputedStyle(container).flexDirection === 'column';
      document.body.style.cursor = isColumnLayout ? 'row-resize' : 'col-resize';
      e.preventDefault();
    });
    document.addEventListener('mousemove', (e) => {
      if (!isResizing) {
        return;
      }
      console.log('Resizer mousemove event triggered', {isResizing, clientX: e.clientX, clientY: e.clientY});
      const container = els.previewPanel.parentElement;
      const rect = container.getBoundingClientRect();
      const isColumnLayout = window.getComputedStyle(container).flexDirection === 'column';

      if (isColumnLayout) {
        // Vertical resizing for mobile layout
        const percentage = ((e.clientY - rect.top) / rect.height) * 100;
        const previewHeight = `${Math.max(30, Math.min(70, percentage))}%`;
        const codeHeight = `${100 - Math.max(30, Math.min(70, percentage))}%`;
        console.log('Vertical resize - Preview:', previewHeight, 'Code:', codeHeight);
        els.previewPanel.style.height = previewHeight;
        els.codeEditorPanel.style.height = codeHeight;
      } else {
        // Horizontal resizing for desktop layout
        const percentage = ((e.clientX - rect.left) / rect.width) * 100;
        const previewWidth = `${Math.max(20, Math.min(80, percentage))}%`;
        const codeWidth = `${100 - Math.max(20, Math.min(80, percentage))}%`;
        console.log('Horizontal resize - Preview:', previewWidth, 'Code:', codeWidth);
        els.previewPanel.style.width = previewWidth;
        els.codeEditorPanel.style.width = codeWidth;
      }
    });
    document.addEventListener('mouseup', () => {
      console.log('Resizer mouseup event triggered');
      isResizing = false;
      document.body.style.cursor = 'default';
    });
  }

  // --- Presentation mode ---

  function enterPresentationMode() {
    const slides = app.slideManager.getSlides();
    if (slides.length === 0) {
      showNotification('请先添加幻灯片', true);
      return;
    }
    els.presentationMode.style.display = 'flex';
    loadCurrentSlideInPresentation();
    updateSlideCounter();
    setupPresentationControls();
  }

  function setupPresentationControls() {
    let hideTimer = null;
    const hideDelay = 3000; // 3 seconds

    // Show controls on mouse move
    els.presentationMode.addEventListener('mousemove', () => {
      els.presentationControls.style.opacity = '1';

      // Clear any existing timer
      if (hideTimer) {
        clearTimeout(hideTimer);
      }

      // Set new timer to hide controls
      hideTimer = setTimeout(() => {
        els.presentationControls.style.opacity = '0.7';
      }, hideDelay);
    });

    // Also show controls when mouse enters
    els.presentationControls.addEventListener('mouseenter', () => {
      els.presentationControls.style.opacity = '1';
      if (hideTimer) {
        clearTimeout(hideTimer);
      }
    });

    // Hide controls when mouse leaves
    els.presentationControls.addEventListener('mouseleave', () => {
      hideTimer = setTimeout(() => {
        els.presentationControls.style.opacity = '0.7';
      }, hideDelay);
    });
  }

  function updateSlideCounter() {
    const slides = app.slideManager.getSlides();
    els.currentSlideNum.textContent = app.slideManager.getCurrentSlideIndex() + 1;
    els.totalSlides.textContent = slides.length;
  }

  function exitPresentationMode() {
    els.presentationMode.style.display = 'none';
  }

  function loadCurrentSlideInPresentation() {
    const slide = app.slideManager.getCurrentSlide();
    if (!slide) {
      return;
    }
    const doc =
      els.presentationSlide.contentDocument || els.presentationSlide.contentWindow.document;
    doc.open();
    doc.write(`<!DOCTYPE html><html><head><style>
      body { margin: 0; padding: 40px; font-family: 'Segoe UI', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; width: 100%; }
    </style></head><body>${slide.content}</body></html>`);
    doc.close();
  }

  function showPreviousSlide() {
    const idx = app.slideManager.getCurrentSlideIndex();
    if (idx > 0) {
      app.slideManager.setCurrentSlideIndex(idx - 1);
      loadCurrentSlideInPresentation();
      updateSlideCounter();
    }
  }

  function showNextSlide() {
    const slides = app.slideManager.getSlides();
    const idx = app.slideManager.getCurrentSlideIndex();
    if (idx < slides.length - 1) {
      app.slideManager.setCurrentSlideIndex(idx + 1);
      loadCurrentSlideInPresentation();
      updateSlideCounter();
    }
  }

  function showShareModal() {
    const url = app.getShareUrl();
    els.shareLink.value = url;
    els.shareModal.style.display = 'flex';
  }

  function hideShareModal() {
    els.shareModal.style.display = 'none';
  }

  function copyShareLinkToClipboard() {
    els.shareLink.select();
    navigator.clipboard
      .writeText(els.shareLink.value)
      .then(() => {
        showNotification('链接已复制到剪贴板');
      })
      .catch(() => {
        document.execCommand('copy');
        showNotification('链接已复制');
      });
  }

  async function saveToFile() {
    const data = await app.export('json');
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentFilename.replace(/\s+/g, '_')}.htmlppt`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('项目已保存');
  }

  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        app.import(data, 'json');
        updateSlideList();
        loadCurrentSlide();
        
        // Update filename if available in loaded data
        if (data.filename) {
          currentFilename = data.filename;
          updateTitleDisplay();
          app.filename = currentFilename;
        }
        
        showNotification('项目已加载');
      } catch (err) {
        showNotification('文件格式错误', true);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  function createNewProject() {
    if (confirm('确定要创建新项目吗？当前未保存的内容将丢失。')) {
      app.slideManager.clear();
      app.addSlide({
        content:
          '<div class="slide-content">\n <h1>新演示文稿</h1>\n <p>在此处编辑您的内容</p>\n</div>',
      });
      
      // Reset filename to default
      currentFilename = 'HTML PPT';
      app.filename = currentFilename;
      updateTitleDisplay();
      
      updateSlideList();
      loadCurrentSlide();
      updateUndoRedoButtons();
      showNotification('新项目已创建');
    }
  }

  function toggleSidebarVisibility() {
    els.sidebar.classList.toggle('collapsed');
    if (els.sidebar.classList.contains('collapsed')) {
      els.toggleSidebar.innerHTML = '<i class="fas fa-chevron-right"></i>';
    } else {
      els.toggleSidebar.innerHTML = '<i class="fas fa-chevron-left"></i>';
    }
  }

  function toggleAutoSave() {
    const enabled = !app.autoSave.enabled;
    if (enabled) {
      app.autoSave.start();
    } else {
      app.autoSave.stop();
    }
    const icon = els.autoSaveToggle.querySelector('i');
    icon.className = enabled ? 'fas fa-toggle-on' : 'fas fa-toggle-off';
    els.autoSaveToggle.classList.toggle('on', enabled);
    showNotification(enabled ? '自动保存已开启' : '自动保存已关闭');
  }

  // Theme selector functions - Updated for dropdown
  function toggleThemeDropdown() {
    const dropdown = els.themeDropdown.querySelector('.theme-dropdown-content');
    dropdown.classList.toggle('show');
    
    // Add click handlers to theme options (only once)
    if (!dropdown.dataset.initialized) {
      document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', () => {
          const themeName = option.getAttribute('data-theme');
          app.themeManager.setTheme(themeName);
          localStorage.setItem('htmlppt_theme', themeName);
          toggleThemeDropdown();
          showNotification(`主题已切换为${getThemeDisplayName(themeName)}`);
        });
      });
      dropdown.dataset.initialized = 'true';
    }
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', function(event) {
    if (!els.themeDropdown.contains(event.target)) {
      const dropdown = els.themeDropdown.querySelector('.theme-dropdown-content');
      if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
      }
    }
  });

  function getThemeDisplayName(themeName) {
    const names = {
      'light': '浅色',
      'dark': '深色',
      'business': '商业',
      'creative': '创意',
      'minimal': '极简',
      'ocean': '海洋',
      'forest': '森林',
      'sunset': '日落'
    };
    return names[themeName] || themeName;
  }

  // --- Check URL params for shared presentations ---

  function checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    const data = params.get('data');
    if (mode === 'presentation' && data) {
      app
        .loadFromUrlParams(data)
        .then((success) => {
          if (success) {
            updateSlideList();
            loadCurrentSlide();
            enterPresentationMode();
          } else {
            showNotification('演示数据加载失败', true);
          }
        })
        .catch((error) => {
          console.error('URL参数加载错误:', error);
          showNotification('演示数据加载失败: ' + error.message, true);
        });
    }
  }

  // --- Event bindings ---

  // URL load events
  app.on('url:load:success', () => {
    showNotification('演示数据加载成功，进入演示模式');
  });

  app.on('url:load:error', (error) => {
    console.error('URL加载错误:', error);
    showNotification('演示数据加载失败: ' + error.message, true);
  });

  // Auto save events with animations
  app.autoSave.on('saveStart', () => {
    els.autoSaveIndicator.classList.add('show');
    pulseElement(els.autoSaveIndicator);
  });

  app.autoSave.on('saveSuccess', () => {
    setTimeout(() => {
      stopPulseElement(els.autoSaveIndicator);
      els.autoSaveIndicator.classList.remove('show');
    }, 2000);
  });

  app.autoSave.on('saveError', (error) => {
    console.error('自动保存错误:', error);
    setTimeout(() => {
      stopPulseElement(els.autoSaveIndicator);
      els.autoSaveIndicator.classList.remove('show');
    }, 2000);
  });

  // Initialize
  await app.initialize();

  // Set up editable title
  function updateTitleDisplay() {
    // Check if the title is currently focused
    const isTitleFocused = document.activeElement === els.editableTitle;
    
    // Save cursor position before updating text (only if there's a valid selection)
    let startOffset = 0;
    let endOffset = 0;
    let isCollapsed = true;
    const selection = window.getSelection();
    
    if (selection.rangeCount > 0) {
      try {
        const range = selection.getRangeAt(0);
        // Check if the selection is within our editable title
        if (els.editableTitle.contains(range.startContainer) || els.editableTitle.contains(range.endContainer)) {
          startOffset = range.startOffset;
          endOffset = range.endOffset;
          isCollapsed = range.collapsed;
        }
      } catch (error) {
        console.warn('Could not get cursor position:', error);
      }
    }
    
    // Update the title text
    els.editableTitle.textContent = currentFilename;
    
    // Restore cursor position (only if we had a valid position and title was focused)
    if (isTitleFocused && els.editableTitle.firstChild && selection.rangeCount > 0) {
      try {
        const newRange = document.createRange();
        newRange.setStart(els.editableTitle.firstChild, Math.min(startOffset, currentFilename.length));
        if (isCollapsed) {
          newRange.collapse(true);
        } else {
          newRange.setEnd(els.editableTitle.firstChild, Math.min(endOffset, currentFilename.length));
        }
        selection.removeAllRanges();
        selection.addRange(newRange);
      } catch (error) {
        console.warn('Could not restore cursor position:', error);
      }
    }
  }

  // Handle title changes with proper Chinese character support
  let isComposing = false;
  
  // Handle IME composition start
  els.editableTitle.addEventListener('compositionstart', () => {
    isComposing = true;
  });

  // Handle IME composition end
  els.editableTitle.addEventListener('compositionend', () => {
    isComposing = false;
    // Update after a small delay to let browser handle cursor position
    setTimeout(() => {
      let newTitle = els.editableTitle.textContent.trim();
      currentFilename = newTitle || 'HTML PPT';
      updateTitleDisplay();
      app.filename = currentFilename;
    }, 50);
  });

  // Handle regular input with debounce to avoid cursor jumping
  let inputTimeout = null;
  els.editableTitle.addEventListener('input', () => {
    if (isComposing) {
      return;
    }
    
    // Debounce the input handling
    clearTimeout(inputTimeout);
    inputTimeout = setTimeout(() => {
      let newTitle = els.editableTitle.textContent.trim();
      currentFilename = newTitle || 'HTML PPT';
      updateTitleDisplay();
      app.filename = currentFilename;
    }, 200);
  });

  // Handle title blur (when user finishes editing)
  const handleTitleBlur = () => {
    let newTitle = els.editableTitle.textContent.trim();
    currentFilename = newTitle || 'HTML PPT';
    app.filename = currentFilename;
    // Save the new filename
    app.save();
    // Update display without cursor issues
    setTimeout(() => {
      updateTitleDisplay();
    }, 50);
  };
  els.editableTitle.addEventListener('blur', handleTitleBlur);

  // Load initial data
  const savedData = app.storage.loadProject();
  if (savedData && savedData.slides) {
    updateSlideList();
    loadCurrentSlide();
    // Update filename if available in metadata
    if (savedData.filename) {
      currentFilename = savedData.filename;
      updateTitleDisplay();
    }
  } else {
    app.addSlide({
      content:
        '<div class="slide-content">\n <h1>欢迎使用 HTML PPT</h1>\n <p>在左侧代码编辑器中编写HTML，右侧实时预览</p>\n</div>',
    });
    updateSlideList();
    loadCurrentSlide();
  }

  updateUndoRedoButtons();
  initResizer();
  checkUrlParams();

  // Toolbar buttons
  /* eslint-disable no-undef */
  function exportSlideAsImage(index) {
    // Check if html2canvas is available
    if (typeof html2canvas !== 'undefined') {
      // html2canvas is available, proceed with export
      const slide = app.slideManager.getSlides()[index];
      if (!slide) {
        showNotification('无效的幻灯片索引', true);
        return;
      }

      // Create a temporary element to render the slide
      const tempElement = document.createElement('div');
      tempElement.style.position = 'absolute';
      tempElement.style.left = '-9999px';
      tempElement.style.width = '800px';
      tempElement.style.height = '600px';
      tempElement.style.backgroundColor = 'white';
      tempElement.style.padding = '20px';
      tempElement.style.boxSizing = 'border-box';
      tempElement.innerHTML = slide.content;
      document.body.appendChild(tempElement);

      // Use html2canvas to capture the slide
      html2canvas(tempElement, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      })
        .then((canvas) => {
          // Create download link
          const link = document.createElement('a');
          link.download = `slide-${index + 1}.png`;
          link.href = canvas.toDataURL('image/png', 0.92);
          link.click();

          // Clean up
          document.body.removeChild(tempElement);
          showNotification('幻灯片已导出为图片');
        })
        .catch((error) => {
          console.error('导出图片错误:', error);
          document.body.removeChild(tempElement);
          showNotification('导出图片失败: ' + error.message, true);
        });
    } else {
      // html2canvas not available, show installation instructions
      showNotification(
        '图片导出功能需要html2canvas库。请安装依赖：npm install html2canvas，然后在HTML中添加<script src="html2canvas.min.js"></script>'
      );
    }
  }
  /* eslint-enable no-undef */

  function addSlideAtPosition(position) {
    app.addSlide(
      {
        content:
          '<div class="slide-content">\n <h1>新幻灯片</h1>\n <p>在此处编辑您的内容</p>\n</div>',
      },
      position
    );
    updateSlideList();
    loadCurrentSlide();
    updateUndoRedoButtons();
    showNotification('幻灯片已添加');
  }

  els.addSlide.addEventListener('click', (e) => {
    createRipple(e, els.addSlide);
    app.addSlide({
      content:
        '<div class="slide-content">\n <h1>新幻灯片</h1>\n <p>在此处编辑您的内容</p>\n</div>',
    });
    updateSlideList();
    loadCurrentSlide();
    updateUndoRedoButtons();
  });
  els.presentBtn.addEventListener('click', (e) => {
    createRipple(e, els.presentBtn);
    enterPresentationMode();
  });
  els.undoBtn.addEventListener('click', (e) => {
    createRipple(e, els.undoBtn);
    app.history.undo();
    updateUndoRedoButtons();
  });
  els.redoBtn.addEventListener('click', (e) => {
    createRipple(e, els.redoBtn);
    app.history.redo();
    updateUndoRedoButtons();
  });
  els.autoSaveToggle.addEventListener('click', toggleAutoSave);

  // File dropdown functions
  function toggleFileDropdown() {
    const dropdown = els.fileDropdown.querySelector('.file-dropdown-content');
    dropdown.classList.toggle('show');
    
    // Add click handlers to file options (only once)
    if (!dropdown.dataset.initialized) {
      els.fileNew.addEventListener('click', () => {
        createNewProject();
        dropdown.classList.remove('show');
      });
      els.fileOpen.addEventListener('click', () => {
        els.fileInput.click();
        dropdown.classList.remove('show');
      });
      els.fileSave.addEventListener('click', () => {
        saveToFile();
        dropdown.classList.remove('show');
      });
      dropdown.dataset.initialized = 'true';
    }
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', function(event) {
    if (!els.fileDropdown.contains(event.target)) {
      const dropdown = els.fileDropdown.querySelector('.file-dropdown-content');
      if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
      }
    }
  });

  els.fileSelectorBtn.addEventListener('click', toggleFileDropdown);
  els.themeSelectorBtn.addEventListener('click', toggleThemeDropdown);
  els.toggleSidebar.addEventListener('click', toggleSidebarVisibility);
  els.fileInput.addEventListener('change', handleFileSelect);

  // Code editor
  let editorDebounceTimer = null;
  els.codeEditor.addEventListener('input', () => {
    const slide = app.slideManager.getCurrentSlide();
    if (slide) {
      slide.content = els.codeEditor.value;
      app.autoSave.save();
    }
    updatePreview();
    // Debounced history push for undo/redo support
    clearTimeout(editorDebounceTimer);
    editorDebounceTimer = setTimeout(() => {
      app.history.push(app.slideManager.toJSON());
      updateUndoRedoButtons();
    }, 500);
  });

  // Preview editor
  els.previewArea.addEventListener('input', () => {
    const slide = app.slideManager.getCurrentSlide();
    if (slide) {
      slide.content = els.previewArea.innerHTML;
      els.codeEditor.value = els.previewArea.innerHTML;
      app.autoSave.save();
    }
  });

  // Presentation controls
  els.prevSlideBtn.addEventListener('click', showPreviousSlide);
  els.nextSlideBtn.addEventListener('click', showNextSlide);
  els.sharePresentationBtn.addEventListener('click', showShareModal);
  els.closeShareModal.addEventListener('click', hideShareModal);
  els.cancelShare.addEventListener('click', hideShareModal);
  els.copyShareLink.addEventListener('click', copyShareLinkToClipboard);



  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && els.presentationMode.style.display === 'flex') {
      exitPresentationMode();
    }
    if (els.presentationMode.style.display === 'flex') {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        showNextSlide();
      }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        showPreviousSlide();
      }
    }
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      saveToFile();
    }
    if (e.ctrlKey && e.key === 'o') {
      e.preventDefault();
      els.fileInput.click();
    }
    if (e.ctrlKey && e.key === 'n') {
      e.preventDefault();
      createNewProject();
    }
    if (e.ctrlKey && !e.shiftKey && e.key === 'z') {
      e.preventDefault();
      app.history.undo();
      updateUndoRedoButtons();
    }
    if (e.ctrlKey && e.shiftKey && e.key === 'z') {
      e.preventDefault();
      app.history.redo();
      updateUndoRedoButtons();
    }
    if (e.ctrlKey && e.key === 'b') {
      e.preventDefault();
      toggleSidebarVisibility();
    }
  });

  console.log(`HTML PPT v${version} initialized`);
});

/**
 * Create ripple effect on button click
 * @param {Event} e - Click event
 * @param {HTMLElement} btn - Button element
 */
function createRipple(e, btn) {
  // Add ripple class for CSS animation
  btn.classList.add('btn-ripple');
  
  // Remove class after animation completes
  setTimeout(() => {
    btn.classList.remove('btn-ripple');
  }, 600);
}

/**
 * Add fade-in animation to element
 * @param {HTMLElement} element - Element to animate
 */
function fadeInElement(element) {
  element.classList.add('btn-fade-in');
  setTimeout(() => {
    element.classList.remove('btn-fade-in');
  }, 300);
}

/**
 * Add pulse animation to element
 * @param {HTMLElement} element - Element to animate
 */
function pulseElement(element) {
  element.classList.add('btn-pulse');
}

/**
 * Remove pulse animation from element
 * @param {HTMLElement} element - Element to stop animating
 */
function stopPulseElement(element) {
  element.classList.remove('btn-pulse');
}
