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
  return $(el).find("select").selectBoxIt();
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
  if ($(window).scrollTop() + $(window).height() > $(document).height() - 150) {
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

    AppView.prototype.initialize = function() {
      return app.pubsub.bind("filter:aplied", this.paginateOff, this);
    };

    AppView.prototype.paginateOff = function() {
      return this.$el.data("paginate");
    };

    AppView.prototype.changeLangPage = function(e) {
      var urlTranslation;
      e.preventDefault();
      urlTranslation = window.urlTranslation;
      if (app.lang === 'en') {
        if (urlTranslation === "") {
          return window.location = "http://ppulegal.com" + app.pathname;
        } else {
          return window.location = "http://ppulegal.com/" + ppu.pathUrl[1] + "/" + urlTranslation;
        }
      } else {
        if (urlTranslation === "") {
          return window.location = "http://en.ppulegal.com" + app.pathname;
        } else {
          return window.location = "http://en.ppulegal.com/" + ppu.pathUrl[1] + "/" + urlTranslation;
        }
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
      "experiencias": "experiences",
      "experiencias/:slug": "experience",
      "posts": "posts",
      "": "posts",
      "posts/:slug": "post",
      "areas": "areas",
      "areas/:slug": "area",
      "trabaje-con-nosotros": "curriculum",
      "nosotros": "us",
      "probono": "probono"
    };

    Workspace.prototype.initialize = function() {
      new ppu.AppView;
      new ppu.Seo;
      window.urlTranslation = "";
      ppu.contact = new ppu.Contact;
      return ppu.FooterContactCreate = new ppu.FooterContactCreate({
        model: ppu.contact
      });
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
      ppu.lawyer = new ppu.Lawyers;
      ppu.lawyer.fetch({
        reset: true,
        data: {
          slug: slug
        }
      });
      return ppu.LawyerDetailView = new ppu.LawyerDetailView({
        collection: ppu.lawyer
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
      ppu.post = new ppu.Post({
        id: slug
      });
      ppu.post.fetch();
      return ppu.postDetailView = new ppu.PostDetailView({
        model: ppu.post
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

    Workspace.prototype.area = function(slug) {
      ppu.category = new ppu.Category({
        id: slug
      });
      ppu.category.fetch();
      ppu.categoryDetail = new ppu.CategoryDetail({
        model: ppu.category
      });
      ppu.categories = new ppu.Categories;
      ppu.categoriesList = new ppu.CategoriesList({
        collection: ppu.categories
      });
      ppu.lawyers = new ppu.Lawyers;
      return ppu.lawyersRelated = new ppu.lawyersRelatedCategory({
        collection: ppu.lawyers
      });
    };

    Workspace.prototype.experience = function(slug) {
      ppu.experience = new ppu.Experience({
        id: slug
      });
      ppu.experience.fetch();
      return ppu.experienceDetailView = new ppu.ExperienceDetailView({
        model: ppu.experience
      });
    };

    Workspace.prototype.experiences = function() {
      ppu.experiencesFilters = new ppu.ExperiencesFilters;
      ppu.experiencesFilters.render();
      ppu.experiences = new ppu.Experiences;
      ppu.experiences.fetch({
        reset: true,
        data: {
          published: true,
          not_featured: true
        }
      });
      return ppu.experiencesView = new ppu.ExperiencesView({
        collection: ppu.experiences
      });
    };

    Workspace.prototype.curriculum = function() {
      var title;
      ppu.curriculum = new ppu.Curriculum;
      ppu.curriculumCreate = new ppu.CurriculumCreate({
        model: ppu.curriculum
      });
      title = $("#work-with-title-template").html();
      return $("#top-bar").html(title);
    };

    Workspace.prototype.us = function() {
      var title;
      title = $("#us-title-template").html();
      return $("#top-bar").html(title);
    };

    Workspace.prototype.probono = function() {
      var title;
      title = $("#probono-title-template").html();
      return $("#top-bar").html(title);
    };

    return Workspace;

  })(Backbone.Router);
  new ppu.Workspace;
  return Backbone.history.start({
    pushState: true
  });
});
