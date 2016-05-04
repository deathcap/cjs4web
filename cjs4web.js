'use strict';

const fs = require('fs');
const path = require('path');

/*
if (process.argv.length < 3) {
  process.stderr.write(`usage: ${process.argv[1]} path\n`);
  process.exit(1);
}
*/

const root = process.argv[2] || '.';

const outRoot = path.join(root, 'build');

const insertGlobalVars = 
  // needed for CommonJS modles
  'require,exports,module' +
  // other Node.js default globals, from --insert-global-vars https://github.com/substack/node-browserify
  ',__filename,__dirname,process,Buffer,global';


// TODO: switch to promises
fs.mkdir(outRoot, (err) => {
  //if (err) throw err;

  processPackage(root, outRoot);
});

function processPackage(dir, outRoot) {
  // Process top-level file
  const package_json = path.join(dir, 'package.json'); // TODO: read index.js if not present
  fs.readFile(package_json, 'utf8', (err, jsonData) => {
    if (err) throw err;

    const json = JSON.parse(jsonData);
    const main = path.join(dir, json['main'] || 'index.js');
    // TODO: read other non-main packages

    fs.readFile(main, 'utf8', (err, data) => {
      if (err) throw err;

      const outDir = path.join(outRoot, dir);
      fs.mkdir(outDir, (err) => {
        //if (err) throw err;

        const outFile = path.join(outRoot, main);

        // Wrap all modules in a closure
        const newData = `((${insertGlobalVars}) => {${data}\n})(${insertGlobalVars});`;

        fs.writeFile(outFile, newData, (err) => {
          if (err) throw err;
        });
      });
    });
  });

  // If package has a node_modules, recurse into it
  const node_modules = path.join(dir, 'node_modules');
  fs.access(node_modules, fs.F_OK, (err) => {
    if (err) return; // has no node_modules

    fs.mkdir(path.join(outRoot, 'node_modules'), (err) => {
      //if (err) throw err;

      fs.readdir(node_modules, (err, dirs) => {
        if (err) throw err;

        for (let i = 0; i < dirs.length; ++i) {
          const dir = path.join(node_modules, dirs[i]);

          processPackage(dir, outRoot);
        }
      });
    });
  });
}
