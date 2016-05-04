(() => {
'use strict';

function getPriorScript() {
  // Get the script executed directly before us
  const scripts = document.getElementsByTagName('script');
  const moduleScript = scripts[scripts.length - 2];

  return moduleScript;
}

function saveModule() {
  const script = getPriorScript();
  //const path = script.src;
  const name = script.getAttribute('data-module-name');

  console.log(`saving ${name}`);
  window.__modules[name] = module;
}

saveModule();

delete window.require;
delete window.module;
delete window.exports;
})();
