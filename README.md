# cjs4web

Failed attempt at implementing the [Node.js CommonJS require() module system](https://nodejs.org/api/modules.html) for the
browser, without any build step

For a working tool, see [browserify](http://browserify.org) (requires a build step), or for
the future, see ES6 modules / [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)/export
and `<script type="module">`.

The main problem with using ordinary browser `<script>` tags to include unmodified CommonJS modules
is that `<script>` executes the script in the global context (`window`).

`function foo()` will create a new function `window.foo`, and you cannot `delete foo` later since
[function declarations cannot be deleted](http://stackoverflow.com/questions/16498247/javascript-delete-a-function).
`window.foo` can be reassigned (`window.foo = null`), but then any calls to that function will
fail.

Browserify's solution is to wrap CommonJS modules in an
[immediately-invoked function expression](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression),
therefore creating a new scope and avoiding the module from polluting the global scope. This means
a build step is required, to add `(function() { ... })();` around the module source code, so
`<script src>` cannot be used directly on the original CommonJS module files.

(XMLHttpRequest / fetch + [eval](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) is
another possible "solution", with its own issues.)

## License

MIT
