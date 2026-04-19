/**
 * @fileoverview Application entry point - binds HTMLPPT to DOM
 * @module app-entry
 */

import { HTMLPPT, version } from './main.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Create app instance
  const app = new HTMLPPT({
    container: '#app',
    theme: localStorage.getItem('theme') || 'light',
    autoSave: true,
    autoSaveInterval: 30000,
    maxHistory: 50,
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
    themeToggle: document.getElementById('themeToggle'),
    fileInput: document.getElementById('fileInput'),
    presentationMode: document.getElementById('presentationMode'),
    presentationSlide: document.getElementById('presentationSlide'),
    presentationHint: document.getElementById('presentationHint'),
    notification: document.getElementById('notification'),
    autoSaveIndicator: document.getElementById('autoSaveIndicator'),
    resizer: document.getElementById('resizer'),
    codeEditorPanel: document.getElementById('codeEditorPanel'),
    previewPanel: document.getElementById('previewPanel'),
    fabMain: document.getElementById('fabMain'),
    fabOptions: document.getElementById('fabOptions'),
    fabIcon: document.getElementById('fabIcon'),
    fabSave: document.getElementById('fabSave'),
    fabPresent: document.getElementById('fabPresent'),
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
  };

  // --- Helper functions ---

  function showNotification(message, isError = false) {
    const n = els.notification;
    n.querySelector('span').textContent = message;
    n.querySelector('i').className = isError
      ? 'fas fa-exclamation-circle'
      : 'fas fa-check-circle';
    n.style.backgroundColor = isError ? '#dc3545' : '#28a745';
    n.classList.add('show');
    setTimeout(() => n.classList.remove('show'), 3000);
  }

  function updateSlideList() {
    const slides = app.slideManager.getSlides();
    const currentIndex = app.slideManager.getCurrentSlideIndex();
    els.slidesList.innerHTML = '';
    slides.forEach((slide, index) => {
      const item = document.createElement('div');
      item.className = `slide-item${index === currentIndex ? ' active' : ''}`;
      item.draggable = true;
      item.innerHTML = `
        <div class="slide-number"><span>${index + 1}</span></div>
        <div class="preview">${slide.html.substring(0, 50)}...</div>
        <div class="slide-actions">
          <button class="slide-action delete-slide" data-index="${index}"><i class="fas fa-trash"></i></button>
        </div>
      `;
      item.addEventListener('click', (e) => {
        if (!e.target.closest('.delete-slide')) {
          app.slideManager.setCurrentSlideIndex(index);
          loadCurrentSlide();
        }
      });
      item.querySelector('.delete-slide').addEventListener('click', () => {
        app.slideManager.removeSlide(index);
        app.autoSave.save();
        updateSlideList();
        loadCurrentSlide();
      });
      // Drag & drop
      item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', index);
        item.classList.add('dragging');
      });
      item.addEventListener('dragend', () => item.classList.remove('dragging'));
      item.addEventListener('dragover', (e) => {
        e.preventDefault();
        item.classList.add('drag-over');
      });
      item.addEventListener('dragleave', () => item.classList.remove('drag-over'));
      item.addEventListener('drop', (e) => {
        e.preventDefault();
        item.classList.remove('drag-over');
        const from = parseInt(e.dataTransfer.getData('text/plain'));
        const to = index;
        if (from !== to) {
          app.slideManager.moveSlide(from, to);
          app.autoSave.save();
          updateSlideList();
        }
      });
      els.slidesList.appendChild(item);
    });
  }

  function loadCurrentSlide() {
    const slide = app.slideManager.getCurrentSlide();
    if (slide) {
      els.codeEditor.value = slide.html;
      updatePreview();
      updateSlideList();
    }
  }

  function updatePreview() {
    const html = els.codeEditor.value;
    const doc = els.previewArea.contentDocument || els.previewArea.contentWindow.document;
    doc.open();
    doc.write(`<!DOCTYPE html><html><head><style>
      body { margin: 0; padding: 20px; font-family: 'Segoe UI', sans-serif; }
    </style></head><body>${html}</body></html>`);
    doc.close();
  }

  function updateUndoRedoButtons() {
    els.undoBtn.disabled = !app.history.canUndo();
    els.redoBtn.disabled = !app.history.canRedo();
  }

  function initResizer() {
    let isResizing = false;
    els.resizer.addEventListener('mousedown', (e) => {
      isResizing = true;
      document.body.style.cursor = 'col-resize';
      e.preventDefault();
    });
    document.addEventListener('mousemove', (e) => {
      if (!isResizing) return;
      const container = els.codeEditorPanel.parentElement;
      const rect = container.getBoundingClientRect();
      const percentage = ((e.clientX - rect.left) / rect.width) * 100;
      els.codeEditorPanel.style.width = `${Math.max(20, Math.min(80, percentage))}%`;
      els.previewPanel.style.width = `${100 - Math.max(20, Math.min(80, percentage))}%`;
    });
    document.addEventListener('mouseup', () => {
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
    els.currentSlideNum.textContent = app.slideManager.getCurrentSlideIndex() + 1;
    els.totalSlides.textContent = slides.length;
  }

  function exitPresentationMode() {
    els.presentationMode.style.display = 'none';
  }

  function loadCurrentSlideInPresentation() {
    const slide = app.slideManager.getCurrentSlide();
    if (!slide) return;
    const doc = els.presentationSlide.contentDocument || els.presentationSlide.contentWindow.document;
    doc.open();
    doc.write(`<!DOCTYPE html><html><head><style>
      body { margin: 0; padding: 40px; font-family: 'Segoe UI', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; width: 100%; }
    </style></head><body>${slide.html}</body></html>`);
    doc.close();
  }

  function showPreviousSlide() {
    const idx = app.slideManager.getCurrentSlideIndex();
    if (idx > 0) {
      app.slideManager.setCurrentSlideIndex(idx - 1);
      loadCurrentSlideInPresentation();
      els.currentSlideNum.textContent = idx;
    }
  }

  function showNextSlide() {
    const slides = app.slideManager.getSlides();
    const idx = app.slideManager.getCurrentSlideIndex();
    if (idx < slides.length - 1) {
      app.slideManager.setCurrentSlideIndex(idx + 1);
      loadCurrentSlideInPresentation();
      els.currentSlideNum.textContent = idx + 2;
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
    navigator.clipboard.writeText(els.shareLink.value).then(() => {
      showNotification('链接已复制到剪贴板');
    }).catch(() => {
      document.execCommand('copy');
      showNotification('链接已复制');
    });
  }

  function saveToFile() {
    const data = app.export('json');
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `presentation-${Date.now()}.htmlppt`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('项目已保存');
  }

  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        app.import(data, 'json');
        updateSlideList();
        loadCurrentSlide();
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
        html: '<div class="slide-content">\n  <h1>新演示文稿</h1>\n  <p>在此处编辑您的内容</p>\n</div>',
      });
      updateSlideList();
      loadCurrentSlide();
      showNotification('新项目已创建');
    }
  }

  function toggleSidebarVisibility() {
    els.sidebar.classList.toggle('collapsed');
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

  function toggleTheme() {
    const current = app.themeManager.getCurrentThemeName();
    const next = current === 'dark' ? 'light' : 'dark';
    app.themeManager.setTheme(next);
    localStorage.setItem('theme', next);
    const icon = els.themeToggle.querySelector('i');
    icon.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  // --- Check URL params for shared presentations ---

  function checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    const data = params.get('data');
    if (mode === 'presentation' && data) {
      try {
        const decoded = JSON.parse(atob(data));
        app.import(decoded, 'json');
        updateSlideList();
        enterPresentationMode();
      } catch (e) {
        showNotification('演示数据加载失败', true);
      }
    }
  }

  // --- Event bindings ---

  // Initialize
  await app.initialize();

  // Load initial data
  const savedData = app.storage.loadProject();
  if (savedData && savedData.slides) {
    updateSlideList();
    loadCurrentSlide();
  } else {
    app.addSlide({
      html: '<div class="slide-content">\n  <h1>欢迎使用 HTML PPT</h1>\n  <p>在左侧代码编辑器中编写HTML，右侧实时预览</p>\n</div>',
    });
    updateSlideList();
    loadCurrentSlide();
  }

  updateUndoRedoButtons();
  initResizer();
  checkUrlParams();

  // Toolbar buttons
  els.addSlide.addEventListener('click', () => {
    app.addSlide({
      html: '<div class="slide-content">\n  <h1>新幻灯片</h1>\n  <p>在此处编辑您的内容</p>\n</div>',
    });
    updateSlideList();
    loadCurrentSlide();
  });
  els.presentBtn.addEventListener('click', enterPresentationMode);
  els.saveBtn.addEventListener('click', saveToFile);
  els.openBtn.addEventListener('click', () => els.fileInput.click());
  els.newBtn.addEventListener('click', createNewProject);
  els.undoBtn.addEventListener('click', () => {
    app.history.undo();
    updateUndoRedoButtons();
  });
  els.redoBtn.addEventListener('click', () => {
    app.history.redo();
    updateUndoRedoButtons();
  });
  els.autoSaveToggle.addEventListener('click', toggleAutoSave);
  els.themeToggle.addEventListener('click', toggleTheme);
  els.toggleSidebar.addEventListener('click', toggleSidebarVisibility);
  els.fileInput.addEventListener('change', handleFileSelect);

  // Code editor
  els.codeEditor.addEventListener('input', () => {
    const slide = app.slideManager.getCurrentSlide();
    if (slide) {
      slide.html = els.codeEditor.value;
      app.autoSave.save();
    }
    updatePreview();
  });

  // Presentation controls
  els.prevSlideBtn.addEventListener('click', showPreviousSlide);
  els.nextSlideBtn.addEventListener('click', showNextSlide);
  els.sharePresentationBtn.addEventListener('click', showShareModal);
  els.closeShareModal.addEventListener('click', hideShareModal);
  els.cancelShare.addEventListener('click', hideShareModal);
  els.copyShareLink.addEventListener('click', copyShareLinkToClipboard);

  // FAB
  els.fabMain.addEventListener('click', () => {
    els.fabOptions.classList.toggle('show');
    els.fabIcon.classList.toggle('fa-plus');
    els.fabIcon.classList.toggle('fa-times');
  });
  els.fabSave.addEventListener('click', () => {
    saveToFile();
    els.fabOptions.classList.remove('show');
    els.fabIcon.classList.remove('fa-times');
    els.fabIcon.classList.add('fa-plus');
  });
  els.fabPresent.addEventListener('click', () => {
    enterPresentationMode();
    els.fabOptions.classList.remove('show');
    els.fabIcon.classList.remove('fa-times');
    els.fabIcon.classList.add('fa-plus');
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && els.presentationMode.style.display === 'flex') {
      exitPresentationMode();
    }
    if (els.presentationMode.style.display === 'flex') {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') showNextSlide();
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') showPreviousSlide();
    }
    if (e.ctrlKey && e.key === 's') { e.preventDefault(); saveToFile(); }
    if (e.ctrlKey && e.key === 'o') { e.preventDefault(); els.fileInput.click(); }
    if (e.ctrlKey && e.key === 'n') { e.preventDefault(); createNewProject(); }
    if (e.ctrlKey && !e.shiftKey && e.key === 'z') { e.preventDefault(); app.history.undo(); updateUndoRedoButtons(); }
    if (e.ctrlKey && e.shiftKey && e.key === 'z') { e.preventDefault(); app.history.redo(); updateUndoRedoButtons(); }
    if (e.ctrlKey && e.key === 'b') { e.preventDefault(); toggleSidebarVisibility(); }
  });

  console.log(`HTML PPT v${version} initialized`);
});
