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

const node_modules = path.join(root, 'node_modules');
const outRoot = path.join(root, 'build');

// TODO: switch to promises
fs.mkdir(outRoot, (err) => {
  //if (err) throw err;

  fs.mkdir(path.join(outRoot, 'node_modules'), (err) => {
    //if (err) throw err;

    fs.readdir(node_modules, (err, dirs) => {
      if (err) throw err;

      for (let i = 0; i < dirs.length; ++i) {
        const dir = path.join(node_modules, dirs[i]);
        const package_json = path.join(dir, 'package.json');

        fs.readFile(package_json, 'utf8', (err, jsonData) => {
          if (err) throw err;

          const json = JSON.parse(jsonData);
          const main = path.join(dir, json['main'] || 'index.js');

          fs.readFile(main, 'utf8', (err, data) => {
            if (err) throw err;

            const outDir = path.join(outRoot, dir);
            fs.mkdir(outDir, (err) => {
              //if (err) throw err;

              const outFile = path.join(outRoot, main);

              // Wrap all modules in a closure
              const exposedVariables = 'require,exports,module';
              const newData = `((${exposedVariables}) => {${data}\n})(${exposedVariables});`;

              fs.writeFile(outFile, newData, (err) => {
                if (err) throw err;
              });
            });
          });

          console.log(main);
        });
      }
    });
  });
});
