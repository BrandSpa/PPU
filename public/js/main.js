var lang;

window.ppu = {};

Dropzone.autoDiscover = false;

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

Backbone.View.prototype.closeModal = function() {
  this.remove();
  $('.modal-backdrop').remove();
  $('body').removeClass('modal-open');
  return ppu.appendDatePickerYear = function() {
    $(document).find('.datepicker-year').datepicker;
    return {
      format: 'yyyy',
      viewMode: "years",
      minViewMode: "years",
      language: 'es',
      autoclose: true
    };
  };
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
