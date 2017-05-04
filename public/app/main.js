window.ppu =
  {admin: {}};

window.mixins = {};
window.app = {};

ppu.pathUrl = window.location.pathname.split( '/' );

let lang = ppu.pathUrl[1];

app.compile = template => Handlebars.compile($(template).html());

app.pubsub = {};

_.extend(app.pubsub, Backbone.Events);

$(document).ajaxStart(t => NProgress.start());

$(document).ajaxStop(() => NProgress.done());

$(".select-cities li a").click(function(e) {
  $(".select-cities li a").removeClass('active');
  $(e.currentTarget).addClass('active');
  return $("#city-info .collapse").removeClass("in");
});

$('#footer-content').on('shown.bs.collapse', () => $(".open-contact-footer").css("color", "#002855"));

$('#footer-content').on('hidden.bs.collapse', () => $(".open-contact-footer").css("color", "#fff"));

app.compileTemplate = function(source) {
  source = $(source).html();
  return Handlebars.compile(source);
};

ppu.appendDatePickerYear = el =>
  $(el).find('.datepicker-year').datepicker({
    format: 'yyyy',
    viewMode: "years",
    minViewMode: "years",
    language: 'es',
    autoclose: true
  })
;

ppu.appendDatePicker = el =>
  $(el).find('.datepicker').datepicker({
    format: 'dd/mm/yyyy',
    language: 'es',
    autoclose: true
  })
;

ppu.appendSelect = el => $(el).find('.selectpicker').selectpicker();

ppu.appendCheck = el => $(el).find("input").iCheck({labelHover: false, cursor: true, checkboxClass: 'icheckbox_square-blue'});

ppu.appendSummernote = el =>
   $(el).find('.summernote').summernote({
    fontname: ['Lato'],
    onImageUpload(files) {
      return app.uploadPhotoSummernote(files[0]);
    }
   })
 ;

ppu.appendSummernoteExperience = function(el) {
  let editor;
  return editor = $(el).find('.summernote').summernote({
    fontNames: ['Lato'],
    onImageUpload(files, editor, welEditable) {
      return app.uploadPhotoSummernoteExperience(files[0], editor, welEditable);
    }
  });
};

app.uploadPhotoSummernote = function(file, editor, welEditable) {
  let data = new FormData();
  data.append("gallery[name]", "post_content");
  data.append("gallery[img_name]", file);

  return $.ajax({
    data,
    type: "POST",
    url: "/api/galleries",
    cache: false,
    contentType: false,
    processData: false,
    success(url) {
      let imgNode = document.createElement("IMG");
      imgNode.src = url;
      return $(document).find('.summernote').summernote('insertNode', imgNode);
    }
  });
};

app.uploadPhotoSummernoteExperience = function(file, editor, welEditable) {
  let data = new FormData();
  data.append("gallery[name]", "company_logo");
  data.append("gallery[img_name]", file);
  return $.ajax({
    data,
    type: "POST",
    url: "/api/galleries",
    cache: false,
    contentType: false,
    processData: false,
    success(url) {
      return editor.insertImage(welEditable, url);
    }
  });
};

ppu.appendForm = function(el, template){
  let temp = app.compile(template);
  $(temp()).appendTo($(el).find('.fields')).hide().slideDown();
  return ppu.appendDatePickerYear(el);
};

ppu.ajaxOptions = (type, data) =>
  ({
    type,
    data,
    processData: false,
    cache: false,
    contentType: false
  })
;

ppu.saveMultipeForms = function(el, model, lawyer_id) {
  let $forms = $(el).find("form");
  model = model;
  return $forms.each(function(index) {
    let data = new FormData($forms[index]);
    data.append("fields[lawyer_id]", lawyer_id);
    return model.save(data, $.extend({}, ppu.ajaxOptions("POST", data)));
  });
};

$(window).on("scroll", _.throttle(event => {

  let { body } = document;
  let tolerance = 200;
  let threshold = body.scrollHeight - window.innerHeight - tolerance;

  if ($(window).scrollTop() > threshold) {
    return app.pubsub.trigger("general:scroll");
  }
}
, 1000)
);


$('.carousel').carousel({interval: 7000});

$('.popver').popover();

$(document).ajaxSend(function(e, xhr, options) {
  console.log('ajax send');
  let token = $("meta[name='csrf-token']").attr("content");
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
  app.topPadding = 200;
} else if (($(window).width() > 768) &&  ($(window).width() <= 992)) {
  app.topPadding = 150;
} else if (($(window).width() > 992) &&  ($(window).width() <= 1200)) {
  app.topPadding = 35;
} else {
  app.topPadding = 35;
}

$(document).scroll(function() {
  if ($(window).scrollTop() > app.topPadding) {
    return $(".top-bar-container").addClass("to-top");
  } else {
    return $(".top-bar-container").removeClass("to-top");
  }
});
