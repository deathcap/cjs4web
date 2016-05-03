(() => {
'use strict';

function getScriptPath() {
  // Get the script executed directly before us
  const scripts = document.getElementsByTagName('script');
  const moduleScript = scripts[scripts.length - 2];
  const src = moduleScript.src;

  return src;
}

function saveModule() {
  const path = getScriptPath();
  window.__modules = window.__modules || {};
  console.log(`saving ${path}`);
  window.__modules[path] = module;
}

saveModule();

delete window.require;
delete window.module;
delete window.exports;
})();
