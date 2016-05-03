(() => {
'use strict';

function getScriptPath() {
  // Get the script executed directly before us
  const scripts = document.getElementsByTagName('script');
  const moduleScript = scripts[scripts.length - 2];
  //console.log('moduleScript',moduleScript);
  const src = moduleScript.src;

  return src;
}

function saveModule() {
  window.__modules = window.__modules || {};
  window.__modules[getScriptPath()] = module;
}

saveModule();

delete window.require;
delete window.module;
delete window.exports;
})();
