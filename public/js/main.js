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
    console.log(message);
    return toastr.error(message);
  });
};

Backbone.View.prototype.renderErrors = function(model, response) {
  var $form, errors;
  model = model;
  $form = this.$el.find('form');
  errors = JSON.parse(response.responseText);
  return _.each(errors, function(message, field) {
    var input;
    input = $form.find("[name='fields[" + field + "]' ]");
    input.addClass("error");
    return input.after("<p class='error-message'>" + message + "</p>");
  });
};

Backbone.View.prototype.removeError = function(e) {
  var el;
  el = $(e.currentTarget);
  el.removeClass("error");
  return el.parent().find('.error-message').remove();
};

Backbone.View.prototype.closeModal = function() {
  this.remove();
  $('.modal-backdrop').remove();
  return $('body').removeClass('modal-open');
};

ppu.appendDatePickerYear = function(el) {
  return $(el).find('.datepicker-year').datepicker({
    format: 'yyyy',
    viewMode: "years",
    minViewMode: "years",
    language: 'es',
    autoclose: true
  });
};

ppu.appendForm = function(el, template) {
  var source, temp;
  source = $(template).html();
  temp = Handlebars.compile(source);
  $(el).find('.fields').append(temp).fadeIn();
  return ppu.appendDatePickerYear(el);
};

ppu.ajaxOptions = function(type, data) {
  return {
    type: type,
    data: data,
    processData: false,
    cache: false,
    contentType: false
  };
};

ppu.saveMultipeForms = function(el, model, lawyer_id) {
  var $forms;
  $forms = $(el).find("form");
  model = model;
  return $forms.each(function(index) {
    var data;
    data = new FormData($forms[index]);
    data.append("fields[lawyer_id]", lawyer_id);
    return model.save(data, $.extend({}, ppu.ajaxOptions("POST", data)));
  });
};

Handlebars.registerHelper('checked', function(val1, val2) {
  var _ref;
  return (_ref = val1 === val2) != null ? _ref : {
    ' checked="checked"': ''
  };
});

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
