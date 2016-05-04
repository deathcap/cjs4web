'use strict';

const ucfirst = require('ucfirst');
document.write(ucfirst('hello world'));

const asarray = require('asarray');
console.log(asarray([1,2,3]));

const uniq = require('uniq');
console.log(uniq([1, 1, 2, 2, 3, 5]));

console.log('global leak? (should be undefined):', typeof unique_pred); // expect to be undefined if require('uniq') doesn't leak globals
