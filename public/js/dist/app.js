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

$(window).on("scroll", _.throttle((function(_this) {
  return function(event) {
    var body, threshold, tolerance;
    body = document.body;
    tolerance = 100;
    threshold = body.scrollHeight - window.innerHeight - tolerance;
    if (body.scrollTop > threshold) {
      console.log("scroll");
      return app.pubsub.trigger("general:scroll");
    }
  };
})(this), 1000));

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
  app.topPadding = 200;
} else if ($(window).width() > 768 && $(window).width() <= 992) {
  app.topPadding = 150;
} else if ($(window).width() > 992 && $(window).width() <= 1200) {
  app.topPadding = 35;
} else {
  app.topPadding = 35;
}

$(window).scroll(function() {
  if ($(window).scrollTop() > app.topPadding) {
    return $(".top-bar-container").addClass("to-top");
  } else {
    return $(".top-bar-container").removeClass("to-top");
  }
});

Handlebars.registerHelper('checked', function(val1, val2) {
  var _ref;
  return (_ref = val1 === val2) != null ? _ref : {
    ' checked="checked"': ''
  };
});

Handlebars.registerHelper('shortenText', function(text, block) {
  return text.substring(0, 95) + " ...";
});

Handlebars.registerHelper('shortenText2', function(text, block) {
  return text.substring(0, 60) + " ...";
});

Handlebars.registerHelper('dateFormat', function(context, block) {
  var f;
  if (window.moment) {
    f = block.hash.format || "DD/MM/YYYY";
    return moment(context).format(f);
  }
});

Handlebars.registerHelper('toUpperCase', function(str) {
  return str.toUpperCase();
});

Handlebars.registerHelper('getYear', function(context, block) {
  var f;
  if (window.moment) {
    f = block.hash.format || "YYYY";
    return moment(context).format(f);
  } else {
    return context;
  }
});

Backbone.View.prototype.renderPostErrors = function(model, response) {
  var $form, errors;
  model = model;
  $form = this.$el.find('form');
  errors = JSON.parse(response.responseText);
  return _.each(errors, function(message, field) {
    var input;
    input = $form.find("[name='post[" + field + "]' ]");
    input.addClass("error");
    return input.after("<div class='error-message'>" + message + "</div>");
  });
};

Backbone.View.prototype.en = function() {
  var lang;
  lang = ppu.pathUrl[1];
  if (lang === "en") {
    return true;
  } else {
    return false;
  }
};

Backbone.View.prototype.renderModel = function() {
  var source, template;
  source = $(this.template).html();
  template = Handlebars.compile(source);
  this.container.html(template(this.model.toJSON()));
  return this;
};

Backbone.View.prototype.renderCollection = function() {
  return this.collection.each(function(model) {
    return this.renderOne(model);
  }, this);
};

Backbone.View.prototype.notifyError = function(model, response) {
  var errors;
  errors = JSON.parse(response.responseText);
  if (errors && lang === 'es') {
    return toastr.error("Tiene errores");
  }
};

Backbone.View.prototype.renderErrors = function(model, response) {
  var $form, errors;
  model = model;
  $form = this.$el.find('form');
  errors = JSON.parse(response.responseText);
  $form.find('.error-message').remove();
  return _.each(errors, function(message, field) {
    var input;
    input = $form.find("[name='fields[" + field + "]' ]");
    input.addClass("error");
    return input.after("<div class='error-message'>" + message + "</div>");
  });
};

Backbone.View.prototype.removeError = function(e) {
  var el;
  el = $(e.currentTarget);
  el.removeClass("error");
  return el.parent().find('.error-message').remove();
};

Backbone.View.prototype.closeModal = function() {
  $('.modal-backdrop').remove();
  $('body').removeClass('modal-open');
  return this.remove();
};

Backbone.View.prototype.setUrlTranslation = function(model) {
  var translation, translations;
  translations = model.get("translations");
  translation = model.get("translation");
  if (translations) {
    return window.urlTranslation = translations.slug;
  } else {
    return window.urlTranslation = translation.slug;
  }
};

Backbone.View.prototype.openShare = function() {
  return $("#share-modal").modal();
};

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
      'click .change-lang-page': 'changeLangPage'
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
  return ppu.FiltersMobile = (function(_super) {
    __extends(FiltersMobile, _super);

    function FiltersMobile() {
      return FiltersMobile.__super__.constructor.apply(this, arguments);
    }

    FiltersMobile.prototype.el = $("#filters-modal");

    FiltersMobile.prototype.events = {
      "click .apply-filters": "applyFilters",
      "change .category": "addCategory",
      "change .country": "addCountry"
    };

    FiltersMobile.prototype.applyFilters = function(e) {
      var filters;
      e.preventDefault();
      filters = $(e.currentTarget).data("filters");
      return console.log(filters);
    };

    FiltersMobile.prototype.addFilter = function(filter) {
      var btnfilters, filters, newFilter;
      btnfilters = $(".apply-filters");
      filters = btnfilters.data("filters");
      newFilter = _.extend(filters, filter);
      return btnfilters.data("filters", newFilter);
    };

    FiltersMobile.prototype.addCategory = function(e) {
      var val;
      val = $(e.currentTarget).find('select').val();
      return this.addFilter({
        category: val
      });
    };

    FiltersMobile.prototype.addCountry = function(e) {
      var val;
      val = $(e.currentTarget).find('select').val();
      return this.addFilter({
        country: val
      });
    };

    return FiltersMobile;

  })(Backbone.View);
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.Category = (function(_super) {
    __extends(Category, _super);

    function Category() {
      return Category.__super__.constructor.apply(this, arguments);
    }

    Category.prototype.urlRoot = '/api/categories';

    return Category;

  })(Backbone.Model);
  ppu.Categories = (function(_super) {
    __extends(Categories, _super);

    function Categories() {
      return Categories.__super__.constructor.apply(this, arguments);
    }

    Categories.prototype.url = '/api/categories';

    Categories.prototype.model = ppu.Category;

    return Categories;

  })(Backbone.Collection);
  ppu.CategoryView = (function(_super) {
    __extends(CategoryView, _super);

    function CategoryView() {
      return CategoryView.__super__.constructor.apply(this, arguments);
    }

    CategoryView.prototype.template = $("#category-template");

    CategoryView.prototype.className = "col-md-6 col-sm-6 col-xs-12 category-item";

    CategoryView.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      $(this.el).html(template(this.model.toJSON()));
      return this;
    };

    return CategoryView;

  })(Backbone.View);
  ppu.CategoriesView = (function(_super) {
    __extends(CategoriesView, _super);

    function CategoriesView() {
      return CategoriesView.__super__.constructor.apply(this, arguments);
    }

    CategoriesView.prototype.el = $("#categories");

    CategoriesView.prototype.initialize = function() {
      this.listenTo(this.collection, 'reset', this.render);
      return this.getTitle();
    };

    CategoriesView.prototype.getTitle = function() {
      return $("#top-bar").html($("#category-title").html());
    };

    CategoriesView.prototype.renderOne = function(model) {
      ppu.categoryView = new ppu.CategoryView({
        model: model
      });
      return this.$el.append(ppu.categoryView.render().el);
    };

    CategoriesView.prototype.render = function() {
      return this.collection.each(function(model) {
        return this.renderOne(model);
      }, this);
    };

    return CategoriesView;

  })(Backbone.View);
  ppu.CategoryDetail = (function(_super) {
    __extends(CategoryDetail, _super);

    function CategoryDetail() {
      return CategoryDetail.__super__.constructor.apply(this, arguments);
    }

    CategoryDetail.prototype.el = $("#category");

    CategoryDetail.prototype.template = $("#category-detail-template");

    CategoryDetail.prototype.initialize = function() {
      this.listenTo(this.model, "change", this.render);
      return this.getTitle();
    };

    CategoryDetail.prototype.getTitle = function() {
      return $("#top-bar").html($("#category-detail-title").html());
    };

    CategoryDetail.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      this.$el.html(template(this.model.toJSON()));
      this.setUrlTranslation(this.model);
      app.pubsub.trigger("categories:list");
      return app.pubsub.trigger("lawyers:related", this.model.get("name"));
    };

    return CategoryDetail;

  })(Backbone.View);
  return ppu.CategoriesList = (function(_super) {
    __extends(CategoriesList, _super);

    function CategoriesList() {
      return CategoriesList.__super__.constructor.apply(this, arguments);
    }

    CategoriesList.prototype.el = $("#categories-list");

    CategoriesList.prototype.template = $("#categories-list-template");

    CategoriesList.prototype.initialize = function() {
      this.listenTo(this.collection, "reset", this.render);
      return app.pubsub.bind("categories:list", this.getAll, this);
    };

    CategoriesList.prototype.getAll = function() {
      return ppu.categories.fetch({
        reset: true
      });
    };

    CategoriesList.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      $("#categories-list").html(template(this.collection.toJSON()));
      return console.log($("#categories-list").html());
    };

    return CategoriesList;

  })(Backbone.View);
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.Lawyer = (function(_super) {
    __extends(Lawyer, _super);

    function Lawyer() {
      return Lawyer.__super__.constructor.apply(this, arguments);
    }

    Lawyer.prototype.urlRoot = "/api/lawyers";

    Lawyer.prototype.fetchBySlug = function(slug) {
      return this.fetch({
        data: $.param({
          slug: slug,
          locale: app.lang
        })
      });
    };

    return Lawyer;

  })(Backbone.Model);
  ppu.Lawyers = (function(_super) {
    __extends(Lawyers, _super);

    function Lawyers() {
      return Lawyers.__super__.constructor.apply(this, arguments);
    }

    Lawyers.prototype.url = "/api/lawyers";

    Lawyers.prototype.model = ppu.Lawyer;

    return Lawyers;

  })(Backbone.Collection);
  ppu.LawyerView = (function(_super) {
    __extends(LawyerView, _super);

    function LawyerView() {
      return LawyerView.__super__.constructor.apply(this, arguments);
    }

    LawyerView.prototype.template = $('#lawyer-template');

    LawyerView.prototype.className = 'col-md-6 col-sm-6 col-xs-12 lawyer-item';

    LawyerView.prototype.render = function() {
      var compile, source;
      source = this.template.html();
      compile = Handlebars.compile(source);
      $(this.el).html(compile(this.model.toJSON()));
      return this;
    };

    return LawyerView;

  })(Backbone.View);
  ppu.LawyersView = (function(_super) {
    __extends(LawyersView, _super);

    function LawyersView() {
      return LawyersView.__super__.constructor.apply(this, arguments);
    }

    LawyersView.prototype.el = $('#lawyers');

    LawyersView.prototype.initialize = function() {
      var order;
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'add', this.renderOne);
      order = this.order_by();
      return this.collection.fetch({
        reset: true,
        data: order
      });
    };

    LawyersView.prototype.order_by = function() {
      if (app.lang === "en") {
        return {
          order_by_english: true
        };
      } else {
        return {
          order_by_spanish: true
        };
      }
    };

    LawyersView.prototype.paginate = function() {
      return this.collection.fetch({
        data: {
          offset: offset
        }
      });
    };

    LawyersView.prototype.renderOne = function(model) {
      var view;
      view = new ppu.LawyerView({
        model: model
      });
      return $(this.el).append(view.render().el);
    };

    LawyersView.prototype.render = function() {
      $(this.el).html('');
      return this.collection.each(function(model) {
        return this.renderOne(model);
      }, this);
    };

    return LawyersView;

  })(Backbone.View);
  ppu.LawyersFilters = (function(_super) {
    __extends(LawyersFilters, _super);

    function LawyersFilters() {
      return LawyersFilters.__super__.constructor.apply(this, arguments);
    }

    LawyersFilters.prototype.el = $('#top-bar');

    LawyersFilters.prototype.template = $("#lawyers-filter");

    LawyersFilters.prototype.offset = 20;

    LawyersFilters.prototype.events = {
      'change .position': 'byPosition',
      'change .country': 'byCountry',
      'change .category': 'byCategory',
      'keyup .query': 'byQuery',
      'submit .search': 'bySearch'
    };

    LawyersFilters.prototype.initialize = function() {
      this.render();
      this.filtersAplied = {
        lang: app.lang
      };
      this.order_by();
      this.$el.data("filtersAplied", this.filtersAplied);
      return app.pubsub.bind("general:scroll", this.paginate, this);
    };

    LawyersFilters.prototype.order_by = function() {
      if (app.lang === "en") {
        return _.extend(this.filtersAplied, {
          order_by_english: true
        });
      } else {
        return _.extend(this.filtersAplied, {
          order_by_spanish: true
        });
      }
    };

    LawyersFilters.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      this.$el.html(template);
      return ppu.appendSelect(this.el);
    };

    LawyersFilters.prototype.paginate = function() {
      var data;
      data = _.extend(this.filtersAplied, {
        paginate: this.offset
      });
      ppu.lawyers.fetch({
        data: data
      });
      return this.offset = this.offset + 20;
    };

    LawyersFilters.prototype.byPosition = function(e) {
      var data, val;
      val = $(e.currentTarget).find('select').val();
      data = _.extend(this.filtersAplied, {
        paginate: 0,
        position: val
      });
      return ppu.lawyers.fetch({
        reset: true,
        data: data
      });
    };

    LawyersFilters.prototype.byCountry = function(e) {
      var data, el, val, value;
      el = $(e.currentTarget);
      if ($(".countries").find('input[type="checkbox"]:checked').length === 2) {
        data = _.extend(this.filtersAplied, {
          paginate: 0,
          country: ""
        });
        return ppu.lawyers.fetch({
          reset: true,
          data: data
        });
      } else {
        if (el.find(":not(:checked)")) {
          value = el.val();
        }
        if (value === "Colombia") {
          val = "Chile";
        } else {
          val = "Colombia";
        }
        $(".countries").find("input[value='" + val + "']").prop('checked', true);
        data = _.extend(this.filtersAplied, {
          paginate: 0,
          country: val
        });
        return ppu.lawyers.fetch({
          reset: true,
          data: data
        });
      }
    };

    LawyersFilters.prototype.byCategory = function(e) {
      var data, val;
      val = $(e.currentTarget).find('select').val();
      data = _.extend(this.filtersAplied, {
        paginate: 0,
        category: val
      });
      return ppu.lawyers.fetch({
        reset: true,
        data: data
      });
    };

    LawyersFilters.prototype.byQuery = function(e) {
      var data, val;
      val = $(e.currentTarget).val();
      if (val.length >= 1) {
        data = _.extend(this.filtersAplied, {
          paginate: 0,
          search: val
        });
        return ppu.lawyers.fetch({
          reset: true,
          data: data
        });
      }
    };

    LawyersFilters.prototype.bySearch = function(e) {
      var data, val;
      e.preventDefault();
      val = $(e.currentTarget).find(".query").val();
      data = _.extend(this.filtersAplied, {
        paginate: 0,
        search: val
      });
      return ppu.lawyers.fetch({
        reset: true,
        data: data
      });
    };

    return LawyersFilters;

  })(Backbone.View);
  ppu.LawyerDetailView = (function(_super) {
    __extends(LawyerDetailView, _super);

    function LawyerDetailView() {
      return LawyerDetailView.__super__.constructor.apply(this, arguments);
    }

    LawyerDetailView.prototype.el = $('#lawyer');

    LawyerDetailView.prototype.template = $('#lawyer-template');

    LawyerDetailView.prototype.events = {
      "click .share": "openShare"
    };

    LawyerDetailView.prototype.initialize = function() {
      this.listenTo(this.model, 'change', this.render);
      this.getTitle();
      return this.model.fetch();
    };

    LawyerDetailView.prototype.getTitle = function() {
      return $("#top-bar").html($("#lawyer-detail-title").html());
    };

    LawyerDetailView.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      return $(this.el).html(template(this.model.toJSON()));
    };

    return LawyerDetailView;

  })(Backbone.View);
  return ppu.lawyersRelatedCategory = (function(_super) {
    __extends(lawyersRelatedCategory, _super);

    function lawyersRelatedCategory() {
      return lawyersRelatedCategory.__super__.constructor.apply(this, arguments);
    }

    lawyersRelatedCategory.prototype.el = $("#lawyers-related");

    lawyersRelatedCategory.prototype.template = $("#lawyer-related-template");

    lawyersRelatedCategory.prototype.initialize = function() {
      this.listenTo(this.collection, "reset", this.render);
      return app.pubsub.bind("lawyers:related", this.getRelated, this);
    };

    lawyersRelatedCategory.prototype.getRelated = function(category) {
      var position;
      if (app.lang === "en") {
        position = "Partner";
      } else {
        position = "Socio";
      }
      return this.collection.fetch({
        reset: true,
        data: {
          lang: app.lang,
          category: category,
          position: position
        }
      });
    };

    lawyersRelatedCategory.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      return $("#lawyers-related").html(template(this.collection.toJSON()));
    };

    return lawyersRelatedCategory;

  })(Backbone.View);
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.Post = (function(_super) {
    __extends(Post, _super);

    function Post() {
      return Post.__super__.constructor.apply(this, arguments);
    }

    Post.prototype.urlRoot = '/api/posts';

    return Post;

  })(Backbone.Model);
  ppu.Posts = (function(_super) {
    __extends(Posts, _super);

    function Posts() {
      return Posts.__super__.constructor.apply(this, arguments);
    }

    Posts.prototype.url = '/api/posts';

    Posts.prototype.model = ppu.Post;

    return Posts;

  })(Backbone.Collection);
  ppu.PostView = (function(_super) {
    __extends(PostView, _super);

    function PostView() {
      return PostView.__super__.constructor.apply(this, arguments);
    }

    PostView.prototype.template = $("#post-template");

    PostView.prototype.className = "col-md-6 col-sm-6 col-xs-12 post-item";

    PostView.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      $(this.el).html(template(this.model.toJSON()));
      return this;
    };

    return PostView;

  })(Backbone.View);
  ppu.PostFeaturedView = (function(_super) {
    __extends(PostFeaturedView, _super);

    function PostFeaturedView() {
      return PostFeaturedView.__super__.constructor.apply(this, arguments);
    }

    PostFeaturedView.prototype.template = $("#post-template");

    PostFeaturedView.prototype.className = "col-md-6 col-sm-6 col-xs-12 post-featured-item";

    PostFeaturedView.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      $(this.el).html(template(this.model.toJSON()));
      return this;
    };

    return PostFeaturedView;

  })(Backbone.View);
  ppu.PostsView = (function(_super) {
    __extends(PostsView, _super);

    function PostsView() {
      return PostsView.__super__.constructor.apply(this, arguments);
    }

    PostsView.prototype.el = $("#posts");

    PostsView.prototype.initialize = function() {
      this.listenTo(this.collection, 'reset', this.render);
      return app.pubsub.bind("posts:filter", this.filterCollection, this);
    };

    PostsView.prototype.filterCollection = function(filters) {
      return this.collection.fetch({
        reset: true,
        lang: app.lang,
        data: filters
      });
    };

    PostsView.prototype.renderOne = function(model) {
      ppu.postView = new ppu.PostView({
        model: model
      });
      return this.$el.append(ppu.postView.render().el);
    };

    PostsView.prototype.render = function() {
      this.$el.html("");
      this.collection.each(function(model) {
        return this.renderOne(model);
      }, this);
      return app.pubsub.trigger("posts:rendered");
    };

    return PostsView;

  })(Backbone.View);
  ppu.PostMainFeaturedView = (function(_super) {
    __extends(PostMainFeaturedView, _super);

    function PostMainFeaturedView() {
      return PostMainFeaturedView.__super__.constructor.apply(this, arguments);
    }

    PostMainFeaturedView.prototype.template = $("#post-main-featured-template");

    PostMainFeaturedView.prototype.className = "col-md-6 col-sm-6 col-xs-12 post-main-featured-item";

    PostMainFeaturedView.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      $(this.el).html(template(this.model.toJSON()));
      return this;
    };

    return PostMainFeaturedView;

  })(Backbone.View);
  ppu.PostsFeaturedView = (function(_super) {
    __extends(PostsFeaturedView, _super);

    function PostsFeaturedView() {
      return PostsFeaturedView.__super__.constructor.apply(this, arguments);
    }

    PostsFeaturedView.prototype.el = $("#posts-featured");

    PostsFeaturedView.prototype.initialize = function() {
      this.listenTo(this.collection, "reset", this.render);
      return app.pubsub.bind("posts:rendered", this.getFeatured, this);
    };

    PostsFeaturedView.prototype.getFeatured = function() {
      return this.collection.fetch({
        reset: true,
        data: {
          featured: true
        }
      });
    };

    PostsFeaturedView.prototype.renderMain = function(model) {
      ppu.postMainFeaturedView = new ppu.PostMainFeaturedView({
        model: model
      });
      return this.$el.prepend(ppu.postMainFeaturedView.render().el);
    };

    PostsFeaturedView.prototype.renderOne = function(model) {
      ppu.postView = new ppu.PostView({
        model: model
      });
      return this.$el.append(ppu.postView.render().el);
    };

    PostsFeaturedView.prototype.render = function() {
      return this.collection.each(function(model) {
        if (model.get('featured') === 1) {
          return this.renderMain(model);
        } else {
          return this.renderOne(model);
        }
      }, this);
    };

    return PostsFeaturedView;

  })(Backbone.View);
  ppu.PostsFilters = (function(_super) {
    __extends(PostsFilters, _super);

    function PostsFilters() {
      return PostsFilters.__super__.constructor.apply(this, arguments);
    }

    PostsFilters.prototype.el = $('#top-bar');

    PostsFilters.prototype.template = $("#posts-filter");

    PostsFilters.prototype.events = {
      'change .country': 'byCountry',
      'change .category': 'byCategory',
      'keydown .query': 'byKeyword',
      'submit .search': 'bySearch'
    };

    PostsFilters.prototype.initialize = function() {
      return this.filtersAplied = {
        lang: app.lang,
        not_featured: true
      };
    };

    PostsFilters.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      this.$el.html(template);
      return ppu.appendSelect(this.el);
    };

    PostsFilters.prototype.filterBy = function(data) {
      data = _.extend(this.filtersAplied, data);
      return app.pubsub.trigger("posts:filter", data);
    };

    PostsFilters.prototype.byCountry = function(e) {
      var el, val;
      el = $(e.currentTarget);
      if ($(".countries").find('input[type="checkbox"]:checked').length === 2) {
        return this.filterBy({
          by_country: ""
        });
      } else {
        if (el.find(":not(:checked)")) {
          val = this.CountryNotChecked(el);
          return this.filterBy({
            by_country: val
          });
        }
      }
    };

    PostsFilters.prototype.CountryNotChecked = function(el) {
      var val;
      val = el.val() === "Colombia" ? "Chile" : "Colombia";
      $(".countries").find("input[value='" + val + "']").prop('checked', true);
      return val;
    };

    PostsFilters.prototype.byCategory = function(e) {
      var val;
      val = $(e.currentTarget).find('select').val();
      return this.filterBy({
        by_category: val
      });
    };

    PostsFilters.prototype.byKeyword = function(e) {
      var val;
      val = $(e.currentTarget).val();
      if (val.length >= 1) {
        return this.filterBy({
          by_keyword: val
        });
      }
    };

    PostsFilters.prototype.bySearch = function(e) {
      var val;
      e.preventDefault();
      val = $(e.currentTarget).find(".query").val();
      return this.filterBy({
        by_keyword: val
      });
    };

    return PostsFilters;

  })(Backbone.View);
  return ppu.PostDetailView = (function(_super) {
    __extends(PostDetailView, _super);

    function PostDetailView() {
      return PostDetailView.__super__.constructor.apply(this, arguments);
    }

    PostDetailView.prototype.el = $("#post-detail");

    PostDetailView.prototype.template = $("#post-detail-template");

    PostDetailView.prototype.initialize = function() {
      this.listenTo(this.model, "change", this.render);
      return this.getTitle();
    };

    PostDetailView.prototype.getTitle = function() {
      return $("#top-bar").html($("#post-detail-title").html());
    };

    PostDetailView.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      this.$el.html(template(this.model.toJSON()));
      return this.setUrlTranslation(this.model);
    };

    return PostDetailView;

  })(Backbone.View);
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.Experience = (function(_super) {
    __extends(Experience, _super);

    function Experience() {
      return Experience.__super__.constructor.apply(this, arguments);
    }

    Experience.prototype.urlRoot = "/api/experiences";

    return Experience;

  })(Backbone.Model);
  ppu.Experiences = (function(_super) {
    __extends(Experiences, _super);

    function Experiences() {
      return Experiences.__super__.constructor.apply(this, arguments);
    }

    Experiences.prototype.url = "/api/experiences";

    Experiences.prototype.model = ppu.Experience;

    return Experiences;

  })(Backbone.Collection);
  ppu.ExperienceView = (function(_super) {
    __extends(ExperienceView, _super);

    function ExperienceView() {
      return ExperienceView.__super__.constructor.apply(this, arguments);
    }

    ExperienceView.prototype.template = $("#experience-template");

    ExperienceView.prototype.className = "col-md-6 col-sm-6 col-xs-12 experience-item";

    ExperienceView.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      $(this.el).html(template(this.model.toJSON()));
      return this;
    };

    return ExperienceView;

  })(Backbone.View);
  ppu.ExperiencesView = (function(_super) {
    __extends(ExperiencesView, _super);

    function ExperiencesView() {
      return ExperiencesView.__super__.constructor.apply(this, arguments);
    }

    ExperiencesView.prototype.el = $("#experiences");

    ExperiencesView.prototype.initialize = function() {
      this.listenTo(this.collection, 'reset', this.render);
      return app.pubsub.bind("experiences:filter", this.filterCollection, this);
    };

    ExperiencesView.prototype.filterCollection = function(filters) {
      return this.collection.fetch({
        reset: true,
        lang: app.lang,
        data: filters
      });
    };

    ExperiencesView.prototype.renderOne = function(model) {
      ppu.experienceView = new ppu.ExperienceView({
        model: model
      });
      return this.$el.append(ppu.experienceView.render().el);
    };

    ExperiencesView.prototype.render = function() {
      $(this.el).html('');
      return this.collection.each(function(model) {
        ppu.experienceView = new ppu.ExperienceView({
          model: model
        });
        return this.$el.append(ppu.experienceView.render().el);
      }, this);
    };

    return ExperiencesView;

  })(Backbone.View);
  ppu.ExperiencesFilters = (function(_super) {
    __extends(ExperiencesFilters, _super);

    function ExperiencesFilters() {
      return ExperiencesFilters.__super__.constructor.apply(this, arguments);
    }

    ExperiencesFilters.prototype.el = $('#top-bar');

    ExperiencesFilters.prototype.template = $("#experiences-filter");

    ExperiencesFilters.prototype.events = {
      'change .position': 'byPosition',
      'change .country': 'byCountry',
      'change .category': 'byCategory',
      'keydown .query': 'byQuery',
      'submit .search': 'bySearch'
    };

    ExperiencesFilters.prototype.initialize = function() {
      return this.filtersAplied = {
        lang: app.lang
      };
    };

    ExperiencesFilters.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      this.$el.html(template);
      return ppu.appendSelect(this.el);
    };

    ExperiencesFilters.prototype.filterBy = function(data) {
      data = _.extend(this.filtersAplied, data);
      return app.pubsub.trigger("experiences:filter", data);
    };

    ExperiencesFilters.prototype.byPosition = function(e) {
      var val;
      val = $(e.currentTarget).find('select').val();
      return this.filterBy({
        by_position: val
      });
    };

    ExperiencesFilters.prototype.byCountry = function(e) {
      var el, val;
      el = $(e.currentTarget);
      if ($(".countries").find('input[type="checkbox"]:checked').length === 2) {
        return this.filterBy({
          by_country: ""
        });
      } else {
        if (el.find(":not(:checked)")) {
          val = this.CountryNotChecked(el);
          return this.filterBy({
            by_country: val
          });
        }
      }
    };

    ExperiencesFilters.prototype.CountryNotChecked = function(el) {
      var val;
      val = el.val() === "Colombia" ? "Chile" : "Colombia";
      $(".countries").find("input[value='" + val + "']").prop('checked', true);
      return val;
    };

    ExperiencesFilters.prototype.byCategory = function(e) {
      var val;
      val = $(e.currentTarget).find('select').val();
      return this.filterBy({
        by_category: val
      });
    };

    ExperiencesFilters.prototype.byQuery = function(e) {
      var val;
      val = $(e.currentTarget).val();
      if (val.length >= 1) {
        return this.filterBy({
          by_keyword: val
        });
      } else {
        return this.filterBy({
          by_keyword: ""
        });
      }
    };

    ExperiencesFilters.prototype.bySearch = function(e) {
      var val;
      e.preventDefault();
      val = $(e.currentTarget).find(".query").val();
      return this.filterBy({
        by_keyword: val
      });
    };

    return ExperiencesFilters;

  })(Backbone.View);
  return ppu.ExperienceDetailView = (function(_super) {
    __extends(ExperienceDetailView, _super);

    function ExperienceDetailView() {
      return ExperienceDetailView.__super__.constructor.apply(this, arguments);
    }

    ExperienceDetailView.prototype.el = $("#experience");

    ExperienceDetailView.prototype.template = $("#experience-detail-template");

    ExperienceDetailView.prototype.initialize = function() {
      this.listenTo(this.model, "change", this.render);
      return this.getTitle();
    };

    ExperienceDetailView.prototype.getTitle = function() {
      return $("#top-bar").html($("#experience-detail-title").html());
    };

    ExperienceDetailView.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      this.$el.html(template(this.model.toJSON()));
      return this.setUrlTranslation(this.model);
    };

    return ExperienceDetailView;

  })(Backbone.View);
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.Curriculum = (function(_super) {
    __extends(Curriculum, _super);

    function Curriculum() {
      return Curriculum.__super__.constructor.apply(this, arguments);
    }

    Curriculum.prototype.urlRoot = "/api/curriculums";

    return Curriculum;

  })(Backbone.Model);
  ppu.Curriculums = (function(_super) {
    __extends(Curriculums, _super);

    function Curriculums() {
      return Curriculums.__super__.constructor.apply(this, arguments);
    }

    Curriculums.prototype.url = "/api/curriculums";

    Curriculums.prototype.model = ppu.Curriculum;

    return Curriculums;

  })(Backbone.Collection);
  return ppu.CurriculumCreate = (function(_super) {
    __extends(CurriculumCreate, _super);

    function CurriculumCreate() {
      return CurriculumCreate.__super__.constructor.apply(this, arguments);
    }

    CurriculumCreate.prototype.el = $("#work-with-us");

    CurriculumCreate.prototype.events = {
      "click .send-cv": "saveCV"
    };

    CurriculumCreate.prototype.initialize = function() {
      this.listenTo(this.model, "sync", this.stored);
      return this.listenTo(this.model, "error", this.renderErrors, this);
    };

    CurriculumCreate.prototype.saveCV = function(e) {
      var $forms, datas, options;
      e.preventDefault();
      $forms = $(this.el).find('form');
      datas = new FormData($forms[0]);
      options = ppu.ajaxOptions("POST", datas);
      return this.model.save(datas, $.extend({}, options));
    };

    CurriculumCreate.prototype.stored = function(model) {
      var $forms;
      if (model) {
        $forms = $(this.el).find('form').fadeOut();
        return $(this.el).find(".form_thanks").removeClass("hidden");
      }
    };

    return CurriculumCreate;

  })(Backbone.View);
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.Contact = (function(_super) {
    __extends(Contact, _super);

    function Contact() {
      return Contact.__super__.constructor.apply(this, arguments);
    }

    Contact.prototype.urlRoot = "/api/contacts";

    return Contact;

  })(Backbone.Model);
  ppu.Contacts = (function(_super) {
    __extends(Contacts, _super);

    function Contacts() {
      return Contacts.__super__.constructor.apply(this, arguments);
    }

    Contacts.prototype.url = "/api/contacts";

    Contacts.prototype.model = ppu.Contact;

    return Contacts;

  })(Backbone.Collection);
  return ppu.FooterContactCreate = (function(_super) {
    __extends(FooterContactCreate, _super);

    function FooterContactCreate() {
      return FooterContactCreate.__super__.constructor.apply(this, arguments);
    }

    FooterContactCreate.prototype.el = $("#footer");

    FooterContactCreate.prototype.events = {
      "click .contact-save": "store",
      "keydown .form-control": "removeError"
    };

    FooterContactCreate.prototype.initialize = function() {
      this.listenTo(this.model, "sync", this.stored);
      this.listenTo(this.model, "error", this.renderErrors, this);
      return ppu.appendSelect(this.el);
    };

    FooterContactCreate.prototype.store = function(e) {
      var $forms, datas, options;
      e.preventDefault();
      $forms = $(this.el).find('form');
      datas = new FormData($forms[0]);
      options = ppu.ajaxOptions("POST", datas);
      return this.model.save(datas, $.extend({}, options));
    };

    FooterContactCreate.prototype.stored = function(model) {
      if (model) {
        $(this.el).find('form').fadeOut("fast");
        $(this.el).find('.social').css("margin", 0);
        return $(this.el).find('.form_thanks').removeClass("hidden");
      }
    };

    return FooterContactCreate;

  })(Backbone.View);
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  return ppu.Seo = (function(_super) {
    __extends(Seo, _super);

    function Seo() {
      return Seo.__super__.constructor.apply(this, arguments);
    }

    Seo.prototype.el = $("#ppu");

    Seo.prototype.template = $("#seo-template");

    Seo.prototype.initialize = function() {
      return app.pubsub.bind("seo:render", this.render, this);
    };

    Seo.prototype.render = function(data) {
      return console.log(data);
    };

    return Seo;

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
      ppu.lawyersView = new ppu.LawyersView({
        collection: ppu.lawyers
      });
      return ppu.lawyersFilters = new ppu.LawyersFilters;
    };

    Workspace.prototype.lawyer = function(slug) {
      ppu.lawyer = new ppu.Lawyer({
        id: slug
      });
      return ppu.LawyerDetailView = new ppu.LawyerDetailView({
        model: ppu.lawyer
      });
    };

    Workspace.prototype.posts = function() {
      ppu.posts = new ppu.Posts;
      ppu.posts.fetch({
        reset: true,
        data: {
          published: true,
          not_featured: true
        }
      });
      ppu.postsView = new ppu.PostsView({
        collection: ppu.posts
      });
      ppu.postsFeatured = new ppu.Posts;
      ppu.postsFeaturedView = new ppu.PostsFeaturedView({
        collection: ppu.postsFeatured
      });
      ppu.postsFilters = new ppu.PostsFilters;
      ppu.postsFilters.render();
      return ppu.filtersMobile = new ppu.FiltersMobile;
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
