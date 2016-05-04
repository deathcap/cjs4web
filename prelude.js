(() => {
'use strict';

window.require = (name) => {
  console.log('requiring ',name);
  const module = window.__modules[name];

  console.log(`resolved ${name} -> ${module}`);

  if (!module) {
    throw new Error(`require(${name}): module not found`);
  }

  return module.exports;
};

window.exports = {};

window.module = {
  exports: window.exports,
};

function getRunningScript() {
  const scripts = document.getElementsByTagName('script');
  const script = scripts[scripts.length - 1];
  return script;
}

delete window.__filename;
Object.defineProperty(window, '__filename', {
  configurable: true,
  get: () => {
    return getRunningScript().src;
  },
});

delete window.__dirname;
Object.defineProperty(window, '__dirname', {
  configurable: true,
  get: () => {
    return getRunningScript().src; // TODO: strip off last path element
  },
});

window.global = window;
window.process = 'TODO: process'; // module
window.Buffer = 'TODO: Buffer'; // module

window.__modules = window.__modules || {};
})();
