if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}
if (!window.Promise) {
  document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"></script>')
}

// init vConsole
var vConsole = new VConsole();
// console.log('Hello world');