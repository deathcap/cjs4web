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

const allowedGlobals = window.__allowedGlobals;
const toDelete = [];
for (let key of Object.keys(window)) {
  if (!allowedGlobals.includes(key)) {
    toDelete.push(key);
  }
}

for (let key of toDelete) {
  console.log(`killing global ${key}`);
  if (typeof window[key] === 'function') {
    // As part of language specification http://stackoverflow.com/questions/16498247/javascript-delete-a-function
    // cannot delete functions, but can reassign to null, hopefully get garbage-collected
    // TODO: but then, uniq.js calls unique_ed() and it is not a function :(
    //window[key] = null;
  } else {
    delete window[key];
  }
}

delete window.require;
delete window.module;
delete window.exports;
delete window.__savedGlobals;
})();
