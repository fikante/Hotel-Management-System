// setupTests.js
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};