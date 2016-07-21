'use strict';

const url = window.location.href;
let lang = url.match(/:\/\/(.[^/]+)/)[1].split('.')[0];
if(lang !== 'en') {
  lang = 'es';
}
module.exports = lang;
