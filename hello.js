'use strict';

const ucfirst = require('ucfirst');
console.log(ucfirst('hello world'));

const asarray = require('asarray');
console.log(asarray([1,2,3]));

const uniq = require('uniq');
console.log(uniq([1, 1, 2, 2, 3, 5]));

if (typeof unique_pred !== 'undefined') { 
  console.error('global leak!'); // require('uniq') shouldn't leak globals
}

console.log('buffer=',new Buffer('ABC'));
