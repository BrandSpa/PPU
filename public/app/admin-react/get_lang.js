'use strict';

var url = window.location.href;
var lang = url.match(/:\/\/(.[^/]+)/)[1].split('.')[0]
if(lang !== 'en') {
  lang = 'es';
}
module.exports = lang;
