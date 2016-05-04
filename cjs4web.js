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

fs.readdir(node_modules, (err, dirs) => {

  for (let i = 0; i < dirs.length; ++i) {
    const dir = path.join(node_modules, dirs[i]);

    const package_json = path.join(dir, 'package.json');

    fs.readFile(package_json, 'utf8', (err, jsonData) => {
      const json = JSON.parse(jsonData);

      const main = path.join(dir, json['main'] || 'index.js');

      console.log(main);
    });
  }
});
