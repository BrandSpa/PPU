var lang;

window.ppu = {
  admin: {}
};

window.mixins = {};

window.app = {};

ppu.pathUrl = window.location.pathname.split('/');

lang = ppu.pathUrl[1];

app.compile = function(template) {
  return Handlebars.compile($(template).html());
};

app.pubsub = {};

_.extend(app.pubsub, Backbone.Events);

$(document).ajaxStart(function(t) {
  return NProgress.start();
});

$(document).ajaxStop(function() {
  return NProgress.done();
});

$(".select-cities li a").click(function(e) {
  $(".select-cities li a").removeClass('active');
  $(e.currentTarget).addClass('active');
  return $("#city-info .collapse").removeClass("in");
});

$('#footer-content').on('shown.bs.collapse', function() {
  return $(".open-contact-footer").css("color", "#002855");
});

$('#footer-content').on('hidden.bs.collapse', function() {
  return $(".open-contact-footer").css("color", "#fff");
});

app.compileTemplate = function(source) {
  source = $(source).html();
  return Handlebars.compile(source);
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

ppu.appendDatePicker = function(el) {
  return $(el).find('.datepicker').datepicker({
    format: 'dd/mm/yyyy',
    language: 'es',
    autoclose: true
  });
};

ppu.appendSelect = function(el) {
  return $(el).find("select").selectBoxIt({
    autoWidth: false
  });
};

ppu.appendCheck = function(el) {
  return $(el).find("input").iCheck({
    labelHover: false,
    cursor: true,
    checkboxClass: 'icheckbox_square-blue'
  });
};

ppu.appendSummernote = function(el) {
  return $(el).find('.summernote').summernote({
    fontname: ['Lato'],
    onImageUpload: function(files, editor, welEditable) {
      return app.uploadPhotoSummernote(files[0], editor, welEditable);
    }
  });
};

ppu.appendSummernoteExperience = function(el) {
  return $(el).find('.summernote').summernote({
    fontNames: ['Lato'],
    onImageUpload: function(files, editor, welEditable) {
      return app.uploadPhotoSummernoteExperience(files[0], editor, welEditable);
    }
  });
};

app.uploadPhotoSummernote = function(file, editor, welEditable) {
  var data;
  data = new FormData();
  data.append("gallery[name]", "post_content");
  data.append("gallery[img_name]", file);
  return $.ajax({
    data: data,
    type: "POST",
    url: "/api/galleries",
    cache: false,
    contentType: false,
    processData: false,
    success: function(url) {
      return editor.insertImage(welEditable, url);
    }
  });
};

app.uploadPhotoSummernoteExperience = function(file, editor, welEditable) {
  var data;
  data = new FormData();
  data.append("gallery[name]", "company_logo");
  data.append("gallery[img_name]", file);
  return $.ajax({
    data: data,
    type: "POST",
    url: "/api/galleries",
    cache: false,
    contentType: false,
    processData: false,
    success: function(url) {
      console.log(url);
      return editor.insertImage(welEditable, url);
    }
  });
};

ppu.appendForm = function(el, template) {
  var temp;
  temp = app.compile(template);
  $(temp()).appendTo($(el).find('.fields')).hide().slideDown();
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

$(window).scroll(function() {
  if ($(window).scrollTop() > $(document).height() - $(window).height() - 60) {
    console.log("scroll");
    return app.pubsub.trigger("general:scroll");
  }
});

$(window).scroll(function() {
  if ($(window).scrollTop() > 35) {
    return $(".top-bar-container").addClass("to-top");
  } else {
    return $(".top-bar-container").removeClass("to-top");
  }
});

$('.carousel').carousel({
  interval: 2000
});

$('.popver').popover();

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

$(document).find('.datepicker').datepicker({
  format: 'yyyy',
  language: 'es',
  autoclose: true
});

if ($(window).width() < 768) {
  console.log("768");
} else if ($(window).width() > 768 && $(window).width() <= 992) {
  console.log("992");
} else if ($(window).width() > 992 && $(window).width() <= 1200) {
  console.log("1200");
} else {

}
