let slides = [];
let currentSlideIndex = 0;

let history = [];
let historyIndex = -1;
const MAX_HISTORY = 50;

let autoSaveEnabled = true;
let autoSaveTimer = null;
const AUTO_SAVE_INTERVAL = 30000;

const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const toggleSidebar = document.getElementById('toggleSidebar');
const slidesList = document.getElementById('slidesList');
const codeEditor = document.getElementById('codeEditor');
const previewArea = document.getElementById('previewArea');
const addSlideBtn = document.getElementById('addSlide');
const presentBtn = document.getElementById('presentBtn');
const saveBtn = document.getElementById('saveBtn');
const openBtn = document.getElementById('openBtn');
const newBtn = document.getElementById('newBtn');
const undoBtn = document.getElementById('undoBtn');
const redoBtn = document.getElementById('redoBtn');
const autoSaveToggle = document.getElementById('autoSaveToggle');
const themeToggle = document.getElementById('themeToggle');
const fileInput = document.getElementById('fileInput');
const presentationMode = document.getElementById('presentationMode');
const presentationSlide = document.getElementById('presentationSlide');
const presentationHint = document.getElementById('presentationHint');
const notification = document.getElementById('notification');
const autoSaveIndicator = document.getElementById('autoSaveIndicator');
const resizer = document.getElementById('resizer');
const codeEditorPanel = document.getElementById('codeEditorPanel');
const previewPanel = document.getElementById('previewPanel');
const fabMain = document.getElementById('fabMain');
const fabOptions = document.getElementById('fabOptions');
const fabIcon = document.getElementById('fabIcon');
const fabSave = document.getElementById('fabSave');
const fabPresent = document.getElementById('fabPresent');
const prevSlideBtn = document.getElementById('prevSlideBtn');
const nextSlideBtn = document.getElementById('nextSlideBtn');
const sharePresentationBtn = document.getElementById('sharePresentationBtn');
const currentSlideNum = document.getElementById('currentSlideNum');
const totalSlides = document.getElementById('totalSlides');
const shareModal = document.getElementById('shareModal');
const closeShareModal = document.getElementById('closeShareModal');
const cancelShare = document.getElementById('cancelShare');
const shareLink = document.getElementById('shareLink');
const copyShareLink = document.getElementById('copyShareLink');

loadFromLocalStorage();
setupAutoSave();
updateUndoRedoButtons();
initResizer();

fabMain.addEventListener('click', function () {
  fabOptions.classList.toggle('show');
  fabIcon.classList.toggle('fa-plus');
  fabIcon.classList.toggle('fa-times');
});

fabSave.addEventListener('click', function () {
  saveToFile();
  fabOptions.classList.remove('show');
  fabIcon.classList.remove('fa-times');
  fabIcon.classList.add('fa-plus');
});

fabPresent.addEventListener('click', function () {
  enterPresentationMode();
  fabOptions.classList.remove('show');
  fabIcon.classList.remove('fa-times');
  fabIcon.classList.add('fa-plus');
});

codeEditor.addEventListener('input', function () {
  updatePreview();
  addToHistory();
});

addSlideBtn.addEventListener('click', addNewSlide);
presentBtn.addEventListener('click', enterPresentationMode);
saveBtn.addEventListener('click', saveToFile);
openBtn.addEventListener('click', () => fileInput.click());
newBtn.addEventListener('click', createNewProject);
undoBtn.addEventListener('click', undo);
redoBtn.addEventListener('click', redo);
autoSaveToggle.addEventListener('click', toggleAutoSave);
themeToggle.addEventListener('click', toggleTheme);
toggleSidebar.addEventListener('click', toggleSidebarVisibility);
fileInput.addEventListener('change', handleFileSelect);

prevSlideBtn.addEventListener('click', showPreviousSlide);
nextSlideBtn.addEventListener('click', showNextSlide);
sharePresentationBtn.addEventListener('click', showShareModal);
closeShareModal.addEventListener('click', hideShareModal);
cancelShare.addEventListener('click', hideShareModal);
copyShareLink.addEventListener('click', copyShareLinkToClipboard);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && presentationMode.style.display === 'flex') {
    exitPresentationMode();
  }

  if (presentationMode.style.display === 'flex') {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') showNextSlide();
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') showPreviousSlide();
  }

  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    saveToFile();
  }

  if (e.ctrlKey && e.key === 'o') {
    e.preventDefault();
    fileInput.click();
  }

  if (e.ctrlKey && e.key === 'n') {
    e.preventDefault();
    createNewProject();
  }

  if (e.ctrlKey && !e.shiftKey && e.key === 'z') {
    e.preventDefault();
    undo();
  }

  if (e.ctrlKey && e.shiftKey && e.key === 'z') {
    e.preventDefault();
    redo();
  }

  if (e.ctrlKey && e.key === 'b') {
    e.preventDefault();
    toggleSidebarVisibility();
  }
});

function addNewSlide() {
  const newSlide = {
    id: Date.now(),
    html: '<div class="slide-content">\n    <h1>新幻灯片</h1>\n    <p>在此处编辑您的内容</p>\n</div>',
    title: `幻灯片 ${slides.length + 1}`,
  };

  slides.push(newSlide);
  addToHistory();
  renderSlidesList();
  switchToSlide(slides.length - 1);
  showNotification('幻灯片已添加');
}

function renderSlidesList() {
  slidesList.innerHTML = '';

  if (slides.length === 0) {
    slidesList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-image"></i>
                <h3>暂无幻灯片</h3>
                <p>点击"新建幻灯片"按钮开始创建您的演示文稿</p>
            </div>
        `;
    return;
  }

  slides.forEach((slide, index) => {
    const slideElement = document.createElement('div');
    slideElement.className = `slide-item ${index === currentSlideIndex ? 'active' : ''}`;
    slideElement.dataset.id = slide.id;
    slideElement.draggable = true;

    const previewText = slide.html.replace(/<[^>]*>/g, '').substring(0, 100) + '...';

    slideElement.innerHTML = `
            <div class="slide-number">
                <span>${index + 1}. ${slide.title}</span>
                <div class="slide-actions">
                    <button class="export-img-btn tooltip" data-tooltip="导出为图片"><i class="fas fa-image"></i></button>
                    <button class="add-above tooltip" data-tooltip="在上方添加"><i class="fas fa-arrow-up"></i></button>
                    <button class="add-below tooltip" data-tooltip="在下方添加"><i class="fas fa-arrow-down"></i></button>
                    <button class="delete-slide tooltip" data-tooltip="删除"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="preview">${previewText}</div>
        `;

    slideElement.addEventListener('click', () => switchToSlide(index));

    const exportImgBtn = slideElement.querySelector('.export-img-btn');
    const addAboveBtn = slideElement.querySelector('.add-above');
    const addBelowBtn = slideElement.querySelector('.add-below');
    const deleteBtn = slideElement.querySelector('.delete-slide');

    exportImgBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      exportSlideAsImage(index);
    });

    addAboveBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      addSlideAtPosition(index);
    });

    addBelowBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      addSlideAtPosition(index + 1);
    });

    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteSlide(index);
    });

    slideElement.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', index);
      slideElement.classList.add('dragging');
    });

    slideElement.addEventListener('dragend', () => {
      slideElement.classList.remove('dragging');
    });

    slideElement.addEventListener('dragover', (e) => {
      e.preventDefault();
      slideElement.classList.add('drag-over');
    });

    slideElement.addEventListener('dragleave', () => {
      slideElement.classList.remove('drag-over');
    });

    slideElement.addEventListener('drop', (e) => {
      e.preventDefault();
      slideElement.classList.remove('drag-over');

      const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
      const toIndex = index;

      if (fromIndex !== toIndex) {
        moveSlide(fromIndex, toIndex);
      }
    });

    slidesList.appendChild(slideElement);
  });
}

function addSlideAtPosition(position) {
  const newSlide = {
    id: Date.now(),
    html:
      '<div class="slide-content">\n    <h2>新幻灯片</h2>\n    <p>在位置' +
      (position + 1) +
      '添加的新幻灯片</p>\n</div>',
    title: `幻灯片 ${slides.length + 1}`,
  };

  slides.splice(position, 0, newSlide);
  currentSlideIndex = position;

  addToHistory();
  renderSlidesList();
  switchToSlide(currentSlideIndex);
  showNotification('幻灯片已添加');
}

function moveSlide(fromIndex, toIndex) {
  if (fromIndex === toIndex) return;

  const slide = slides.splice(fromIndex, 1)[0];
  slides.splice(toIndex, 0, slide);

  if (currentSlideIndex === fromIndex) {
    currentSlideIndex = toIndex;
  } else if (fromIndex < currentSlideIndex && toIndex >= currentSlideIndex) {
    currentSlideIndex--;
  } else if (fromIndex > currentSlideIndex && toIndex <= currentSlideIndex) {
    currentSlideIndex++;
  }

  addToHistory();
  renderSlidesList();
  showNotification('幻灯片顺序已调整');
}

function switchToSlide(index) {
  if (index >= 0 && index < slides.length) {
    currentSlideIndex = index;
    codeEditor.value = slides[currentSlideIndex].html;
    updatePreview();
    renderSlidesList();
  }
}

function deleteSlide(index) {
  if (slides.length <= 1) {
    showNotification('至少需要保留一个幻灯片', true);
    return;
  }

  slides.splice(index, 1);

  if (currentSlideIndex >= index) {
    currentSlideIndex = Math.max(0, currentSlideIndex - 1);
  }

  addToHistory();
  renderSlidesList();
  switchToSlide(currentSlideIndex);
  showNotification('幻灯片已删除');
}

function updatePreview() {
  const htmlContent = codeEditor.value;
  slides[currentSlideIndex].html = htmlContent;

  const previewDocument = previewArea.contentDocument || previewArea.contentWindow.document;
  previewDocument.open();
  previewDocument.write(htmlContent);
  previewDocument.close();

  renderSlidesList();
}

function saveToFile() {
  if (slides.length === 0) {
    showNotification('没有幻灯片可保存', true);
    return;
  }

  try {
    const projectData = {
      version: '1.0',
      savedAt: new Date().toISOString(),
      slides: slides,
    };

    const jsonData = JSON.stringify(projectData, null, 2);

    const blob = new Blob([jsonData], { type: 'application/json' });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `html-ppt-project-${new Date().toISOString().slice(0, 10)}.htmlppt`;

    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    }, 100);

    showNotification('项目已保存');
  } catch (error) {
    console.error('保存错误:', error);
    showNotification('保存失败: ' + error.message, true);
  }
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      const contents = e.target.result;
      const projectData = JSON.parse(contents);

      if (!projectData.slides || !Array.isArray(projectData.slides)) {
        throw new Error('无效的项目文件格式');
      }

      slides = projectData.slides;
      currentSlideIndex = 0;

      addToHistory();
      renderSlidesList();
      switchToSlide(currentSlideIndex);

      saveToLocalStorage();

      showNotification('项目已加载');
    } catch (error) {
      console.error('文件加载错误:', error);
      showNotification('加载失败: ' + error.message, true);
    }
  };

  reader.onerror = function () {
    showNotification('读取文件时发生错误', true);
  };

  reader.readAsText(file);

  event.target.value = '';
}

function exportSlideAsImage(index) {
  if (index < 0 || index >= slides.length) return;

  showNotification('导出图片功能需要html2canvas库支持', true);
}

function createNewProject() {
  if (confirm('创建新项目将丢失当前未保存的更改。确定要继续吗？')) {
    slides = [];
    currentSlideIndex = 0;
    history = [];
    historyIndex = -1;

    localStorage.removeItem('htmlPptProject');

    addNewSlide();

    showNotification('已创建新项目');
  }
}

function enterPresentationMode() {
  if (slides.length === 0) {
    showNotification('没有幻灯片可演示', true);
    return;
  }

  presentationMode.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  currentSlideNum.textContent = currentSlideIndex + 1;
  totalSlides.textContent = slides.length;

  if (presentationMode.requestFullscreen) {
    presentationMode.requestFullscreen().catch((err) => {
      console.log('全屏请求错误:', err);
    });
  } else if (presentationMode.webkitRequestFullscreen) {
    presentationMode.webkitRequestFullscreen();
  } else if (presentationMode.msRequestFullscreen) {
    presentationMode.msRequestFullscreen();
  }

  loadCurrentSlideInPresentation();

  setTimeout(() => {
    presentationHint.style.opacity = 0;
  }, 3000);
}

function exitPresentationMode() {
  presentationMode.style.display = 'none';
  document.body.style.overflow = 'auto';

  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function loadCurrentSlideInPresentation() {
  let htmlContent = slides[currentSlideIndex].html;

  htmlContent = htmlContent.replace(/<title>.*?<\/title>/i, '');

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;

  let bodyContent = '';
  const bodyElement = tempDiv.querySelector('body');
  if (bodyElement) {
    bodyContent = bodyElement.innerHTML;
  } else {
    bodyContent = htmlContent;
  }

  let styleContent = '';
  const styleElements = tempDiv.querySelectorAll('style');
  styleElements.forEach((style) => {
    styleContent += style.outerHTML;
  });

  const presentationDocument =
    presentationSlide.contentDocument || presentationSlide.contentWindow.document;
  presentationDocument.open();
  presentationDocument.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    min-height: 100vh;
                    overflow: auto;
                }
                html, body {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    min-height: 100vh;
                }
            </style>
            ${styleContent}
        </head>
        <body>
            ${bodyContent}
        </body>
        </html>
    `);
  presentationDocument.close();
}

function showPreviousSlide() {
  if (currentSlideIndex > 0) {
    switchToSlide(currentSlideIndex - 1);
    loadCurrentSlideInPresentation();
    currentSlideNum.textContent = currentSlideIndex + 1;
  }
}

function showNextSlide() {
  if (currentSlideIndex < slides.length - 1) {
    switchToSlide(currentSlideIndex + 1);
    loadCurrentSlideInPresentation();
    currentSlideNum.textContent = currentSlideIndex + 1;
  }
}

function showShareModal() {
  const projectData = {
    version: '1.0',
    savedAt: new Date().toISOString(),
    slides: slides,
  };

  const jsonData = JSON.stringify(projectData);
  const encodedData = btoa(unescape(encodeURIComponent(jsonData)));

  const shareUrl = `${window.location.origin}${window.location.pathname}?mode=presentation&data=${encodedData}`;

  shareLink.value = shareUrl;
  shareModal.style.display = 'flex';
}

function hideShareModal() {
  shareModal.style.display = 'none';
}

function copyShareLinkToClipboard() {
  shareLink.select();
  document.execCommand('copy');
  showNotification('链接已复制到剪贴板');
}

function showNotification(message, isError = false) {
  notification.innerHTML = `
        <i class="fas ${isError ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
        <span>${message}</span>
    `;
  notification.style.backgroundColor = isError ? '#e63946' : '#28a745';
  notification.className = 'notification show';

  setTimeout(() => {
    notification.className = 'notification';
  }, 3000);
}

function addToHistory() {
  if (historyIndex < history.length - 1) {
    history = history.slice(0, historyIndex + 1);
  }

  history.push(JSON.parse(JSON.stringify(slides)));

  if (history.length > MAX_HISTORY) {
    history.shift();
  }

  historyIndex = history.length - 1;
  updateUndoRedoButtons();
}

function undo() {
  if (historyIndex > 0) {
    historyIndex--;
    slides = JSON.parse(JSON.stringify(history[historyIndex]));
    renderSlidesList();
    switchToSlide(currentSlideIndex);
    updateUndoRedoButtons();
    showNotification('已撤销');
  }
}

function redo() {
  if (historyIndex < history.length - 1) {
    historyIndex++;
    slides = JSON.parse(JSON.stringify(history[historyIndex]));
    renderSlidesList();
    switchToSlide(currentSlideIndex);
    updateUndoRedoButtons();
    showNotification('已重做');
  }
}

function updateUndoRedoButtons() {
  undoBtn.disabled = historyIndex <= 0;
  redoBtn.disabled = historyIndex >= history.length - 1;

  undoBtn.style.opacity = undoBtn.disabled ? '0.5' : '1';
  redoBtn.style.opacity = redoBtn.disabled ? '0.5' : '1';
}

function setupAutoSave() {
  if (autoSaveTimer) {
    clearInterval(autoSaveTimer);
  }

  if (autoSaveEnabled) {
    autoSaveTimer = setInterval(() => {
      saveToLocalStorage();
      autoSaveIndicator.className = 'auto-save-indicator show';
      setTimeout(() => {
        autoSaveIndicator.className = 'auto-save-indicator';
      }, 2000);
    }, AUTO_SAVE_INTERVAL);
  }
}

function toggleAutoSave() {
  autoSaveEnabled = !autoSaveEnabled;

  if (autoSaveEnabled) {
    autoSaveToggle.classList.add('on');
    autoSaveToggle.innerHTML = '<i class="fas fa-toggle-on"></i>';
    setupAutoSave();
    showNotification('自动保存已开启');
  } else {
    autoSaveToggle.classList.remove('on');
    autoSaveToggle.innerHTML = '<i class="fas fa-toggle-off"></i>';
    if (autoSaveTimer) {
      clearInterval(autoSaveTimer);
    }
    showNotification('自动保存已关闭');
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', 'light');
    showNotification('已切换到亮色主题');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', 'dark');
    showNotification('已切换到暗色主题');
  }
}

function toggleSidebarVisibility() {
  sidebar.classList.toggle('collapsed');
  if (sidebar.classList.contains('collapsed')) {
    toggleSidebar.innerHTML = '<i class="fas fa-chevron-right"></i>';
  } else {
    toggleSidebar.innerHTML = '<i class="fas fa-chevron-left"></i>';
  }
}

function initResizer() {
  const editor = codeEditorPanel;
  const preview = previewPanel;
  let isResizing = false;

  resizer.addEventListener('mousedown', function (e) {
    isResizing = true;
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
  });

  function handleResize(e) {
    if (!isResizing) return;

    const containerRect = document.querySelector('.editor-container').getBoundingClientRect();
    const dx = e.clientX - containerRect.left;
    const containerWidth = containerRect.width;

    const editorPercent = (dx / containerWidth) * 100;
    const previewPercent = 100 - editorPercent;

    editor.style.flex = `0 0 ${editorPercent}%`;
    preview.style.flex = `0 0 ${previewPercent}%`;

    e.preventDefault();
  }

  function stopResize() {
    isResizing = false;
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', stopResize);
  }
}

function saveToLocalStorage() {
  if (slides.length > 0) {
    const projectData = {
      version: '1.0',
      savedAt: new Date().toISOString(),
      slides: slides,
    };

    localStorage.setItem('htmlPptProject', JSON.stringify(projectData));
  }
}

function loadFromLocalStorage() {
  try {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    const savedData = localStorage.getItem('htmlPptProject');
    if (savedData) {
      const projectData = JSON.parse(savedData);

      if (
        projectData.slides &&
        Array.isArray(projectData.slides) &&
        projectData.slides.length > 0
      ) {
        slides = projectData.slides;
        currentSlideIndex = 0;
        renderSlidesList();
        switchToSlide(currentSlideIndex);

        addToHistory();

        showNotification('已恢复自动保存的项目');
        return;
      }
    }
  } catch (error) {
    console.error('加载本地存储错误:', error);
  }

  addNewSlide();
}

updatePreview();

function checkUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get('mode');
  const data = urlParams.get('data');

  if (mode === 'presentation' && data) {
    try {
      const jsonData = decodeURIComponent(atob(data));
      const projectData = JSON.parse(jsonData);

      if (projectData.slides && Array.isArray(projectData.slides)) {
        slides = projectData.slides;
        currentSlideIndex = 0;
        renderSlidesList();
        switchToSlide(currentSlideIndex);

        setTimeout(() => {
          enterPresentationMode();
        }, 500);
      }
    } catch (error) {
      console.error('URL参数解析错误:', error);
      showNotification('演示数据加载失败', true);
    }
  }
}
