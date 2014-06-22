/* global require, module */
var pickFiles  = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

// facebook
app.import('vendor/facebook/index.js');

// Ember Simple Authentication
app.import('vendor/ember-simple-auth/ember-simple-auth.js');

// bootstrap
app.import('vendor/bootstrap/dist/js/bootstrap.js');
app.import('vendor/bootstrap/dist/css/bootstrap.css');
app.import('vendor/bootstrap/dist/css/social-buttons.css');
var bootstrapTree = pickFiles('vendor/bootstrap/dist/fonts', {
    srcDir  : '/',
    files   : ['**/*'],
    destDir : '/fonts'
});
// font-awesome
app.import('vendor/font-awesome/css/font-awesome.css');
var fontawesomeTree = pickFiles('vendor/font-awesome/fonts', {
	srcDir  : '/',
    files   : ['**/*'],
    destDir : '/fonts'
});

module.exports = mergeTrees([app.toTree(), bootstrapTree, fontawesomeTree]);
