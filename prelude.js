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

window.__filename = 'TODO: __filename'; // string
window.__dirname = 'TODO: __dirname'; // string
window.global = window;
window.process = 'TODO: process'; // module
window.Buffer = 'TODO: Buffer'; // module

window.__modules = window.__modules || {};
})();
