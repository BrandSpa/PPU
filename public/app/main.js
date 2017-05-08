var extend = function(child, parent) {
  for (var key in parent) {
    if (hasProp.call(parent, key)) child[key] = parent[key];
  }
  function ctor() {
    this.constructor = child;
  }
  
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
  child.__super__ = parent.prototype;
  return child;
},
  hasProp = {}.hasOwnProperty;


  var lang;
  //global extend

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

  $(document).ajaxSend(function(e, xhr, options) {
    var token;
    token = $("meta[name='csrf-token']").attr("content");
    xhr.setRequestHeader("X-CSRF-Token", token);
    return console.log('ajax send', token);
  });

  $.ajaxSetup({
     headers: {
      'X-CSRF-Token': $('meta[name=\'csrf-token\']').attr('content')
    },
    beforeSend: function(xhr) {
      var token;
      console.log($('meta[name=\'csrf-token\']').attr('content'));
      token = $('meta[name=\'csrf-token\']').attr('content');
      return xhr.setRequestHeader('X-CSRF-Token', token);
    }
  });

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
    return $(el).find('.selectpicker').selectpicker();
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
      onImageUpload: function(files) {
        return app.uploadPhotoSummernote(files[0]);
      }
    });
  };

  ppu.appendSummernoteExperience = function(el) {
    var editor;
    return editor = $(el).find('.summernote').summernote({
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
        var imgNode;
        imgNode = document.createElement("IMG");
        imgNode.src = url;
        return $(document).find('.summernote').summernote('insertNode', imgNode);
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
      contentType: false,
      headers: {
        'X-CSRF-Token': $('meta[name=\'csrf-token\']').attr('content')
      },
      beforeSend: function() {
        return console.log('model before send');
      }
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

  $(window).on("scroll", _.throttle((function(_this) {
    return function(event) {
      var body, threshold, tolerance;
      body = document.body;
      tolerance = 200;
      threshold = body.scrollHeight - window.innerHeight - tolerance;
      if ($(window).scrollTop() > threshold) {
        return app.pubsub.trigger("general:scroll");
      }
    };
  })(this), 1000));

  $('.carousel').carousel({
    interval: 7000
  });

  $('.popver').popover();

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
  } else if ($(window).width() > 768 && $(window).width() <= 992) {
    app.topPadding = 150;
  } else if ($(window).width() > 992 && $(window).width() <= 1200) {
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

