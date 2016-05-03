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

window.__modules = window.__modules || {};
window.__allowedGlobals = Object.keys(window);
})();
