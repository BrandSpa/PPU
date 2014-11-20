var lang;

window.ppu = {};

ppu.pathUrl = window.location.pathname.split('/');

lang = ppu.pathUrl[1];

if (lang === "en") {
  $.ajaxSetup({
    data: {
      lang: "en"
    }
  });
}

Backbone.View.prototype.en = function() {
  lang = ppu.pathUrl[1];
  if (lang === "en") {
    return true;
  } else {
    return false;
  }
};
