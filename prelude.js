(() => {
'use strict';

function resolvePath(name) {
  let path;
  // TODO: a real resolution algorithm, search node_modules?
  if (name === 'ucfirst') {
    path = 'file:///Users/admin/games/voxeljs/cjs4web/node_modules/ucfirst/ucfirst.js';
  }
  return path;
}

window.require = (name) => {
  console.log('requiring ',name);
  const path = resolvePath(name);
  const module = window.__modules[path];

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
})();
