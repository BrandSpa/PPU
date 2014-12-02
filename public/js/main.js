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

Backbone.View.prototype.showErrors = function(model, response) {
  var errors;
  errors = JSON.parse(response.responseText);
  return _.each(errors, function(message, row) {
    return toastr.error(message);
  });
};

$(document).ajaxSend(function(e, xhr, options) {
  var token;
  token = $("meta[name='csrf-token']").attr("content");
  return xhr.setRequestHeader("X-CSRF-Token", token);
});

$(document).find('.datepicker-year').datepicker({
  format: 'yyyy',
  viewMode: "years",
  minViewMode: "years",
  language: 'es',
  autoclose: true
});
