var fs = require('fs');
var exec = require('child_process').exec;
var Promise = require('promise');

var folder = __dirname + '/admin-react/us/';

fs
.readdir(folder, function(err, files) {
  files.map(function(file) {

    var ArrowFunction = function(){
      return new Promise(function(resolve) {
        exec('jscodeshift --inline-single-expressions=true -t js-codemod/transforms/arrow-function.js ' + folder + file , function(error, stdout, stderr) {
          console.log(error, stdout, stderr);
          return resolve();
        });
      })
    }

    var noVars = function() {
      return exec('jscodeshift --inline-single-expressions=true -t js-codemod/transforms/no-vars.js ' + folder + file , function(error, stdout, stderr) {
        console.log(error, stdout, stderr);
        return Promise.resolve();
      });
    }

    var objectShorthand = function() {
      return exec('jscodeshift --inline-single-expressions=true -t js-codemod/transforms/object-shorthand.js ' + folder + file , function(error, stdout, stderr) {
        console.log(error, stdout, stderr);
        return Promise.resolve();
      });
    }

    var templateLiterals = function() {
      return exec('jscodeshift --inline-single-expressions=true -t js-codemod/transforms/template-literals.js ' + folder + file , function(error, stdout, stderr) {
        console.log(error, stdout, stderr);
        return Promise.resolve();
      });
    }

    var unquoteProperties = function() {
      return exec('jscodeshift --inline-single-expressions=true -t js-codemod/transforms/unquote-properties.js ' + folder + file , function(error, stdout, stderr) {
        console.log(error, stdout, stderr);
        return Promise.resolve();
      });
    }

    var useStrict =  function() {
      return exec('jscodeshift --inline-single-expressions=true -t js-codemod/transforms/use-strict.js ' + folder + file , function(error, stdout, stderr) {
        console.log(error, stdout, stderr);
        return Promise.resolve();
      });
    }

    var rmRequires = function() {
      return exec('jscodeshift --inline-single-expressions=true -t js-codemod/transforms/rm-requires.js ' + folder + file , function(error, stdout, stderr) {
        console.log(error, stdout, stderr);
        return Promise.resolve();
      });
    }

    ArrowFunction()
    .then(noVars)
    .then(objectShorthand)
    .then(templateLiterals)
    .then(unquoteProperties)
    .then(useStrict)
    .then(rmRequires);

  });
});
