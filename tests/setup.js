// Jest setup file
global.HTMLPPT = {
  version: '1.0.0'
};

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock window methods
window.alert = jest.fn();
window.confirm = jest.fn(() => true);
window.prompt = jest.fn(() => '');
