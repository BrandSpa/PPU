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
  NProgress.start();
  return $("*").css("cursor", "progress");
});

$(document).ajaxStop(function() {
  NProgress.done();
  return $("*").css("cursor", "default");
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
    language: 'es',
    autoclose: true
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

$('.carousel').carousel();

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

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  return ppu.AppView = (function(_super) {
    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.prototype.el = $("#ppu-app");

    AppView.prototype.events = {
      "click .change-lang-page": 'changeLangPage'
    };

    AppView.prototype.changeLangPage = function(e) {
      e.preventDefault();
      if (app.lang === 'en') {
        return window.location = "http://ppulegal.com" + app.pathname;
      } else {
        return window.location = "http://en.ppulegal.com" + app.pathname;
      }
    };

    return AppView;

  })(Backbone.View);
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.Workspace = (function(_super) {
    __extends(Workspace, _super);

    function Workspace() {
      return Workspace.__super__.constructor.apply(this, arguments);
    }

    Workspace.prototype.routes = {
      "abogados": "lawyers",
      "abogados/:slug": "lawyer",
      "posts": "posts",
      "posts/:slug": "post",
      "areas": "areas",
      "areas/:name": "area"
    };

    Workspace.prototype.initialize = function() {
      return new ppu.AppView;
    };

    Workspace.prototype.lawyers = function(lang) {
      ppu.lawyers = new ppu.Lawyers;
      ppu.lawyers.fetch({
        reset: true
      });
      ppu.lawyersFilters = new ppu.LawyersFilters;
      ppu.lawyersFilters.render();
      return ppu.lawyersView = new ppu.LawyersView({
        collection: ppu.lawyers
      });
    };

    Workspace.prototype.lawyer = function(slug) {
      ppu.lawyers = new ppu.Lawyers;
      ppu.lawyers.fetch({
        reset: true,
        data: {
          lang: app.lang,
          slug: slug
        }
      });
      return ppu.LawyerDetailView = new ppu.LawyerDetailView({
        collection: ppu.lawyers
      });
    };

    Workspace.prototype.posts = function() {
      ppu.postsFeatured = new ppu.Posts;
      ppu.postsFeatured.fetch({
        reset: true,
        data: {
          featured: true
        }
      });
      ppu.postsFilters = new ppu.PostsFilters;
      ppu.postsFilters.render();
      ppu.posts = new ppu.Posts;
      ppu.posts.fetch({
        reset: true,
        data: {
          published: true,
          not_featured: true
        }
      });
      ppu.postsFeaturedView = new ppu.PostsFeaturedView({
        collection: ppu.postsFeatured
      });
      return ppu.postsView = new ppu.PostsView({
        collection: ppu.posts
      });
    };

    Workspace.prototype.post = function(slug) {
      ppu.posts = new ppu.Posts;
      ppu.posts.fetch({
        reset: true,
        data: {
          slug: slug
        }
      });
      return ppu.postDetailView = new ppu.PostDetailView({
        collection: ppu.posts
      });
    };

    Workspace.prototype.areas = function() {
      ppu.categories = new ppu.Categories;
      ppu.categories.fetch({
        reset: true
      });
      return ppu.categoriesView = new ppu.CategoriesView({
        collection: ppu.categories
      });
    };

    return Workspace;

  })(Backbone.Router);
  new ppu.Workspace;
  return Backbone.history.start({
    pushState: true
  });
});
