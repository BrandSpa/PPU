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
    tolerance = 200;
    threshold = body.scrollHeight - window.innerHeight - tolerance;
    if ($(window).scrollTop() > threshold) {
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

console.log($(document));

$(document).scroll(function() {
  if ($(window).scrollTop() > app.topPadding) {
    return $(".top-bar-container").addClass("to-top");
  } else {
    return $(".top-bar-container").removeClass("to-top");
  }
});

mixins.lawyerRelationshipView = {
  tagName: "tr",
  events: {
    "click .open-edit": "openEdit",
    "click .remove": "remove"
  },
  initialize: function() {
    return this.listenTo(this.model, 'change', this.render);
  },
  setPosition: function(pos) {
    return this.model.save({
      position: pos
    });
  },
  render: function() {
    var source, template;
    source = $(this.template).html();
    template = Handlebars.compile(source);
    this.$el.html(template(this.model.toJSON()));
    this.$el.data('id', this.model.get('id'));
    return this;
  },
  openEdit: function(e) {
    var view;
    e.preventDefault();
    view = new this.modal({
      model: this.model
    });
    return view.render();
  },
  remove: function(e) {
    e.preventDefault();
    this.model.destroy();
    this.$el.fadeOut();
    return this.$el.remove();
  }
};

mixins.lawyerRelationshipViews = {
  events: {
    'click .open-modal-create': 'openCreate',
    "sortstop": "stop"
  },
  stop: function(event, ui) {
    var id, pos, that;
    pos = ui.item.index();
    id = $(ui.item).data('id');
    that = this;
    return $.map($(this.el).find('tbody tr'), function(el) {
      var model;
      pos = $(el).index();
      id = $(el).data('id');
      model = that.collection.get(id);
      return model.save({
        fields: {
          position: pos
        }
      });
    });
  },
  initialize: function() {
    this.listenTo(this.collection, 'reset', this.renderCollection);
    return this.listenTo(this.collection, 'add', this.renderCollection);
  },
  renderCollection: function() {
    this.$el.find('table tbody').html('');
    return this.collection.each(function(model) {
      return this.renderOne(model);
    }, this);
  },
  renderOne: function(model) {
    var view;
    view = new this.view({
      model: model
    });
    this.$el.find('table').append(view.render().el);
    return this.$el.find('.sortable').sortable();
  },
  openCreate: function(e) {
    var lawyer_id, view;
    e.preventDefault();
    lawyer_id = ppu.currentLawyerId || this.collection.models[0].get('lawyer_id');
    view = new this.modal({
      model: new this.collection.model,
      collection: this.collection
    });
    return view.render(lawyer_id);
  }
};

mixins.renderCollection = function(collection_name, view_name, data) {
  var collection, view;
  collection = new collection_name;
  collection.fetch({
    reset: true,
    data: data
  });
  return view = new view_name({
    collection: collection
  });
};

mixins.lawyerRelationshipModalCreate = {
  events: {
    "click .create": "create",
    "click .modal-close": "close"
  },
  initialize: function() {
    return this.listenTo(this.model, 'sync', this.created);
  },
  render: function(lawyer_id) {
    var data, source, template;
    data = {
      lawyer_id: lawyer_id
    };
    this.$el.find('.modal-body').html('');
    source = $(this.template).html();
    template = Handlebars.compile(source);
    this.$el.find('.modal-body').html(template(data));
    $(this.el).modal({
      backdrop: 'static'
    });
    return ppu.appendDatePickerYear(this.el);
  },
  create: function(e) {
    var $form, data, el, lawyer_id;
    e.preventDefault();
    el = $(e.currentTarget);
    lawyer_id = el.data('lawyer_id');
    $form = this.$el.find('form');
    data = new FormData($form[0]);
    return this.model.save(data, $.extend({}, ppu.ajaxOptions("POST", data)));
  },
  created: function(model) {
    if (model.id) {
      this.collection.add(model);
      return this.closeModal();
    }
  },
  close: function(e) {
    e.preventDefault();
    return this.closeModal();
  }
};

mixins.lawyerRelationshipModalEdit = {
  events: {
    "click .update": "update",
    "click .modal-close": "close"
  },
  initialize: function() {
    return this.listenTo(this.model, 'sync', this.updated);
  },
  render: function() {
    var source, template;
    this.$el.find('.modal-body').html('');
    source = $(this.template).html();
    template = Handlebars.compile(source);
    this.$el.find('.modal-body').html(template(this.model.toJSON()));
    $(this.el).modal({
      backdrop: 'static'
    });
    return ppu.appendDatePickerYear(this.el);
  },
  update: function(e) {
    var $form, data;
    e.preventDefault();
    $form = this.$el.find('form');
    data = new FormData($form[0]);
    return this.model.save(data, $.extend({}, ppu.ajaxOptions("PUT", data)));
  },
  updated: function(model) {
    if (model.id) {
      return this.closeModal();
    }
  },
  close: function(e) {
    e.preventDefault();
    return this.closeModal();
  }
};

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
  return text.substring(0, 190);
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

Handlebars.registerHelper('getLangDomain', function(url, block) {
  if (app.lang === 'en') {
    return "en.ppulegal.com/" + url + block;
  } else {
    return "http://ppulegal.com/" + url + block;
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
    window.urlTranslation = translations.slug;
  }
  if (translation) {
    return window.urlTranslation = translation.slug;
  }
};

Backbone.View.prototype.openShare = function() {
  return $("#share-modal").modal();
};

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

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

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.CategoryView = (function(_super) {
    __extends(CategoryView, _super);

    function CategoryView() {
      return CategoryView.__super__.constructor.apply(this, arguments);
    }

    CategoryView.prototype.template = $("#category-template");

    CategoryView.prototype.className = "col-md-6 col-sm-6 col-xs-12 category-item";

    CategoryView.prototype.events = {
      "click": "open"
    };

    CategoryView.prototype.open = function() {
      return window.location = "/areas/" + (this.model.get('slug'));
    };

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
  ppu.LawyerArticle = (function(_super) {
    __extends(LawyerArticle, _super);

    function LawyerArticle() {
      return LawyerArticle.__super__.constructor.apply(this, arguments);
    }

    LawyerArticle.prototype.urlRoot = "/api/lawyrs/articles";

    return LawyerArticle;

  })(Backbone.Model);
  ppu.LawyerArticles = (function(_super) {
    __extends(LawyerArticles, _super);

    function LawyerArticles() {
      return LawyerArticles.__super__.constructor.apply(this, arguments);
    }

    LawyerArticles.prototype.url = "/api/lawyrs/articles";

    LawyerArticles.prototype.model = ppu.LawyerArticle;

    return LawyerArticles;

  })(Backbone.Collection);
  ppu.LawyerArticleCreate = (function(_super) {
    __extends(LawyerArticleCreate, _super);

    function LawyerArticleCreate() {
      return LawyerArticleCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerArticleCreate.prototype.el = $("#lawyer-form-article");

    LawyerArticleCreate.prototype.template = $("#lawyer-article-form-template");

    LawyerArticleCreate.prototype.events = {
      'click .lawyer-add-article': 'addForm'
    };

    LawyerArticleCreate.prototype.initialize = function() {
      this.appendForm();
      return app.pubsub.bind('lawyer:stored', this.store, this);
    };

    LawyerArticleCreate.prototype.appendForm = function() {
      return ppu.appendForm(this.el, this.template);
    };

    LawyerArticleCreate.prototype.addForm = function(e) {
      e.preventDefault();
      return this.appendForm();
    };

    LawyerArticleCreate.prototype.store = function(data) {
      return ppu.saveMultipeForms(this.el, this.model, data.id);
    };

    return LawyerArticleCreate;

  })(Backbone.View);
  ppu.LawyerArticlesEditModal = (function(_super) {
    __extends(LawyerArticlesEditModal, _super);

    function LawyerArticlesEditModal() {
      return LawyerArticlesEditModal.__super__.constructor.apply(this, arguments);
    }

    LawyerArticlesEditModal.prototype.el = $("#lawyer-article-edit-modal");

    LawyerArticlesEditModal.prototype.template = $("#lawyer-article-form-template");

    _.extend(LawyerArticlesEditModal.prototype, mixins.lawyerRelationshipModalEdit);

    return LawyerArticlesEditModal;

  })(Backbone.View);
  ppu.LawyerArticleView = (function(_super) {
    __extends(LawyerArticleView, _super);

    function LawyerArticleView() {
      return LawyerArticleView.__super__.constructor.apply(this, arguments);
    }

    LawyerArticleView.prototype.tagName = 'tr';

    LawyerArticleView.prototype.template = $('#lawyer-article-template');

    LawyerArticleView.prototype.modal = ppu.LawyerArticlesEditModal;

    _.extend(LawyerArticleView.prototype, mixins.lawyerRelationshipView);

    return LawyerArticleView;

  })(Backbone.View);
  ppu.LawyerArticleModalCreate = (function(_super) {
    __extends(LawyerArticleModalCreate, _super);

    function LawyerArticleModalCreate() {
      return LawyerArticleModalCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerArticleModalCreate.prototype.el = $("#lawyer-relationship-create-modal");

    LawyerArticleModalCreate.prototype.template = $("#lawyer-article-form-template");

    _.extend(LawyerArticleModalCreate.prototype, mixins.lawyerRelationshipModalCreate);

    return LawyerArticleModalCreate;

  })(Backbone.View);
  return ppu.LawyerArticlesEdit = (function(_super) {
    __extends(LawyerArticlesEdit, _super);

    function LawyerArticlesEdit() {
      return LawyerArticlesEdit.__super__.constructor.apply(this, arguments);
    }

    LawyerArticlesEdit.prototype.el = $("#lawyer-article-edit");

    LawyerArticlesEdit.prototype.view = ppu.LawyerArticleView;

    LawyerArticlesEdit.prototype.modal = ppu.LawyerArticleModalCreate;

    _.extend(LawyerArticlesEdit.prototype, mixins.lawyerRelationshipViews);

    return LawyerArticlesEdit;

  })(Backbone.View);
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.LawyerAward = (function(_super) {
    __extends(LawyerAward, _super);

    function LawyerAward() {
      return LawyerAward.__super__.constructor.apply(this, arguments);
    }

    LawyerAward.prototype.urlRoot = "/api/lawyrs/awards";

    return LawyerAward;

  })(Backbone.Model);
  ppu.LawyerAwards = (function(_super) {
    __extends(LawyerAwards, _super);

    function LawyerAwards() {
      return LawyerAwards.__super__.constructor.apply(this, arguments);
    }

    LawyerAwards.prototype.url = "/api/lawyrs/awards";

    LawyerAwards.prototype.model = ppu.LawyerAward;

    return LawyerAwards;

  })(Backbone.Collection);
  ppu.LawyerAwardCreate = (function(_super) {
    __extends(LawyerAwardCreate, _super);

    function LawyerAwardCreate() {
      return LawyerAwardCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerAwardCreate.prototype.el = $("#lawyer-form-award");

    LawyerAwardCreate.prototype.template = $("#lawyer-form-award-template");

    LawyerAwardCreate.prototype.events = {
      'click .lawyer-add-award': 'addForm'
    };

    LawyerAwardCreate.prototype.initialize = function() {
      this.appendForm();
      return app.pubsub.bind('lawyer:stored', this.store, this);
    };

    LawyerAwardCreate.prototype.appendForm = function() {
      return ppu.appendForm(this.el, this.template);
    };

    LawyerAwardCreate.prototype.addForm = function(e) {
      e.preventDefault();
      return this.appendForm();
    };

    LawyerAwardCreate.prototype.store = function(data) {
      return ppu.saveMultipeForms(this.el, this.model, data.id);
    };

    return LawyerAwardCreate;

  })(Backbone.View);
  ppu.LawyerAwardsEditModal = (function(_super) {
    __extends(LawyerAwardsEditModal, _super);

    function LawyerAwardsEditModal() {
      return LawyerAwardsEditModal.__super__.constructor.apply(this, arguments);
    }

    LawyerAwardsEditModal.prototype.el = $("#lawyer-award-edit-modal");

    LawyerAwardsEditModal.prototype.template = $("#lawyer-form-award-template");

    _.extend(LawyerAwardsEditModal.prototype, mixins.lawyerRelationshipModalEdit);

    return LawyerAwardsEditModal;

  })(Backbone.View);
  ppu.LawyerAwardView = (function(_super) {
    __extends(LawyerAwardView, _super);

    function LawyerAwardView() {
      return LawyerAwardView.__super__.constructor.apply(this, arguments);
    }

    LawyerAwardView.prototype.tagName = 'li';

    LawyerAwardView.prototype.template = $('#lawyer-award-template');

    LawyerAwardView.prototype.modal = ppu.LawyerAwardsEditModal;

    _.extend(LawyerAwardView.prototype, mixins.lawyerRelationshipView);

    return LawyerAwardView;

  })(Backbone.View);
  ppu.LawyerAwardModalCreate = (function(_super) {
    __extends(LawyerAwardModalCreate, _super);

    function LawyerAwardModalCreate() {
      return LawyerAwardModalCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerAwardModalCreate.prototype.el = $("#lawyer-relationship-create-modal");

    LawyerAwardModalCreate.prototype.template = $("#lawyer-form-award-template");

    _.extend(LawyerAwardModalCreate.prototype, mixins.lawyerRelationshipModalCreate);

    return LawyerAwardModalCreate;

  })(Backbone.View);
  return ppu.LawyerAwardsEdit = (function(_super) {
    __extends(LawyerAwardsEdit, _super);

    function LawyerAwardsEdit() {
      return LawyerAwardsEdit.__super__.constructor.apply(this, arguments);
    }

    LawyerAwardsEdit.prototype.el = $("#lawyer-award-edit");

    LawyerAwardsEdit.prototype.view = ppu.LawyerAwardView;

    LawyerAwardsEdit.prototype.modal = ppu.LawyerAwardModalCreate;

    _.extend(LawyerAwardsEdit.prototype, mixins.lawyerRelationshipViews);

    return LawyerAwardsEdit;

  })(Backbone.View);
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.LawyerAcademic = (function(_super) {
    __extends(LawyerAcademic, _super);

    function LawyerAcademic() {
      return LawyerAcademic.__super__.constructor.apply(this, arguments);
    }

    LawyerAcademic.prototype.urlRoot = "/api/lawyrs/academics";

    return LawyerAcademic;

  })(Backbone.Model);
  ppu.LawyerAcademics = (function(_super) {
    __extends(LawyerAcademics, _super);

    function LawyerAcademics() {
      return LawyerAcademics.__super__.constructor.apply(this, arguments);
    }

    LawyerAcademics.prototype.url = "/api/lawyrs/academics";

    LawyerAcademics.prototype.model = ppu.LawyerAcademic;

    return LawyerAcademics;

  })(Backbone.Collection);
  ppu.LawyerAcademicCreate = (function(_super) {
    __extends(LawyerAcademicCreate, _super);

    function LawyerAcademicCreate() {
      return LawyerAcademicCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerAcademicCreate.prototype.el = $("#lawyer-form-academic");

    LawyerAcademicCreate.prototype.template = $("#lawyer-academic-form-template");

    LawyerAcademicCreate.prototype.events = {
      'click .lawyer-add-academic': 'addForm'
    };

    LawyerAcademicCreate.prototype.initialize = function() {
      this.appendForm();
      return app.pubsub.bind('lawyer:stored', this.store, this);
    };

    LawyerAcademicCreate.prototype.appendForm = function() {
      return ppu.appendForm(this.el, this.template);
    };

    LawyerAcademicCreate.prototype.addForm = function(e) {
      e.preventDefault();
      return this.appendForm();
    };

    LawyerAcademicCreate.prototype.store = function(data) {
      return ppu.saveMultipeForms(this.el, this.model, data.id);
    };

    return LawyerAcademicCreate;

  })(Backbone.View);
  ppu.LawyerAcademicsEditModal = (function(_super) {
    __extends(LawyerAcademicsEditModal, _super);

    function LawyerAcademicsEditModal() {
      return LawyerAcademicsEditModal.__super__.constructor.apply(this, arguments);
    }

    LawyerAcademicsEditModal.prototype.el = $("#lawyer-academic-edit-modal");

    LawyerAcademicsEditModal.prototype.template = $("#lawyer-academic-form-template");

    _.extend(LawyerAcademicsEditModal.prototype, mixins.lawyerRelationshipModalEdit);

    return LawyerAcademicsEditModal;

  })(Backbone.View);
  ppu.LawyerAcademicView = (function(_super) {
    __extends(LawyerAcademicView, _super);

    function LawyerAcademicView() {
      return LawyerAcademicView.__super__.constructor.apply(this, arguments);
    }

    LawyerAcademicView.prototype.tagName = 'li';

    LawyerAcademicView.prototype.template = $('#lawyer-academic-template');

    LawyerAcademicView.prototype.modal = ppu.LawyerAcademicsEditModal;

    _.extend(LawyerAcademicView.prototype, mixins.lawyerRelationshipView);

    return LawyerAcademicView;

  })(Backbone.View);
  ppu.LawyerAcademicModalCreate = (function(_super) {
    __extends(LawyerAcademicModalCreate, _super);

    function LawyerAcademicModalCreate() {
      return LawyerAcademicModalCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerAcademicModalCreate.prototype.el = $("#lawyer-relationship-create-modal");

    LawyerAcademicModalCreate.prototype.template = $("#lawyer-academic-form-template");

    _.extend(LawyerAcademicModalCreate.prototype, mixins.lawyerRelationshipModalCreate);

    return LawyerAcademicModalCreate;

  })(Backbone.View);
  return ppu.LawyerAcademicsEdit = (function(_super) {
    __extends(LawyerAcademicsEdit, _super);

    function LawyerAcademicsEdit() {
      return LawyerAcademicsEdit.__super__.constructor.apply(this, arguments);
    }

    LawyerAcademicsEdit.prototype.el = $("#lawyer-academic-edit");

    LawyerAcademicsEdit.prototype.view = ppu.LawyerAcademicView;

    LawyerAcademicsEdit.prototype.modal = ppu.LawyerAcademicModalCreate;

    _.extend(LawyerAcademicsEdit.prototype, mixins.lawyerRelationshipViews);

    return LawyerAcademicsEdit;

  })(Backbone.View);
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.LawyerEducation = (function(_super) {
    __extends(LawyerEducation, _super);

    function LawyerEducation() {
      return LawyerEducation.__super__.constructor.apply(this, arguments);
    }

    LawyerEducation.prototype.urlRoot = "/api/lawyrs/educations";

    return LawyerEducation;

  })(Backbone.Model);
  ppu.LawyerEducations = (function(_super) {
    __extends(LawyerEducations, _super);

    function LawyerEducations() {
      return LawyerEducations.__super__.constructor.apply(this, arguments);
    }

    LawyerEducations.prototype.url = "/api/lawyrs/educations";

    LawyerEducations.prototype.model = ppu.LawyerEducation;

    return LawyerEducations;

  })(Backbone.Collection);
  ppu.LawyerEducationCreate = (function(_super) {
    __extends(LawyerEducationCreate, _super);

    function LawyerEducationCreate() {
      return LawyerEducationCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerEducationCreate.prototype.el = $("#lawyer-form-education");

    LawyerEducationCreate.prototype.template = $("#lawyer-form-education-template");

    LawyerEducationCreate.prototype.events = {
      'click .lawyer-add-education': 'addForm'
    };

    LawyerEducationCreate.prototype.initialize = function() {
      this.appendForm();
      return app.pubsub.bind('lawyer:stored', this.store, this);
    };

    LawyerEducationCreate.prototype.appendForm = function() {
      return ppu.appendForm(this.el, this.template);
    };

    LawyerEducationCreate.prototype.addForm = function(e) {
      e.preventDefault();
      return this.appendForm();
    };

    LawyerEducationCreate.prototype.store = function(data) {
      return ppu.saveMultipeForms(this.el, this.model, data.id);
    };

    return LawyerEducationCreate;

  })(Backbone.View);
  ppu.LawyerEducationModalCreate = (function(_super) {
    __extends(LawyerEducationModalCreate, _super);

    function LawyerEducationModalCreate() {
      return LawyerEducationModalCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerEducationModalCreate.prototype.el = $("#lawyer-relationship-create-modal");

    LawyerEducationModalCreate.prototype.template = $("#lawyer-form-education-template");

    _.extend(LawyerEducationModalCreate.prototype, mixins.lawyerRelationshipModalCreate);

    return LawyerEducationModalCreate;

  })(Backbone.View);
  ppu.LawyerEducationEditModal = (function(_super) {
    __extends(LawyerEducationEditModal, _super);

    function LawyerEducationEditModal() {
      return LawyerEducationEditModal.__super__.constructor.apply(this, arguments);
    }

    LawyerEducationEditModal.prototype.el = $("#lawyer-education-edit-modal");

    LawyerEducationEditModal.prototype.template = $("#lawyer-form-education-template");

    _.extend(LawyerEducationEditModal.prototype, mixins.lawyerRelationshipModalEdit);

    return LawyerEducationEditModal;

  })(Backbone.View);
  ppu.LawyerEducationView = (function(_super) {
    __extends(LawyerEducationView, _super);

    function LawyerEducationView() {
      return LawyerEducationView.__super__.constructor.apply(this, arguments);
    }

    LawyerEducationView.prototype.tagName = 'li';

    LawyerEducationView.prototype.template = $('#lawyer-education-template');

    LawyerEducationView.prototype.modal = ppu.LawyerEducationEditModal;

    _.extend(LawyerEducationView.prototype, mixins.lawyerRelationshipView);

    return LawyerEducationView;

  })(Backbone.View);
  return ppu.LawyerEducationsEdit = (function(_super) {
    __extends(LawyerEducationsEdit, _super);

    function LawyerEducationsEdit() {
      return LawyerEducationsEdit.__super__.constructor.apply(this, arguments);
    }

    LawyerEducationsEdit.prototype.el = $("#lawyer-education-edit");

    LawyerEducationsEdit.prototype.view = ppu.LawyerEducationView;

    LawyerEducationsEdit.prototype.modal = ppu.LawyerEducationModalCreate;

    _.extend(LawyerEducationsEdit.prototype, mixins.lawyerRelationshipViews);

    return LawyerEducationsEdit;

  })(Backbone.View);
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.LawyerInstitution = (function(_super) {
    __extends(LawyerInstitution, _super);

    function LawyerInstitution() {
      return LawyerInstitution.__super__.constructor.apply(this, arguments);
    }

    LawyerInstitution.prototype.urlRoot = "/api/lawyrs/institutions";

    return LawyerInstitution;

  })(Backbone.Model);
  ppu.LawyerInstitutions = (function(_super) {
    __extends(LawyerInstitutions, _super);

    function LawyerInstitutions() {
      return LawyerInstitutions.__super__.constructor.apply(this, arguments);
    }

    LawyerInstitutions.prototype.url = "/api/lawyrs/institutions";

    LawyerInstitutions.prototype.model = ppu.LawyerInstitution;

    return LawyerInstitutions;

  })(Backbone.Collection);
  ppu.LawyerInstitutionCreate = (function(_super) {
    __extends(LawyerInstitutionCreate, _super);

    function LawyerInstitutionCreate() {
      return LawyerInstitutionCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerInstitutionCreate.prototype.el = $("#lawyer-form-institution");

    LawyerInstitutionCreate.prototype.template = $("#lawyer-form-institution-template");

    LawyerInstitutionCreate.prototype.events = {
      'click .lawyer-add-institution': 'addForm'
    };

    LawyerInstitutionCreate.prototype.initialize = function() {
      this.appendForm();
      return app.pubsub.bind('lawyer:stored', this.store, this);
    };

    LawyerInstitutionCreate.prototype.appendForm = function() {
      return ppu.appendForm(this.el, this.template);
    };

    LawyerInstitutionCreate.prototype.addForm = function(e) {
      e.preventDefault();
      return this.appendForm();
    };

    LawyerInstitutionCreate.prototype.store = function(data) {
      return ppu.saveMultipeForms(this.el, this.model, data.id);
    };

    return LawyerInstitutionCreate;

  })(Backbone.View);
  ppu.LawyerInstitutionsEditModal = (function(_super) {
    __extends(LawyerInstitutionsEditModal, _super);

    function LawyerInstitutionsEditModal() {
      return LawyerInstitutionsEditModal.__super__.constructor.apply(this, arguments);
    }

    LawyerInstitutionsEditModal.prototype.el = $("#lawyer-institution-edit-modal");

    LawyerInstitutionsEditModal.prototype.template = $("#lawyer-form-institution-template");

    _.extend(LawyerInstitutionsEditModal.prototype, mixins.lawyerRelationshipModalEdit);

    return LawyerInstitutionsEditModal;

  })(Backbone.View);
  ppu.LawyerInstitutionView = (function(_super) {
    __extends(LawyerInstitutionView, _super);

    function LawyerInstitutionView() {
      return LawyerInstitutionView.__super__.constructor.apply(this, arguments);
    }

    LawyerInstitutionView.prototype.tagName = 'li';

    LawyerInstitutionView.prototype.template = $('#lawyer-institution-template');

    LawyerInstitutionView.prototype.modal = ppu.LawyerInstitutionsEditModal;

    _.extend(LawyerInstitutionView.prototype, mixins.lawyerRelationshipView);

    return LawyerInstitutionView;

  })(Backbone.View);
  ppu.LawyerInstitutionModalCreate = (function(_super) {
    __extends(LawyerInstitutionModalCreate, _super);

    function LawyerInstitutionModalCreate() {
      return LawyerInstitutionModalCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerInstitutionModalCreate.prototype.el = $("#lawyer-relationship-create-modal");

    LawyerInstitutionModalCreate.prototype.template = $("#lawyer-form-institution-template");

    _.extend(LawyerInstitutionModalCreate.prototype, mixins.lawyerRelationshipModalCreate);

    return LawyerInstitutionModalCreate;

  })(Backbone.View);
  return ppu.LawyerInstitutionsEdit = (function(_super) {
    __extends(LawyerInstitutionsEdit, _super);

    function LawyerInstitutionsEdit() {
      return LawyerInstitutionsEdit.__super__.constructor.apply(this, arguments);
    }

    LawyerInstitutionsEdit.prototype.el = $("#lawyer-institution-edit");

    LawyerInstitutionsEdit.prototype.view = ppu.LawyerInstitutionView;

    LawyerInstitutionsEdit.prototype.modal = ppu.LawyerInstitutionModalCreate;

    _.extend(LawyerInstitutionsEdit.prototype, mixins.lawyerRelationshipViews);

    return LawyerInstitutionsEdit;

  })(Backbone.View);
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.LawyerLanguage = (function(_super) {
    __extends(LawyerLanguage, _super);

    function LawyerLanguage() {
      return LawyerLanguage.__super__.constructor.apply(this, arguments);
    }

    LawyerLanguage.prototype.urlRoot = "/api/lawyrs/languages";

    return LawyerLanguage;

  })(Backbone.Model);
  ppu.LawyerLanguages = (function(_super) {
    __extends(LawyerLanguages, _super);

    function LawyerLanguages() {
      return LawyerLanguages.__super__.constructor.apply(this, arguments);
    }

    LawyerLanguages.prototype.url = "/api/lawyrs/languages";

    LawyerLanguages.prototype.model = ppu.LawyerLanguage;

    return LawyerLanguages;

  })(Backbone.Collection);
  ppu.LawyerLanguageCreate = (function(_super) {
    __extends(LawyerLanguageCreate, _super);

    function LawyerLanguageCreate() {
      return LawyerLanguageCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerLanguageCreate.prototype.el = $("#lawyer-form-language");

    LawyerLanguageCreate.prototype.template = $("#lawyer-form-language-template");

    LawyerLanguageCreate.prototype.events = {
      'click .lawyer-add-language': 'addForm'
    };

    LawyerLanguageCreate.prototype.initialize = function() {
      this.appendForm();
      return app.pubsub.bind('lawyer:stored', this.store, this);
    };

    LawyerLanguageCreate.prototype.appendForm = function() {
      return ppu.appendForm(this.el, this.template);
    };

    LawyerLanguageCreate.prototype.addForm = function(e) {
      e.preventDefault();
      return this.appendForm();
    };

    LawyerLanguageCreate.prototype.store = function(data) {
      return ppu.saveMultipeForms(this.el, this.model, data.id);
    };

    return LawyerLanguageCreate;

  })(Backbone.View);
  ppu.LawyerLanguagesCreateModal = (function(_super) {
    __extends(LawyerLanguagesCreateModal, _super);

    function LawyerLanguagesCreateModal() {
      return LawyerLanguagesCreateModal.__super__.constructor.apply(this, arguments);
    }

    LawyerLanguagesCreateModal.prototype.el = $("#lawyer-relationship-create-modal");

    LawyerLanguagesCreateModal.prototype.template = $("#lawyer-form-language-template");

    _.extend(LawyerLanguagesCreateModal.prototype, mixins.lawyerRelationshipModalCreate);

    return LawyerLanguagesCreateModal;

  })(Backbone.View);
  ppu.LawyerLanguagesEditModal = (function(_super) {
    __extends(LawyerLanguagesEditModal, _super);

    function LawyerLanguagesEditModal() {
      return LawyerLanguagesEditModal.__super__.constructor.apply(this, arguments);
    }

    LawyerLanguagesEditModal.prototype.el = $("#lawyer-language-edit-modal");

    LawyerLanguagesEditModal.prototype.template = $("#lawyer-form-language-template");

    _.extend(LawyerLanguagesEditModal.prototype, mixins.lawyerRelationshipModalEdit);

    return LawyerLanguagesEditModal;

  })(Backbone.View);
  ppu.LawyerLanguageView = (function(_super) {
    __extends(LawyerLanguageView, _super);

    function LawyerLanguageView() {
      return LawyerLanguageView.__super__.constructor.apply(this, arguments);
    }

    LawyerLanguageView.prototype.tagName = 'li';

    LawyerLanguageView.prototype.template = $('#lawyer-language-template');

    LawyerLanguageView.prototype.modal = ppu.LawyerLanguagesEditModal;

    _.extend(LawyerLanguageView.prototype, mixins.lawyerRelationshipView);

    return LawyerLanguageView;

  })(Backbone.View);
  return ppu.LawyerLanguagesEdit = (function(_super) {
    __extends(LawyerLanguagesEdit, _super);

    function LawyerLanguagesEdit() {
      return LawyerLanguagesEdit.__super__.constructor.apply(this, arguments);
    }

    LawyerLanguagesEdit.prototype.el = $("#lawyer-language-edit");

    LawyerLanguagesEdit.prototype.view = ppu.LawyerLanguageView;

    LawyerLanguagesEdit.prototype.modal = ppu.LawyerLanguagesCreateModal;

    _.extend(LawyerLanguagesEdit.prototype, mixins.lawyerRelationshipViews);

    return LawyerLanguagesEdit;

  })(Backbone.View);
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.LawyerPharase = (function(_super) {
    __extends(LawyerPharase, _super);

    function LawyerPharase() {
      return LawyerPharase.__super__.constructor.apply(this, arguments);
    }

    LawyerPharase.prototype.urlRoot = "/api/lawyrs/pharases";

    return LawyerPharase;

  })(Backbone.Model);
  ppu.LawyerPharases = (function(_super) {
    __extends(LawyerPharases, _super);

    function LawyerPharases() {
      return LawyerPharases.__super__.constructor.apply(this, arguments);
    }

    LawyerPharases.prototype.url = "/api/lawyrs/pharases";

    LawyerPharases.prototype.model = ppu.LawyerPharase;

    return LawyerPharases;

  })(Backbone.Collection);
  ppu.LawyerPharaseCreate = (function(_super) {
    __extends(LawyerPharaseCreate, _super);

    function LawyerPharaseCreate() {
      return LawyerPharaseCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerPharaseCreate.prototype.el = $("#lawyer-form-phrase");

    LawyerPharaseCreate.prototype.template = $("#lawyer-form-phrase-template");

    LawyerPharaseCreate.prototype.events = {
      'click .lawyer-add-phrase': 'addForm'
    };

    LawyerPharaseCreate.prototype.initialize = function() {
      this.appendForm();
      return app.pubsub.bind('lawyer:stored', this.store, this);
    };

    LawyerPharaseCreate.prototype.appendForm = function() {
      return ppu.appendForm(this.el, this.template);
    };

    LawyerPharaseCreate.prototype.addForm = function(e) {
      e.preventDefault();
      return this.appendForm();
    };

    LawyerPharaseCreate.prototype.store = function(data) {
      return ppu.saveMultipeForms(this.el, this.model, data.id);
    };

    return LawyerPharaseCreate;

  })(Backbone.View);
  ppu.LawyerPhrasesEditModal = (function(_super) {
    __extends(LawyerPhrasesEditModal, _super);

    function LawyerPhrasesEditModal() {
      return LawyerPhrasesEditModal.__super__.constructor.apply(this, arguments);
    }

    LawyerPhrasesEditModal.prototype.el = $("#lawyer-phrase-edit-modal");

    LawyerPhrasesEditModal.prototype.template = $("#lawyer-form-phrase-template");

    _.extend(LawyerPhrasesEditModal.prototype, mixins.lawyerRelationshipModalEdit);

    return LawyerPhrasesEditModal;

  })(Backbone.View);
  ppu.LawyerPharaseView = (function(_super) {
    __extends(LawyerPharaseView, _super);

    function LawyerPharaseView() {
      return LawyerPharaseView.__super__.constructor.apply(this, arguments);
    }

    LawyerPharaseView.prototype.tagName = 'li';

    LawyerPharaseView.prototype.template = $('#lawyer-phrase-template');

    LawyerPharaseView.prototype.modal = ppu.LawyerPhrasesEditModal;

    _.extend(LawyerPharaseView.prototype, mixins.lawyerRelationshipView);

    return LawyerPharaseView;

  })(Backbone.View);
  ppu.LawyerPhraseModalCreate = (function(_super) {
    __extends(LawyerPhraseModalCreate, _super);

    function LawyerPhraseModalCreate() {
      return LawyerPhraseModalCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerPhraseModalCreate.prototype.el = $("#lawyer-relationship-create-modal");

    LawyerPhraseModalCreate.prototype.template = $("#lawyer-form-phrase-template");

    _.extend(LawyerPhraseModalCreate.prototype, mixins.lawyerRelationshipModalCreate);

    return LawyerPhraseModalCreate;

  })(Backbone.View);
  return ppu.LawyerPharasesEdit = (function(_super) {
    __extends(LawyerPharasesEdit, _super);

    function LawyerPharasesEdit() {
      return LawyerPharasesEdit.__super__.constructor.apply(this, arguments);
    }

    LawyerPharasesEdit.prototype.el = $("#lawyer-phrase-edit");

    LawyerPharasesEdit.prototype.view = ppu.LawyerPharaseView;

    LawyerPharasesEdit.prototype.modal = ppu.LawyerPhraseModalCreate;

    _.extend(LawyerPharasesEdit.prototype, mixins.lawyerRelationshipViews);

    return LawyerPharasesEdit;

  })(Backbone.View);
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.LawyerJob = (function(_super) {
    __extends(LawyerJob, _super);

    function LawyerJob() {
      return LawyerJob.__super__.constructor.apply(this, arguments);
    }

    LawyerJob.prototype.urlRoot = "/api/lawyrs/jobs";

    return LawyerJob;

  })(Backbone.Model);
  ppu.LawyerJobs = (function(_super) {
    __extends(LawyerJobs, _super);

    function LawyerJobs() {
      return LawyerJobs.__super__.constructor.apply(this, arguments);
    }

    LawyerJobs.prototype.url = "/api/lawyrs/jobs";

    LawyerJobs.prototype.model = ppu.LawyerJob;

    return LawyerJobs;

  })(Backbone.Collection);
  ppu.LawyerJobCreate = (function(_super) {
    __extends(LawyerJobCreate, _super);

    function LawyerJobCreate() {
      return LawyerJobCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerJobCreate.prototype.el = $("#lawyer-form-job");

    LawyerJobCreate.prototype.template = $("#lawyer-form-job-template");

    LawyerJobCreate.prototype.events = {
      'click .lawyer-add-job': 'addForm'
    };

    LawyerJobCreate.prototype.initialize = function() {
      this.appendForm();
      return app.pubsub.bind('lawyer:stored', this.store, this);
    };

    LawyerJobCreate.prototype.appendForm = function() {
      return ppu.appendForm(this.el, this.template);
    };

    LawyerJobCreate.prototype.addForm = function(e) {
      e.preventDefault();
      return this.appendForm();
    };

    LawyerJobCreate.prototype.store = function(data) {
      return ppu.saveMultipeForms(this.el, this.model, data.id);
    };

    return LawyerJobCreate;

  })(Backbone.View);
  ppu.LawyerJobsEditModal = (function(_super) {
    __extends(LawyerJobsEditModal, _super);

    function LawyerJobsEditModal() {
      return LawyerJobsEditModal.__super__.constructor.apply(this, arguments);
    }

    LawyerJobsEditModal.prototype.el = $("#lawyer-job-edit-modal");

    LawyerJobsEditModal.prototype.template = $("#lawyer-form-job-template");

    _.extend(LawyerJobsEditModal.prototype, mixins.lawyerRelationshipModalEdit);

    return LawyerJobsEditModal;

  })(Backbone.View);
  ppu.LawyerJobView = (function(_super) {
    __extends(LawyerJobView, _super);

    function LawyerJobView() {
      return LawyerJobView.__super__.constructor.apply(this, arguments);
    }

    LawyerJobView.prototype.tagName = 'li';

    LawyerJobView.prototype.template = $('#lawyer-job-template');

    LawyerJobView.prototype.modal = ppu.LawyerJobsEditModal;

    _.extend(LawyerJobView.prototype, mixins.lawyerRelationshipView);

    return LawyerJobView;

  })(Backbone.View);
  ppu.LawyerJobModalCreate = (function(_super) {
    __extends(LawyerJobModalCreate, _super);

    function LawyerJobModalCreate() {
      return LawyerJobModalCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerJobModalCreate.prototype.el = $("#lawyer-relationship-create-modal");

    LawyerJobModalCreate.prototype.template = $("#lawyer-form-job-template");

    _.extend(LawyerJobModalCreate.prototype, mixins.lawyerRelationshipModalCreate);

    return LawyerJobModalCreate;

  })(Backbone.View);
  return ppu.LawyerJobsEdit = (function(_super) {
    __extends(LawyerJobsEdit, _super);

    function LawyerJobsEdit() {
      return LawyerJobsEdit.__super__.constructor.apply(this, arguments);
    }

    LawyerJobsEdit.prototype.el = $("#lawyer-job-edit");

    LawyerJobsEdit.prototype.view = ppu.LawyerJobView;

    LawyerJobsEdit.prototype.modal = ppu.LawyerJobModalCreate;

    _.extend(LawyerJobsEdit.prototype, mixins.lawyerRelationshipViews);

    return LawyerJobsEdit;

  })(Backbone.View);
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.LawyerRecognition = (function(_super) {
    __extends(LawyerRecognition, _super);

    function LawyerRecognition() {
      return LawyerRecognition.__super__.constructor.apply(this, arguments);
    }

    LawyerRecognition.prototype.urlRoot = "/api/lawyrs/recognitions";

    return LawyerRecognition;

  })(Backbone.Model);
  ppu.LawyerRecognitions = (function(_super) {
    __extends(LawyerRecognitions, _super);

    function LawyerRecognitions() {
      return LawyerRecognitions.__super__.constructor.apply(this, arguments);
    }

    LawyerRecognitions.prototype.url = "/api/lawyrs/recognitions";

    LawyerRecognitions.prototype.model = ppu.LawyerRecognition;

    return LawyerRecognitions;

  })(Backbone.Collection);
  ppu.LawyerRecognitionCreate = (function(_super) {
    __extends(LawyerRecognitionCreate, _super);

    function LawyerRecognitionCreate() {
      return LawyerRecognitionCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerRecognitionCreate.prototype.el = $("#lawyer-form-recognition");

    LawyerRecognitionCreate.prototype.template = $("#lawyer-form-recognition-template");

    LawyerRecognitionCreate.prototype.events = {
      'click .lawyer-add-recognition': 'addForm'
    };

    LawyerRecognitionCreate.prototype.initialize = function() {
      this.appendForm();
      return app.pubsub.bind('lawyer:stored', this.store, this);
    };

    LawyerRecognitionCreate.prototype.appendForm = function() {
      return ppu.appendForm(this.el, this.template);
    };

    LawyerRecognitionCreate.prototype.addForm = function(e) {
      e.preventDefault();
      return this.appendForm();
    };

    LawyerRecognitionCreate.prototype.store = function(data) {
      return ppu.saveMultipeForms(this.el, this.model, data.id);
    };

    return LawyerRecognitionCreate;

  })(Backbone.View);
  ppu.LawyerRecognitionsEditModal = (function(_super) {
    __extends(LawyerRecognitionsEditModal, _super);

    function LawyerRecognitionsEditModal() {
      return LawyerRecognitionsEditModal.__super__.constructor.apply(this, arguments);
    }

    LawyerRecognitionsEditModal.prototype.el = $("#lawyer-recognition-edit-modal");

    LawyerRecognitionsEditModal.prototype.template = $("#lawyer-form-recognition-template");

    _.extend(LawyerRecognitionsEditModal.prototype, mixins.lawyerRelationshipModalEdit);

    return LawyerRecognitionsEditModal;

  })(Backbone.View);
  ppu.LawyerRecognitionView = (function(_super) {
    __extends(LawyerRecognitionView, _super);

    function LawyerRecognitionView() {
      return LawyerRecognitionView.__super__.constructor.apply(this, arguments);
    }

    LawyerRecognitionView.prototype.tagName = 'li';

    LawyerRecognitionView.prototype.template = $('#lawyer-recognition-template');

    LawyerRecognitionView.prototype.modal = ppu.LawyerRecognitionsEditModal;

    _.extend(LawyerRecognitionView.prototype, mixins.lawyerRelationshipView);

    return LawyerRecognitionView;

  })(Backbone.View);
  ppu.LawyerRecognitionModalCreate = (function(_super) {
    __extends(LawyerRecognitionModalCreate, _super);

    function LawyerRecognitionModalCreate() {
      return LawyerRecognitionModalCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerRecognitionModalCreate.prototype.el = $("#lawyer-relationship-create-modal");

    LawyerRecognitionModalCreate.prototype.template = $("#lawyer-form-recognition-template");

    _.extend(LawyerRecognitionModalCreate.prototype, mixins.lawyerRelationshipModalCreate);

    return LawyerRecognitionModalCreate;

  })(Backbone.View);
  return ppu.LawyerRecognitionsEdit = (function(_super) {
    __extends(LawyerRecognitionsEdit, _super);

    function LawyerRecognitionsEdit() {
      return LawyerRecognitionsEdit.__super__.constructor.apply(this, arguments);
    }

    LawyerRecognitionsEdit.prototype.el = $("#lawyer-recognition-edit");

    LawyerRecognitionsEdit.prototype.view = ppu.LawyerRecognitionView;

    LawyerRecognitionsEdit.prototype.modal = ppu.LawyerRecognitionModalCreate;

    _.extend(LawyerRecognitionsEdit.prototype, mixins.lawyerRelationshipViews);

    return LawyerRecognitionsEdit;

  })(Backbone.View);
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

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

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.admin.CategoryCheckbox = (function(_super) {
    __extends(CategoryCheckbox, _super);

    function CategoryCheckbox() {
      return CategoryCheckbox.__super__.constructor.apply(this, arguments);
    }

    CategoryCheckbox.prototype.template = $("#category-checkbox-template");

    CategoryCheckbox.prototype.className = "checkbox";

    CategoryCheckbox.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      this.$el.html(template(this.model.toJSON()));
      return this;
    };

    return CategoryCheckbox;

  })(Backbone.View);
  return ppu.admin.CategoriesCheckbox = (function(_super) {
    __extends(CategoriesCheckbox, _super);

    function CategoriesCheckbox() {
      return CategoriesCheckbox.__super__.constructor.apply(this, arguments);
    }

    CategoriesCheckbox.prototype.el = $("#categories-checkbox");

    CategoriesCheckbox.prototype.initialize = function() {
      return this.listenTo(this.collection, 'reset', this.render);
    };

    CategoriesCheckbox.prototype.renderOne = function(model) {
      var view;
      view = new ppu.admin.CategoryCheckbox({
        model: model
      });
      return $("#categories-checkbox").append(view.render().el);
    };

    CategoriesCheckbox.prototype.render = function() {
      return this.collection.each(function(model) {
        return this.renderOne(model);
      }, this);
    };

    return CategoriesCheckbox;

  })(Backbone.View);
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.admin.LawyerView = (function(_super) {
    __extends(LawyerView, _super);

    function LawyerView() {
      return LawyerView.__super__.constructor.apply(this, arguments);
    }

    LawyerView.prototype.tagName = 'tr';

    LawyerView.prototype.template = $('#lawyer-dashbord-template');

    LawyerView.prototype.events = {
      "click .confirm-translate": "confirmTranslate",
      "click .publish": "publish",
      "click .unpublish": "unpublish"
    };

    LawyerView.prototype.initialize = function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'error', this.showErrors);
      return app.pubsub.bind("lawyer:translate", this.translate, this);
    };

    LawyerView.prototype.render = function() {
      var source, t;
      source = this.template.html();
      t = Handlebars.compile(source);
      $(this.el).html(t(this.model.toJSON()));
      return this;
    };

    LawyerView.prototype.publish = function(e) {
      var id;
      e.preventDefault();
      this.model.save({
        fields: {
          published: true
        }
      });
      id = this.model.get('translations').id;
      return $.ajax({
        url: "/api/lawyers/" + id,
        type: 'PUT',
        data: {
          fields: {
            published: true
          }
        }
      });
    };

    LawyerView.prototype.unpublish = function(e) {
      var id;
      e.preventDefault();
      this.model.save({
        fields: {
          published: false
        }
      });
      id = this.model.get('translations').id;
      return $.ajax({
        url: "/api/lawyers/" + id,
        type: 'PUT',
        data: {
          fields: {
            published: false
          }
        }
      });
    };

    LawyerView.prototype.confirmTranslate = function(e) {
      var v;
      e.preventDefault();
      console.log(v);
      v = new ppu.lawyerConfirmTranslate;
      return v.render();
    };

    LawyerView.prototype.translate = function(e) {
      return this.model.save({
        duplicate: true
      }).done(function(mod) {
        return window.location = "/en/admin/lawyers/" + mod.id + "/edit";
      });
    };

    return LawyerView;

  })(Backbone.View);
  ppu.admin.LawyersView = (function(_super) {
    __extends(LawyersView, _super);

    function LawyersView() {
      return LawyersView.__super__.constructor.apply(this, arguments);
    }

    LawyersView.prototype.el = $('#lawyers-dashboard');

    LawyersView.prototype.initialize = function() {
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'add', this.addOne);
      this.filtersAplied = {
        lang: app.lang
      };
      return app.pubsub.bind("lawyers:filter", this.filterCollection, this);
    };

    LawyersView.prototype.filterCollection = function(data) {
      $(".lawyers-filters").data('offset', 0);
      return this.collection.fetch({
        reset: true,
        data: data
      });
    };

    LawyersView.prototype.addOne = function(model) {
      var view;
      view = new ppu.admin.LawyerView({
        model: model
      });
      return $(this.el).find('tbody').append(view.render().el);
    };

    LawyersView.prototype.render = function() {
      $(this.el).find('tbody').empty();
      return this.collection.each(function(model) {
        return this.addOne(model);
      }, this);
    };

    return LawyersView;

  })(Backbone.View);
  ppu.admin.LawyersFilters = (function(_super) {
    __extends(LawyersFilters, _super);

    function LawyersFilters() {
      return LawyersFilters.__super__.constructor.apply(this, arguments);
    }

    LawyersFilters.prototype.el = $('.lawyers-filters');

    LawyersFilters.prototype.events = {
      'click .see-more': 'seeMore',
      'keyup .query': 'search',
      'change .lawyer-filter-lang': 'filterLang',
      'change .lawyer-filter-country': 'filterCountry',
      'change .lawyer-filter-category': 'filterCategory',
      'change .lawyer-filter-position': 'filterPosition'
    };

    LawyersFilters.prototype.initialize = function() {
      return this.filtersAplied = {
        lang: app.lang
      };
    };

    LawyersFilters.prototype.seeMore = function(e) {
      var data, offset;
      e.preventDefault();
      offset = $(this.el).data('offset') || 20;
      data = _.extend(this.filtersAplied, {
        paginate: offset
      });
      ppu.lawyers.fetch({
        data: data
      });
      return $(this.el).data('offset', offset + 20);
    };

    LawyersFilters.prototype.search = function(e) {
      var data, query;
      e.preventDefault();
      query = $(e.currentTarget).val();
      if (query.length >= 3) {
        data = _.extend(this.filtersAplied, {
          paginate: 0,
          search: query
        });
        return app.pubsub.trigger("lawyers:filter", data);
      }
    };

    LawyersFilters.prototype.filterLang = function(e) {
      var data, val;
      val = $(e.currentTarget).val();
      data = _.extend(this.filtersAplied, {
        paginate: 0,
        lang: val
      });
      console.log(data);
      return app.pubsub.trigger("lawyers:filter", data);
    };

    LawyersFilters.prototype.filterCountry = function(e) {
      var data, val;
      val = $(e.currentTarget).val();
      data = _.extend(this.filtersAplied, {
        paginate: 0,
        country: val
      });
      console.log(_.extend(this.filtersAplied, {
        paginate: 0,
        country: val
      }));
      return app.pubsub.trigger("lawyers:filter", data);
    };

    LawyersFilters.prototype.filterPosition = function(e) {
      var data, val;
      val = $(e.currentTarget).val();
      data = _.extend(this.filtersAplied, {
        paginate: 0,
        position: val
      });
      return app.pubsub.trigger("lawyers:filter", data);
    };

    LawyersFilters.prototype.filterCategory = function(e) {
      var data, val;
      val = $(e.currentTarget).val();
      data = _.extend(this.filtersAplied, {
        paginate: 0,
        category: val
      });
      return app.pubsub.trigger("lawyers:filter", data);
    };

    return LawyersFilters;

  })(Backbone.View);
  ppu.LawyerCreateForm = (function(_super) {
    __extends(LawyerCreateForm, _super);

    function LawyerCreateForm() {
      return LawyerCreateForm.__super__.constructor.apply(this, arguments);
    }

    LawyerCreateForm.prototype.el = $("#lawyer-form-create");

    LawyerCreateForm.prototype.template = $("#lawyer-form-template");

    LawyerCreateForm.prototype.events = {
      "change .change-level": 'toggleDescriptionByLevel',
      "change .change-position": 'toggleDescriptionByPosition',
      "change .change-position": 'toggleDescriptionByPosition'
    };

    LawyerCreateForm.prototype.initialize = function() {
      this.listenTo(this.model, "error", this.renderErrors, this);
      this.listenTo(this.model, "error", this.toErrors, this);
      return this.listenTo(this.model, "sync", this.stored, this);
    };

    LawyerCreateForm.prototype.render = function() {
      var source, template;
      source = this.template.html();
      template = Handlebars.compile(source);
      return $(this.el).find('.panel-body').html(template());
    };

    LawyerCreateForm.prototype.toggleDescriptionByLevel = function(e) {
      var el, val;
      el = $(e.currentTarget);
      val = el.val();
      if (val >= 6) {
        return $('.lawyer-description').removeClass('hidden').hide().slideDown();
      } else {
        return $('.lawyer-description').fadeOut();
      }
    };

    LawyerCreateForm.prototype.toggleDescriptionByPosition = function(e) {
      var el, val;
      el = $(e.currentTarget);
      val = el.val();
      if (val === "Senior Counsel" || val === "Especialista" || val === "Socio") {
        return $('.lawyer-description').removeClass('hidden').hide().slideDown();
      } else {
        return $('.lawyer-description').fadeOut();
      }
    };

    LawyerCreateForm.prototype.store = function(e) {
      var $forms, datas, options;
      if (e) {
        e.preventDefault();
      }
      $forms = $("#lawyer-form-create").find('form');
      datas = new FormData($forms[0]);
      options = ppu.ajaxOptions("POST", datas);
      return this.model.save(datas, $.extend({}, options));
    };

    LawyerCreateForm.prototype.toErrors = function() {
      return window.location = '#lawyer-form-create';
    };

    LawyerCreateForm.prototype.stored = function(model) {
      return window.location = "/admin/lawyers/" + model.id + "/edit";
    };

    return LawyerCreateForm;

  })(Backbone.View);
  ppu.LawyerCreateView = (function(_super) {
    __extends(LawyerCreateView, _super);

    function LawyerCreateView() {
      return LawyerCreateView.__super__.constructor.apply(this, arguments);
    }

    LawyerCreateView.prototype.el = $("#lawyer-create");

    LawyerCreateView.prototype.events = {
      'click .lawyer-store': 'store',
      'change .lawyer-lang': 'changeLang',
      "keydown .form-control": "removeError",
      "change .form-control": "removeError"
    };

    LawyerCreateView.prototype.initialize = function() {
      return ppu.appendDatePickerYear(this.el);
    };

    LawyerCreateView.prototype.store = function(e) {
      e.preventDefault();
      return ppu.lawyerCreateForm.store();
    };

    return LawyerCreateView;

  })(Backbone.View);
  ppu.lawyerEdit = (function(_super) {
    __extends(lawyerEdit, _super);

    function lawyerEdit() {
      return lawyerEdit.__super__.constructor.apply(this, arguments);
    }

    lawyerEdit.prototype.el = $("#lawyer-edit-modal");

    lawyerEdit.prototype.template = $("#lawyer-form-template");

    lawyerEdit.prototype.events = {
      "click .lawyer-edit-update": "update",
      "click .modal-close": "close",
      "keydown .form-control": "removeError"
    };

    lawyerEdit.prototype.initialize = function() {
      this.listenTo(this.model, 'error', this.renderErrors);
      this.listenTo(this.model, 'sync', this.updated);
      return this.getCategories();
    };

    lawyerEdit.prototype.getCategories = function() {
      var categories, el;
      ppu.categories = new ppu.Categories;
      el = $(this.el);
      categories = this.model.get('categories');
      return ppu.categories.fetch({
        data: {
          locale: app.lang
        }
      }).done(function(collection) {
        var source, template;
        source = $('#lawyer-categories-template').html();
        template = Handlebars.compile(source);
        $(el).find('#categories-checkbox').html(template(collection));
        return _.each(categories, function(category) {
          return $(el).find("#categories-checkbox input[value='" + category.id + "']").attr("checked", "checked");
        });
      });
    };

    lawyerEdit.prototype.render = function() {
      var el, level, position, source, t;
      el = $("#lawyer-edit-modal");
      source = this.template.html();
      position = this.model.get('position');
      level = this.model.get('level');
      t = Handlebars.compile(source);
      $(this.el).find('.modal-body').html(t(this.model.toJSON()));
      if (level >= 6) {
        $('.lawyer-description').removeClass('hidden');
      }
      if (position === "Senior Counsel") {
        $('.lawyer-description').removeClass('hidden');
      }
      if (position === "Especialista" || position === "Specialist") {
        $('.lawyer-description').removeClass('hidden');
      }
      if (position === "Socio" || position === "Partner") {
        $('.lawyer-description').removeClass('hidden');
      }
      return $(this.el).modal({
        backdrop: 'static'
      });
    };

    lawyerEdit.prototype.update = function(e) {
      var $forms, data;
      e.preventDefault();
      $forms = $(this.el).find("form");
      data = new FormData($forms[0]);
      return this.model.save(data, $.extend({}, ppu.ajaxOptions("PUT", data)));
    };

    lawyerEdit.prototype.updated = function(model) {
      if (model.id) {
        return this.closeModal();
      }
    };

    lawyerEdit.prototype.close = function(e) {
      e.preventDefault();
      return this.closeModal();
    };

    return lawyerEdit;

  })(Backbone.View);
  ppu.LawyerEditView = (function(_super) {
    __extends(LawyerEditView, _super);

    function LawyerEditView() {
      return LawyerEditView.__super__.constructor.apply(this, arguments);
    }

    LawyerEditView.prototype.el = $('.container-lawyer');

    LawyerEditView.prototype.template = $('#lawyer-template');

    LawyerEditView.prototype.events = {
      'click .open-edit-lawyer': 'openEdit',
      'click .open-share': 'openShare',
      "click .confirm-translate": "confirmTranslate",
      "click .translate": "translate"
    };

    LawyerEditView.prototype.initialize = function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'change', this.renderCategories);
      return app.pubsub.bind("lawyer:translate", this.translate, this);
    };

    LawyerEditView.prototype.render = function() {
      var id, source, t;
      id = this.model.get('id');
      source = this.template.html();
      t = Handlebars.compile(source);
      $(this.el).html(t(this.model.toJSON()));
      $("#lawyer-finish").removeClass("hidden");
      return ppu.currentLawyerId = id;
    };

    LawyerEditView.prototype.renderCategories = function() {
      var source, t;
      source = $("#lawyer-category-template").html();
      t = Handlebars.compile(source);
      return $("#lawyer-category-edit").find('ul').html(t(this.model.toJSON()));
    };

    LawyerEditView.prototype.openEdit = function(e) {
      var view;
      e.preventDefault();
      view = new ppu.lawyerEdit({
        model: this.model
      });
      return view.render();
    };

    LawyerEditView.prototype.confirmTranslate = function(e) {
      var v;
      e.preventDefault();
      v = new ppu.lawyerConfirmTranslate;
      return v.render();
    };

    LawyerEditView.prototype.translate = function(e) {
      return this.model.save({
        duplicate: true
      }).done(function(mod) {
        return window.location = "/en/admin/lawyers/" + mod.id + "/edit";
      });
    };

    LawyerEditView.prototype.openShare = function(e) {
      return $('#share-modal').modal();
    };

    return LawyerEditView;

  })(Backbone.View);
  return ppu.lawyerConfirmTranslate = (function(_super) {
    __extends(lawyerConfirmTranslate, _super);

    function lawyerConfirmTranslate() {
      return lawyerConfirmTranslate.__super__.constructor.apply(this, arguments);
    }

    lawyerConfirmTranslate.prototype.el = $("#confirm-translate-modal");

    lawyerConfirmTranslate.prototype.events = {
      "click .continue": "continue",
      "click .cancel": "closeModal"
    };

    lawyerConfirmTranslate.prototype.render = function() {
      return $(this.el).modal({
        backdrop: "static"
      });
    };

    lawyerConfirmTranslate.prototype["continue"] = function(e) {
      e.preventDefault();
      $(e.currentTarget).addClass("disabled").text("Guardando");
      return app.pubsub.trigger("lawyer:translate");
    };

    return lawyerConfirmTranslate;

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
  ppu.admin.PostView = (function(_super) {
    __extends(PostView, _super);

    function PostView() {
      return PostView.__super__.constructor.apply(this, arguments);
    }

    PostView.prototype.template = $('#post-admin-template');

    PostView.prototype.tagName = 'tr';

    PostView.prototype.events = {
      "click .publish": "publish",
      "click .unpublish": "unpublish",
      "click .change-featured": "changeFeatured",
      "click .publish-on-social-network": "publishFb",
      "click .featured": "featured",
      "click .unhighlight": "unhighlight",
      "click .translate": "translate"
    };

    PostView.prototype.initialize = function() {
      return this.listenTo(this.model, "change", this.render);
    };

    PostView.prototype.render = function() {
      var source, t;
      source = this.template.html();
      t = Handlebars.compile(source);
      $(this.el).html(t(this.model.toJSON()));
      return this;
    };

    PostView.prototype.publish = function(e) {
      e.preventDefault();
      return this.model.save({
        fields: {
          published: true
        }
      });
    };

    PostView.prototype.featured = function(e) {
      var id;
      e.preventDefault();
      id = this.model.id;
      return $.post("/api/posts/" + id + "/featured").done(function() {
        return app.pubsub.trigger('post:unfeatured');
      });
    };

    PostView.prototype.publishFb = function(e) {
      var published, url;
      e.preventDefault();
      url = setSubdomain(this.model.get('lang')) + ("posts/" + (this.model.get('slug')));
      return published = openShare(url);
    };

    PostView.prototype.unpublish = function(e) {
      e.preventDefault();
      return this.model.save({
        fields: {
          published: false
        }
      });
    };

    PostView.prototype.translate = function(e) {
      var id;
      e.preventDefault();
      id = this.model.id;
      return $.post("/api/posts/" + id + "/duplicate").done(function(model) {
        return window.location = "/en/admin/posts/" + model.id + "/edit";
      });
    };

    PostView.prototype.changeFeatured = function(e) {
      var el;
      el = $(e.currentTarget).find('input').val();
      app.pubsub.trigger('post:changeFeatured', el);
      return this.model.save({
        fields: {
          featured: el
        }
      });
    };

    return PostView;

  })(Backbone.View);
  ppu.admin.PostsView = (function(_super) {
    __extends(PostsView, _super);

    function PostsView() {
      return PostsView.__super__.constructor.apply(this, arguments);
    }

    PostsView.prototype.el = $("#posts-dasboard");

    PostsView.prototype.initialize = function() {
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'add', this.addOne, this);
      app.pubsub.on("posts:filter", this.filterCollection, this);
      app.pubsub.on("post:changeFeatured", this.changeFeatured, this);
      return app.pubsub.on('post:unfeatured', this.pull, this);
    };

    PostsView.prototype.filterCollection = function(filters) {
      return this.collection.fetch({
        reset: true,
        lang: app.lang,
        data: filters
      });
    };

    PostsView.prototype.pull = function() {
      return this.collection.fetch({
        reset: true
      });
    };

    PostsView.prototype.changeFeatured = function(val) {
      var coll;
      coll = new ppu.Posts;
      return this.collection.fetch({
        add: false,
        data: {
          is_featured: val
        }
      }).done(function(models) {
        return coll.add(models);
      });
    };

    PostsView.prototype.addOne = function(model) {
      var view;
      view = new ppu.admin.PostView({
        model: model
      });
      return $(this.el).find('thead').append(view.render().el);
    };

    PostsView.prototype.render = function() {
      $(this.el).find('tbody').html('');
      return this.collection.each(function(model) {
        var view;
        view = new ppu.admin.PostView({
          model: model
        });
        return $(this.el).find('tbody').append(view.render().el);
      }, this);
    };

    return PostsView;

  })(Backbone.View);
  ppu.admin.PostsFilters = (function(_super) {
    __extends(PostsFilters, _super);

    function PostsFilters() {
      return PostsFilters.__super__.constructor.apply(this, arguments);
    }

    PostsFilters.prototype.el = $('.post-filter');

    PostsFilters.prototype.events = {
      'click .see-more': 'seeMore',
      'change .country': 'byCountry',
      'change .category': 'byCategory',
      'keydown .query': 'byKeyword',
      'change .by-lang': 'byLang'
    };

    PostsFilters.prototype.initialize = function() {
      return this.filtersAplied = {
        lang: "es",
        the_actual_ch: 0,
        the_actual_co: 0
      };
    };

    PostsFilters.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      return this.$el.html(template);
    };

    PostsFilters.prototype.filterBy = function(data) {
      data = _.extend(this.filtersAplied, data);
      return app.pubsub.trigger("posts:filter", data);
    };

    PostsFilters.prototype.seeMore = function(e) {
      var data, offset;
      e.preventDefault();
      offset = $(this.el).data('offset') || 20;
      data = _.extend(this.filtersAplied, {
        paginate: offset
      });
      ppu.posts.fetch({
        data: data
      });
      return $(this.el).data('offset', offset + 20);
    };

    PostsFilters.prototype.byCountry = function(e) {
      var data, el, val;
      el = $(e.currentTarget);
      val = el.val();
      data = _.extend(this.filtersAplied, {
        country: val
      });
      return app.pubsub.trigger("posts:filter", data);
    };

    PostsFilters.prototype.byCategory = function(e) {
      var data, val;
      val = $(e.currentTarget).find('select').val();
      data = _.extend(this.filtersAplied, {
        category: val
      });
      return app.pubsub.trigger("posts:filter", data);
    };

    PostsFilters.prototype.byKeyword = function(e) {
      var val;
      val = $(e.currentTarget).val();
      if (val.length >= 1) {
        return this.filterBy({
          keyword: val
        });
      }
    };

    PostsFilters.prototype.byLang = function(e) {
      var val;
      val = $(e.currentTarget).val();
      return this.filterBy({
        lang: val
      });
    };

    return PostsFilters;

  })(Backbone.View);
  ppu.admin.PostCreate = (function(_super) {
    __extends(PostCreate, _super);

    function PostCreate() {
      return PostCreate.__super__.constructor.apply(this, arguments);
    }

    PostCreate.prototype.el = $("#post-create");

    PostCreate.prototype.template = $("#post-create-template");

    PostCreate.prototype.events = {
      "click button.store": "store",
      "click .open-gallery": "openGallery",
      "keydown input[name='query']": "searchLawyer",
      "change .form-control": "removeError",
      "keydown .form-control": "removeError"
    };

    PostCreate.prototype.initialize = function() {
      this.listenTo(this.model, 'error', this.renderPostErrors, this);
      this.listenTo(this.model, 'sync', this.stored);
      app.pubsub.bind('gallery:selected', this.appendSelectedGallery, this);
      return app.pubsub.on('post:socialPublished', this.redirectTo, this);
    };

    PostCreate.prototype.render = function() {
      var source, template;
      source = this.template.html();
      template = Handlebars.compile(source);
      this.$el.find('.panel-body').html(template());
      ppu.appendDatePicker(this.el);
      return ppu.appendSummernote(this.el);
    };

    PostCreate.prototype.store = function(e) {
      var $form, content, data, options;
      e.preventDefault();
      $form = this.$el.find('form');
      content = $(this.el).find('.summernote').code();
      data = new FormData($form[0]);
      data.append("fields[content]", content);
      data.append("fields[lang]", app.lang);
      options = ppu.ajaxOptions("POST", data);
      return this.model.save(data, $.extend({}, options));
    };

    PostCreate.prototype.stored = function(model) {
      return window.location = "/posts/" + (this.model.get('slug'));
    };

    PostCreate.prototype.getCategories = function() {
      ppu.categories = new ppu.Categories;
      return ppu.categories.fetch({
        data: {
          lang: app.lang
        }
      }).done(function(collection) {
        var source, template;
        source = $('#lawyer-categories-template').html();
        template = Handlebars.compile(source);
        return $('#categories-checkboxes').html(template(collection));
      });
    };

    PostCreate.prototype.openGallery = function(e) {
      e.preventDefault();
      ppu.admin.galleryPostModal = new ppu.admin.GalleryPostModal({
        collection: ppu.admin.galleries
      });
      return ppu.admin.galleryPostModal.render();
    };

    PostCreate.prototype.appendSelectedGallery = function(gallery_id) {
      $(this.el).find('.gallery_id').val(gallery_id);
      return ppu.admin.galleryPostModal.closeModal();
    };

    PostCreate.prototype.searchLawyer = function(e) {
      var collection, query;
      query = $(e.currentTarget).val();
      if (query.length > 3) {
        collection = new ppu.Lawyers;
        ppu.admin.postLawyersSelect = new ppu.admin.PostLawyersSelect({
          collection: collection
        });
        return ppu.admin.postLawyersSelect.search(query);
      }
    };

    return PostCreate;

  })(Backbone.View);
  ppu.admin.PostEdit = (function(_super) {
    __extends(PostEdit, _super);

    function PostEdit() {
      return PostEdit.__super__.constructor.apply(this, arguments);
    }

    PostEdit.prototype.el = $("#post-edit");

    PostEdit.prototype.template = $("#post-create-template");

    PostEdit.prototype.events = {
      "click button.update": "update",
      "click .open-gallery": "openGallery",
      "keydown input[name='query']": "searchLawyer",
      "change .form-control": "removeError",
      "keydown .form-control": "removeError"
    };

    PostEdit.prototype.initialize = function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'error', this.renderPostErrors, this);
      app.pubsub.bind('gallery:selected', this.appendSelectedGallery, this);
      return app.pubsub.on('post:socialPublished', this.redirectTo, this);
    };

    PostEdit.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      this.$el.find('.panel-body').html(template(this.model.toJSON()));
      ppu.appendDatePicker(this.el);
      ppu.appendSummernote(this.el);
      this.getCategories();
      return this.showLawyers();
    };

    PostEdit.prototype.update = function(e) {
      var $form, content, data, options, that;
      e.preventDefault();
      that = this;
      $form = this.$el.find('form');
      content = $(this.el).find('.summernote').code();
      data = new FormData($form[0]);
      data.append("fields[content]", content);
      options = ppu.ajaxOptions("PUT", data);
      return this.model.save(data, $.extend({}, options)).done(function(model) {
        return that.updated(model, that);
      });
    };

    PostEdit.prototype.updated = function(model, that) {
      return window.location = "/admin/posts/" + model.id + "/edit";
    };

    PostEdit.prototype.redirectTo = function() {
      return window.location = '/admin/posts';
    };

    PostEdit.prototype.getCategories = function() {
      var el, modelCategories;
      ppu.categories = new ppu.Categories;
      el = this.$el;
      modelCategories = this.model.get('categories');
      return ppu.categories.fetch({
        data: {
          locale: app.lang
        }
      }).done(function(collection) {
        var source, template;
        source = $('#lawyer-categories-template').html();
        template = Handlebars.compile(source);
        $('#categories-checkbox').html(template(collection));
        return _.each(modelCategories, function(category) {
          return $(el).find("#categories-checkbox input[value='" + category.id + "']").attr("checked", "checked");
        });
      });
    };

    PostEdit.prototype.showLawyers = function() {
      var lawyers;
      lawyers = this.model.get('lawyers');
      return _.each(lawyers, function(lawyer) {
        var view;
        view = new ppu.admin.PostLawyersSelected;
        return view.renderObject(lawyer);
      });
    };

    PostEdit.prototype.openGallery = function(e) {
      e.preventDefault();
      ppu.admin.galleryPostModal = new ppu.admin.GalleryPostModal({
        collection: ppu.admin.galleries
      });
      return ppu.admin.galleryPostModal.render();
    };

    PostEdit.prototype.appendSelectedGallery = function(gallery_id) {
      $(this.el).find('.gallery_id').val(gallery_id);
      return ppu.admin.galleryPostModal.closeModal();
    };

    PostEdit.prototype.searchLawyer = function(e) {
      var collection, query;
      query = $(e.currentTarget).val();
      if (query.length > 3) {
        collection = new ppu.Lawyers;
        ppu.admin.postLawyersSelect = new ppu.admin.PostLawyersSelect({
          collection: collection
        });
        return ppu.admin.postLawyersSelect.search(query);
      }
    };

    return PostEdit;

  })(Backbone.View);
  ppu.admin.PostSelectLawyers = (function(_super) {
    __extends(PostSelectLawyers, _super);

    function PostSelectLawyers() {
      return PostSelectLawyers.__super__.constructor.apply(this, arguments);
    }

    PostSelectLawyers.prototype.el = $("#");

    PostSelectLawyers.prototype.template = "#lawyer-select";

    PostSelectLawyers.prototype.events = {
      "submit .search": "search"
    };

    PostSelectLawyers.prototype.render = function() {
      this.$el.find('.modal-body').html(app.compileTemplate(this.template));
      this.$el.modal();
      return this;
    };

    PostSelectLawyers.prototype.search = function(e) {
      var query;
      query = $(e.currentTarget).val();
      return this.collection.fetch({
        data: {
          query: query
        }
      });
    };

    return PostSelectLawyers;

  })(Backbone.View);
  ppu.admin.PostLawyerSelect = (function(_super) {
    __extends(PostLawyerSelect, _super);

    function PostLawyerSelect() {
      return PostLawyerSelect.__super__.constructor.apply(this, arguments);
    }

    PostLawyerSelect.prototype.tagName = 'tr';

    PostLawyerSelect.prototype.template = $('#lawyer-select-template');

    PostLawyerSelect.prototype.events = {
      "click .append": "append"
    };

    PostLawyerSelect.prototype.render = function() {
      var source, template;
      source = this.template.html();
      template = Handlebars.compile(source);
      this.$el.html(template(this.model.toJSON()));
      return this;
    };

    PostLawyerSelect.prototype.append = function(e) {
      e.preventDefault();
      ppu.admin.postLawyersSelected = new ppu.admin.PostLawyersSelected({
        model: this.model
      });
      return ppu.admin.postLawyersSelected.render();
    };

    return PostLawyerSelect;

  })(Backbone.View);
  ppu.admin.PostLawyersSelect = (function(_super) {
    __extends(PostLawyersSelect, _super);

    function PostLawyersSelect() {
      return PostLawyersSelect.__super__.constructor.apply(this, arguments);
    }

    PostLawyersSelect.prototype.el = $("#lawyers-result");

    PostLawyersSelect.prototype.events = {
      "": ""
    };

    PostLawyersSelect.prototype.initialize = function() {
      return this.listenTo(this.collection, 'reset', this.render);
    };

    PostLawyersSelect.prototype.render = function() {
      $("#lawyers-result").html('');
      return this.collection.each(function(model) {
        var view;
        view = new ppu.admin.PostLawyerSelect({
          model: model
        });
        return $("#lawyers-result").prepend(view.render().el);
      }, this);
    };

    PostLawyersSelect.prototype.search = function(query) {
      return this.collection.fetch({
        reset: true,
        data: {
          search: query
        }
      });
    };

    return PostLawyersSelect;

  })(Backbone.View);
  return ppu.admin.PostLawyersSelected = (function(_super) {
    __extends(PostLawyersSelected, _super);

    function PostLawyersSelected() {
      return PostLawyersSelected.__super__.constructor.apply(this, arguments);
    }

    PostLawyersSelected.prototype.template = $('#lawyer-selected-template');

    PostLawyersSelected.prototype.tagName = 'tr';

    PostLawyersSelected.prototype.events = {
      "click .remove": "destroy"
    };

    PostLawyersSelected.prototype.render = function() {
      var source, template;
      source = this.template.html();
      template = Handlebars.compile(source);
      return $('#lawyers-selected tbody').append(this.$el.html(template(this.model.toJSON())));
    };

    PostLawyersSelected.prototype.renderObject = function(model) {
      var source, template;
      source = this.template.html();
      template = Handlebars.compile(source);
      return $('#lawyers-selected tbody').append(this.$el.html(template(model)));
    };

    PostLawyersSelected.prototype.destroy = function(e) {
      e.preventDefault();
      return this.$el.remove();
    };

    return PostLawyersSelected;

  })(Backbone.View);
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.admin.TheActualView = (function(_super) {
    __extends(TheActualView, _super);

    function TheActualView() {
      return TheActualView.__super__.constructor.apply(this, arguments);
    }

    TheActualView.prototype.template = $('#the-actual-admin-template');

    TheActualView.prototype.tagName = 'tr';

    TheActualView.prototype.events = {
      "click .publish": "publish",
      "click .unpublish": "unpublish",
      "click .change-featured": "changeFeatured",
      "click .publish-on-social-network": "publishFb",
      "click .translate": "translate"
    };

    TheActualView.prototype.initialize = function() {
      return this.listenTo(this.model, "change", this.render);
    };

    TheActualView.prototype.render = function() {
      var source, t;
      source = this.template.html();
      t = Handlebars.compile(source);
      $(this.el).html(t(this.model.toJSON()));
      return this;
    };

    TheActualView.prototype.publish = function(e) {
      e.preventDefault();
      return this.model.save({
        fields: {
          published: true
        }
      });
    };

    TheActualView.prototype.publishFb = function(e) {
      var published, url;
      e.preventDefault();
      url = setSubdomain(this.model.get('lang')) + ("posts/" + (this.model.get('slug')));
      return published = openShare(url);
    };

    TheActualView.prototype.unpublish = function(e) {
      e.preventDefault();
      return this.model.save({
        fields: {
          published: false
        }
      });
    };

    TheActualView.prototype.translate = function(e) {
      var id;
      e.preventDefault();
      id = this.model.id;
      return $.post("/api/posts/" + id + "/duplicate").done(function(model) {
        return window.location = "/en/admin/the-actual/" + model.id + "/edit";
      });
    };

    TheActualView.prototype.changeFeatured = function(e) {
      var el;
      el = $(e.currentTarget).find('input').val();
      app.pubsub.trigger('post:changeFeatured', el);
      return this.model.save({
        fields: {
          featured: el
        }
      });
    };

    return TheActualView;

  })(Backbone.View);
  return ppu.admin.TheActualViews = (function(_super) {
    __extends(TheActualViews, _super);

    function TheActualViews() {
      return TheActualViews.__super__.constructor.apply(this, arguments);
    }

    TheActualViews.prototype.el = $("#posts-dasboard");

    TheActualViews.prototype.initialize = function() {
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'add', this.addOne, this);
      app.pubsub.on("posts:filter", this.filterCollection, this);
      app.pubsub.on("post:changeFeatured", this.changeFeatured, this);
      return app.pubsub.on('post:unfeatured', this.unfeatured, this);
    };

    TheActualViews.prototype.filterCollection = function(filters) {
      return this.collection.fetch({
        reset: true,
        lang: app.lang,
        data: filters
      });
    };

    TheActualViews.prototype.unfeatured = function() {
      return this.collection.fetch({
        reset: true
      });
    };

    TheActualViews.prototype.changeFeatured = function(val) {
      var coll;
      coll = new ppu.Posts;
      return this.collection.fetch({
        add: false,
        data: {
          is_featured: val
        }
      }).done(function(models) {
        return coll.add(models);
      });
    };

    TheActualViews.prototype.addOne = function(model) {
      var view;
      view = new ppu.admin.TheActualView({
        model: model
      });
      return $(this.el).find('thead').append(view.render().el);
    };

    TheActualViews.prototype.render = function() {
      $(this.el).find('tbody').html('');
      return this.collection.each(function(model) {
        var view;
        view = new ppu.admin.TheActualView({
          model: model
        });
        return $(this.el).find('tbody').append(view.render().el);
      }, this);
    };

    return TheActualViews;

  })(Backbone.View);
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  return ppu.admin.TheActualCreate = (function(_super) {
    __extends(TheActualCreate, _super);

    function TheActualCreate() {
      return TheActualCreate.__super__.constructor.apply(this, arguments);
    }

    TheActualCreate.prototype.el = $("#post-create");

    TheActualCreate.prototype.template = $("#the-actual-create-template");

    TheActualCreate.prototype.events = {
      "click button.store": "store",
      "click .open-gallery": "openGallery",
      "keydown input[name='query']": "searchLawyer",
      "change .form-control": "removeError",
      "keydown .form-control": "removeError"
    };

    TheActualCreate.prototype.initialize = function() {
      this.listenTo(this.model, 'error', this.renderPostErrors, this);
      this.listenTo(this.model, 'sync', this.stored);
      app.pubsub.bind('gallery:selected', this.appendSelectedGallery, this);
      return app.pubsub.on('post:socialPublished', this.redirectTo, this);
    };

    TheActualCreate.prototype.render = function() {
      var source, template;
      source = this.template.html();
      template = Handlebars.compile(source);
      this.$el.find('.panel-body').html(template());
      ppu.appendDatePicker(this.el);
      return ppu.appendSummernote(this.el);
    };

    TheActualCreate.prototype.store = function(e) {
      var $form, content, data, options;
      e.preventDefault();
      $form = this.$el.find('form');
      content = $(this.el).find('.summernote').code();
      data = new FormData($form[0]);
      data.append("fields[content]", content);
      data.append("fields[lang]", app.lang);
      data.append("fields[country]", "Chile");
      data.append('fields[the_actual]', 1);
      options = ppu.ajaxOptions("POST", data);
      return this.model.save(data, $.extend({}, options));
    };

    TheActualCreate.prototype.stored = function(model) {
      return window.location = "/el-actual/" + (this.model.get('slug'));
    };

    TheActualCreate.prototype.publishFb = function(model) {
      var published, url;
      url = setSubdomain(model.get('lang')) + ("posts/" + (model.get('slug')));
      return published = fb_check_and_publish(model.get('title'), url);
    };

    TheActualCreate.prototype.redirectTo = function() {
      return window.location = '/admin/posts';
    };

    TheActualCreate.prototype.getCategories = function() {
      ppu.categories = new ppu.Categories;
      return ppu.categories.fetch({
        data: {
          lang: app.lang
        }
      }).done(function(collection) {
        var source, template;
        source = $('#lawyer-categories-template').html();
        template = Handlebars.compile(source);
        return $('#categories-checkboxes').html(template(collection));
      });
    };

    TheActualCreate.prototype.openGallery = function(e) {
      e.preventDefault();
      ppu.admin.galleryPostModal = new ppu.admin.GalleryPostModal({
        collection: ppu.admin.galleries
      });
      return ppu.admin.galleryPostModal.render();
    };

    TheActualCreate.prototype.appendSelectedGallery = function(gallery_id) {
      $(this.el).find('.gallery_id').val(gallery_id);
      return ppu.admin.galleryPostModal.closeModal();
    };

    TheActualCreate.prototype.searchLawyer = function(e) {
      var collection, query;
      query = $(e.currentTarget).val();
      if (query.length > 3) {
        collection = new ppu.Lawyers;
        ppu.admin.postLawyersSelect = new ppu.admin.PostLawyersSelect({
          collection: collection
        });
        return ppu.admin.postLawyersSelect.search(query);
      }
    };

    return TheActualCreate;

  })(Backbone.View);
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.admin.Gallery = (function(_super) {
    __extends(Gallery, _super);

    function Gallery() {
      return Gallery.__super__.constructor.apply(this, arguments);
    }

    Gallery.prototype.urlRoot = "/api/galleries";

    return Gallery;

  })(Backbone.Model);
  ppu.admin.Galleries = (function(_super) {
    __extends(Galleries, _super);

    function Galleries() {
      return Galleries.__super__.constructor.apply(this, arguments);
    }

    Galleries.prototype.url = "/api/galleries";

    Galleries.prototype.model = ppu.admin.Gallery;

    return Galleries;

  })(Backbone.Collection);
  ppu.admin.GalleryView = (function(_super) {
    __extends(GalleryView, _super);

    function GalleryView() {
      return GalleryView.__super__.constructor.apply(this, arguments);
    }

    GalleryView.prototype.template = $("#gallery-post-template");

    GalleryView.prototype.className = "col-xs-6 col-md-3";

    GalleryView.prototype.events = {
      "click .select": "selectImage"
    };

    GalleryView.prototype.render = function() {
      var source, template;
      source = $(this.template).html();
      template = Handlebars.compile(source);
      this.$el.html(template(this.model.toJSON()));
      return this;
    };

    GalleryView.prototype.selectImage = function(e) {
      var galleryId;
      e.preventDefault();
      galleryId = this.model.get('id');
      return app.pubsub.trigger('gallery:selected', galleryId);
    };

    return GalleryView;

  })(Backbone.View);
  ppu.admin.GalleryPostModal = (function(_super) {
    __extends(GalleryPostModal, _super);

    function GalleryPostModal() {
      return GalleryPostModal.__super__.constructor.apply(this, arguments);
    }

    GalleryPostModal.prototype.el = $("#gallery-post-modal");

    GalleryPostModal.prototype.events = {
      "click .modal-close": "close"
    };

    GalleryPostModal.prototype.renderOne = function(model) {
      var view;
      view = new ppu.admin.GalleryView({
        model: model
      });
      return this.$el.find('.modal-body .row').append(view.render().el);
    };

    GalleryPostModal.prototype.render = function() {
      this.$el.find('.modal-body .row').html('');
      this.collection.each(function(model) {
        return this.renderOne(model);
      }, this);
      return this.$el.modal();
    };

    GalleryPostModal.prototype.close = function(e) {
      e.preventDefault();
      return this.closeModal();
    };

    return GalleryPostModal;

  })(Backbone.View);
  return ppu.admin.GalleryExperienceModal = (function(_super) {
    __extends(GalleryExperienceModal, _super);

    function GalleryExperienceModal() {
      return GalleryExperienceModal.__super__.constructor.apply(this, arguments);
    }

    GalleryExperienceModal.prototype.el = $("#gallery-post-modal");

    GalleryExperienceModal.prototype.events = {
      "click .modal-close": "close"
    };

    GalleryExperienceModal.prototype.renderOne = function(model) {
      var view;
      view = new ppu.admin.GalleryView({
        model: model
      });
      return this.$el.find('.modal-body .row').append(view.render().el);
    };

    GalleryExperienceModal.prototype.render = function() {
      this.$el.find('.modal-body .row').html('');
      this.collection.each(function(model) {
        return this.renderOne(model);
      }, this);
      return this.$el.modal();
    };

    GalleryExperienceModal.prototype.close = function(e) {
      e.preventDefault();
      return this.closeModal();
    };

    return GalleryExperienceModal;

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

    Experience.prototype.urlRoot = '/api/experiences';

    return Experience;

  })(Backbone.Model);
  ppu.Experiences = (function(_super) {
    __extends(Experiences, _super);

    function Experiences() {
      return Experiences.__super__.constructor.apply(this, arguments);
    }

    Experiences.prototype.url = '/api/experiences';

    Experiences.prototype.model = ppu.Experience;

    return Experiences;

  })(Backbone.Collection);
  ppu.admin.ExperienceView = (function(_super) {
    __extends(ExperienceView, _super);

    function ExperienceView() {
      return ExperienceView.__super__.constructor.apply(this, arguments);
    }

    ExperienceView.prototype.template = $('#experience-admin-template');

    ExperienceView.prototype.tagName = 'tr';

    ExperienceView.prototype.events = {
      "click .publish": "publish",
      "click .unpublish": "unpublish",
      "click .translate": "translate"
    };

    ExperienceView.prototype.initialize = function() {
      return this.listenTo(this.model, "change", this.render);
    };

    ExperienceView.prototype.render = function() {
      var source, t;
      source = this.template.html();
      t = Handlebars.compile(source);
      $(this.el).html(t(this.model.toJSON()));
      return this;
    };

    ExperienceView.prototype.publish = function(e) {
      e.preventDefault();
      return this.model.save({
        published: true
      });
    };

    ExperienceView.prototype.unpublish = function(e) {
      e.preventDefault();
      return this.model.save({
        published: false
      });
    };

    ExperienceView.prototype.translate = function(e) {
      e.preventDefault();
      return this.model.save({
        duplicate: true
      }).done(function(model) {
        return window.location = "en/admin/experiences/" + model.id + "/edit";
      });
    };

    return ExperienceView;

  })(Backbone.View);
  ppu.admin.ExperiencesView = (function(_super) {
    __extends(ExperiencesView, _super);

    function ExperiencesView() {
      return ExperiencesView.__super__.constructor.apply(this, arguments);
    }

    ExperiencesView.prototype.el = $("#experiences-dasboard");

    ExperiencesView.prototype.initialize = function() {
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'add', this.addOne, this);
      return app.pubsub.on("experiences:filter", this.filterCollection, this);
    };

    ExperiencesView.prototype.filterCollection = function(filters) {
      return this.collection.fetch({
        reset: true,
        data: filters
      });
    };

    ExperiencesView.prototype.addOne = function(model) {
      var view;
      view = new ppu.admin.ExperienceView({
        model: model
      });
      return $(this.el).find('tbody').append(view.render().el);
    };

    ExperiencesView.prototype.render = function() {
      $(this.el).find('tbody').html('');
      return this.collection.each(function(model) {
        var view;
        view = new ppu.admin.ExperienceView({
          model: model
        });
        return $(this.el).find('tbody').append(view.render().el);
      }, this);
    };

    return ExperiencesView;

  })(Backbone.View);
  ppu.admin.ExperiencesFilters = (function(_super) {
    __extends(ExperiencesFilters, _super);

    function ExperiencesFilters() {
      return ExperiencesFilters.__super__.constructor.apply(this, arguments);
    }

    ExperiencesFilters.prototype.el = $('.experience-filter');

    ExperiencesFilters.prototype.events = {
      'change .position': 'byPosition',
      'change .country': 'byCountry',
      'change .category': 'byCategory',
      'keydown .query': 'byQuery',
      'click .see-more': 'seeMore'
    };

    ExperiencesFilters.prototype.initialize = function() {
      return this.filtersAplied = {
        lang: "es"
      };
    };

    ExperiencesFilters.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      return this.$el.html(template);
    };

    ExperiencesFilters.prototype.filterBy = function(data) {
      data = _.extend(this.filtersAplied, data);
      return app.pubsub.trigger("experiences:filter", data);
    };

    ExperiencesFilters.prototype.seeMore = function(e) {
      var data, offset;
      e.preventDefault();
      offset = $(this.el).data('offset') || 20;
      data = _.extend(this.filtersAplied, {
        paginate: offset
      });
      ppu.experiences.fetch({
        data: data
      });
      return $(this.el).data('offset', offset + 20);
    };

    ExperiencesFilters.prototype.byPosition = function(e) {
      var val;
      val = $(e.currentTarget).find('select').val();
      return this.filterBy({
        position: val
      });
    };

    ExperiencesFilters.prototype.byCountry = function(e) {
      var val;
      val = $(e.currentTarget).val();
      return this.filterBy({
        country: val
      });
    };

    ExperiencesFilters.prototype.byCategory = function(e) {
      var val;
      val = $(e.currentTarget).find('select').val();
      return this.filterBy({
        category: val
      });
    };

    ExperiencesFilters.prototype.byQuery = function(e) {
      var val;
      val = $(e.currentTarget).val();
      if (val.length >= 3) {
        return this.filterBy({
          keyword: val
        });
      }
    };

    return ExperiencesFilters;

  })(Backbone.View);
  ppu.admin.ExperienceCreate = (function(_super) {
    __extends(ExperienceCreate, _super);

    function ExperienceCreate() {
      return ExperienceCreate.__super__.constructor.apply(this, arguments);
    }

    ExperienceCreate.prototype.el = $("#experience-create");

    ExperienceCreate.prototype.template = $("#experience-create-template");

    ExperienceCreate.prototype.events = {
      "click button.store": "store",
      "click .open-gallery": "openGallery",
      "keydown input[name='query']": "searchLawyer",
      "change .form-control": "removeError",
      "keydown .form-control": "removeError"
    };

    ExperienceCreate.prototype.initialize = function() {
      this.listenTo(this.model, 'error', this.renderExperienceErrors, this);
      this.listenTo(this.model, 'sync', this.stored);
      return app.pubsub.bind('gallery:selected', this.appendSelectedGallery, this);
    };

    ExperienceCreate.prototype.render = function() {
      var source, template;
      source = this.template.html();
      template = Handlebars.compile(source);
      this.$el.find('.panel-body').html(template());
      ppu.appendDatePicker(this.el);
      return ppu.appendSummernoteExperience(this.el);
    };

    ExperienceCreate.prototype.store = function() {
      var $form, content, data, options;
      $form = this.$el.find('form');
      content = $(this.el).find('.summernote').code();
      data = new FormData($form[0]);
      data.append("fields[content]", content);
      data.append("fields[lang]", app.lang);
      options = ppu.ajaxOptions("Post", data);
      return this.model.save(data, $.extend({}, options));
    };

    ExperienceCreate.prototype.stored = function(model) {
      if (model) {
        return window.location = "/dashboard";
      }
    };

    ExperienceCreate.prototype.openGallery = function(e) {
      e.preventDefault();
      ppu.admin.galleryExperienceModal = new ppu.admin.GalleryExperienceModal({
        collection: ppu.admin.galleries
      });
      return ppu.admin.galleryExperienceModal.render();
    };

    ExperienceCreate.prototype.appendSelectedGallery = function(gallery_id) {
      $(this.el).find('.gallery_id').val(gallery_id);
      return ppu.admin.galleryExperienceModal.closeModal();
    };

    ExperienceCreate.prototype.searchLawyer = function(e) {
      var collection, query;
      query = $(e.currentTarget).val();
      if (query.length > 3) {
        collection = new ppu.Lawyers;
        ppu.admin.experienceLawyersSelect = new ppu.admin.ExperienceLawyersSelect({
          collection: collection
        });
        return ppu.admin.experienceLawyersSelect.search(query);
      }
    };

    return ExperienceCreate;

  })(Backbone.View);
  ppu.admin.ExperienceEdit = (function(_super) {
    __extends(ExperienceEdit, _super);

    function ExperienceEdit() {
      return ExperienceEdit.__super__.constructor.apply(this, arguments);
    }

    ExperienceEdit.prototype.el = $("#experience-edit");

    ExperienceEdit.prototype.template = $("#experience-create-template");

    ExperienceEdit.prototype.events = {
      "click button.update": "update",
      "click .open-gallery": "openGallery",
      "keydown input[name='query']": "searchLawyer",
      "change .form-control": "removeError",
      "keydown .form-control": "removeError"
    };

    ExperienceEdit.prototype.initialize = function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'error', this.renderExperienceErrors, this);
      this.listenTo(this.model, 'sync', this.updated, this);
      return app.pubsub.bind('gallery:selected', this.appendSelectedGallery, this);
    };

    ExperienceEdit.prototype.render = function() {
      var source, template;
      source = this.template.html();
      template = Handlebars.compile(source);
      this.$el.find('.panel-body').html(template(this.model.toJSON()));
      ppu.appendDatePicker(this.el);
      ppu.appendSummernote(this.el);
      this.getCategories();
      return this.showLawyers();
    };

    ExperienceEdit.prototype.update = function(e) {
      var $form, content, data, options;
      e.preventDefault();
      $form = this.$el.find('form');
      content = $(this.el).find('.summernote').code();
      data = new FormData($form[0]);
      data.append("fields[content]", content);
      options = ppu.ajaxOptions("PUT", data);
      return this.model.save(data, $.extend({}, options)).done(function(model) {
        if (model) {
          return window.location = "/dashboard";
        }
      });
    };

    ExperienceEdit.prototype.getCategories = function() {
      var categories, el;
      ppu.categories = new ppu.Categories;
      el = this.$el;
      categories = this.model.get('categories');
      return ppu.categories.fetch({
        data: {
          locale: app.lang
        }
      }).done(function(collection) {
        var source, template;
        source = $('#lawyer-categories-template').html();
        template = Handlebars.compile(source);
        $('#categories-checkbox').html(template(collection));
        return _.each(categories, function(category) {
          return $(el).find("#categories-checkbox input[value='" + category.id + "']").attr("checked", "checked");
        });
      });
    };

    ExperienceEdit.prototype.showLawyers = function() {
      var lawyers;
      lawyers = this.model.get('lawyers');
      return _.each(lawyers, function(lawyer) {
        var view;
        view = new ppu.admin.ExperienceLawyersSelected;
        return view.renderObject(lawyer);
      });
    };

    ExperienceEdit.prototype.openGallery = function(e) {
      e.preventDefault();
      ppu.admin.galleryExperienceModal = new ppu.admin.GalleryExperienceModal({
        collection: ppu.admin.galleries
      });
      return ppu.admin.galleryExperienceModal.render();
    };

    ExperienceEdit.prototype.appendSelectedGallery = function(gallery_id) {
      $(this.el).find('.gallery_id').val(gallery_id);
      return ppu.admin.galleryExperienceModal.closeModal();
    };

    ExperienceEdit.prototype.searchLawyer = function(e) {
      var collection, query;
      query = $(e.currentTarget).val();
      if (query.length > 3) {
        collection = new ppu.Lawyers;
        ppu.admin.ExperienceLawyersSelect = new ppu.admin.ExperienceLawyersSelect({
          collection: collection
        });
        return ppu.admin.ExperienceLawyersSelect.search(query);
      }
    };

    return ExperienceEdit;

  })(Backbone.View);
  ppu.admin.ExperienceSelectLawyers = (function(_super) {
    __extends(ExperienceSelectLawyers, _super);

    function ExperienceSelectLawyers() {
      return ExperienceSelectLawyers.__super__.constructor.apply(this, arguments);
    }

    ExperienceSelectLawyers.prototype.el = $("#");

    ExperienceSelectLawyers.prototype.template = "#lawyer-select";

    ExperienceSelectLawyers.prototype.events = {
      "submit .search": "search"
    };

    ExperienceSelectLawyers.prototype.render = function() {
      this.$el.find('.modal-body').html(app.compileTemplate(this.template));
      this.$el.modal();
      return this;
    };

    ExperienceSelectLawyers.prototype.search = function(e) {
      var query;
      query = $(e.currentTarget).val();
      return this.collection.fetch({
        data: {
          query: query
        }
      });
    };

    return ExperienceSelectLawyers;

  })(Backbone.View);
  ppu.admin.ExperienceLawyerSelect = (function(_super) {
    __extends(ExperienceLawyerSelect, _super);

    function ExperienceLawyerSelect() {
      return ExperienceLawyerSelect.__super__.constructor.apply(this, arguments);
    }

    ExperienceLawyerSelect.prototype.tagName = 'tr';

    ExperienceLawyerSelect.prototype.template = $('#lawyer-select-template');

    ExperienceLawyerSelect.prototype.events = {
      "click .append": "append"
    };

    ExperienceLawyerSelect.prototype.render = function() {
      var source, template;
      source = this.template.html();
      template = Handlebars.compile(source);
      this.$el.html(template(this.model.toJSON()));
      return this;
    };

    ExperienceLawyerSelect.prototype.append = function(e) {
      e.preventDefault();
      ppu.admin.experienceLawyersSelected = new ppu.admin.ExperienceLawyersSelected({
        model: this.model
      });
      return ppu.admin.experienceLawyersSelected.render();
    };

    return ExperienceLawyerSelect;

  })(Backbone.View);
  ppu.admin.ExperienceLawyersSelect = (function(_super) {
    __extends(ExperienceLawyersSelect, _super);

    function ExperienceLawyersSelect() {
      return ExperienceLawyersSelect.__super__.constructor.apply(this, arguments);
    }

    ExperienceLawyersSelect.prototype.el = $("#lawyers-result");

    ExperienceLawyersSelect.prototype.events = {
      "": ""
    };

    ExperienceLawyersSelect.prototype.initialize = function() {
      return this.listenTo(this.collection, 'reset', this.render);
    };

    ExperienceLawyersSelect.prototype.render = function() {
      $("#lawyers-result").html('');
      return this.collection.each(function(model) {
        var view;
        view = new ppu.admin.ExperienceLawyerSelect({
          model: model
        });
        return $("#lawyers-result").prepend(view.render().el);
      }, this);
    };

    ExperienceLawyersSelect.prototype.search = function(query) {
      return this.collection.fetch({
        reset: true,
        data: {
          search: query
        }
      });
    };

    return ExperienceLawyersSelect;

  })(Backbone.View);
  return ppu.admin.ExperienceLawyersSelected = (function(_super) {
    __extends(ExperienceLawyersSelected, _super);

    function ExperienceLawyersSelected() {
      return ExperienceLawyersSelected.__super__.constructor.apply(this, arguments);
    }

    ExperienceLawyersSelected.prototype.template = $('#lawyer-selected-template');

    ExperienceLawyersSelected.prototype.tagName = 'tr';

    ExperienceLawyersSelected.prototype.events = {
      "click .remove": "destroy"
    };

    ExperienceLawyersSelected.prototype.render = function() {
      var source, template;
      source = this.template.html();
      template = Handlebars.compile(source);
      return $('#lawyers-selected tbody').append(this.$el.html(template(this.model.toJSON())));
    };

    ExperienceLawyersSelected.prototype.renderObject = function(model) {
      var source, template;
      source = this.template.html();
      template = Handlebars.compile(source);
      return $('#lawyers-selected tbody').append(this.$el.html(template(model)));
    };

    ExperienceLawyersSelected.prototype.destroy = function(e) {
      e.preventDefault();
      return this.$el.remove();
    };

    return ExperienceLawyersSelected;

  })(Backbone.View);
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.admin.Router = (function(_super) {
    __extends(Router, _super);

    function Router() {
      return Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.routes = {
      'dashboard': 'dashboard',
      'crear-abogado': 'createLawyer',
      "admin/lawyers/new": "createLawyer",
      "en/admin/lawyers/new": "createLawyer",
      ':lang/crear-abogado': 'createLawyer',
      'admin/lawyers/:id/edit': 'editLawyer',
      "en/admin/lawyers/:id/edit": "editLawyer",
      'editar-abogado/:id': 'editLawyer',
      'en/editar-abogado/:id': 'editLawyer',
      'admin/posts': 'post',
      'admin/posts/new': 'createPost',
      'en/admin/posts/new': 'createPost',
      'admin/posts/:id/edit': 'editPost',
      'en/admin/posts/:id/edit': 'editPost',
      'admin/the-actual/new': 'createTheActual',
      'admin/the-actual/:id/edit': 'editTheActual',
      'en/admin/the-actual/:id/edit': 'editTheActual',
      'admin/the-actual': 'theActual',
      'admin/experiences': 'experience',
      'admin/experiences/new': 'createExperience',
      'admin/experiences/:id/edit': 'editExperience',
      'en/admin/experiences/:id/edit': 'editExperience'
    };

    Router.prototype.dashboard = function() {
      ppu.lawyers = new ppu.Lawyers;
      ppu.lawyers.fetch({
        reset: true
      });
      ppu.admin.lawyers = new ppu.admin.LawyersView({
        collection: ppu.lawyers
      });
      return ppu.admin.lawyersFilters = new ppu.admin.LawyersFilters;
    };

    Router.prototype.post = function() {
      ppu.posts = new ppu.Posts;
      ppu.posts.fetch({
        reset: true,
        data: {
          the_actual_ch: 0,
          the_actual_co: 0
        }
      });
      ppu.admin.posts = new ppu.admin.PostsView({
        collection: ppu.posts
      });
      return ppu.admin.postsFilters = new ppu.admin.PostsFilters;
    };

    Router.prototype.createPost = function(lang) {
      ppu.admin.post = new ppu.Post;
      ppu.admin.postCreate = new ppu.admin.PostCreate({
        model: ppu.admin.post
      });
      ppu.admin.postCreate.render();
      ppu.categories = new ppu.Categories;
      ppu.categories.fetch({
        reset: true
      });
      ppu.admin.categoriesCheckboxnew = new ppu.admin.CategoriesCheckbox({
        collection: ppu.categories
      });
      ppu.admin.galleries = new ppu.admin.Galleries;
      return ppu.admin.galleries.fetch({
        reset: true,
        data: {
          name: "post_header"
        }
      });
    };

    Router.prototype.editPost = function(id) {
      ppu.admin.post = new ppu.Post({
        id: id
      });
      ppu.admin.post.fetch({
        data: {
          lang: app.lang
        }
      });
      ppu.admin.postEdit = new ppu.admin.PostEdit({
        model: ppu.admin.post
      });
      ppu.admin.galleries = new ppu.admin.Galleries;
      return ppu.admin.galleries.fetch({
        reset: true,
        data: {
          name: "post_header"
        }
      });
    };

    Router.prototype.theActual = function() {
      ppu.posts = new ppu.Posts;
      ppu.posts.fetch({
        reset: true,
        data: {
          the_actual_ch: 1
        }
      });
      ppu.admin.posts = new ppu.admin.TheActualViews({
        collection: ppu.posts
      });
      return ppu.admin.postsFilters = new ppu.admin.PostsFilters;
    };

    Router.prototype.createTheActual = function() {
      ppu.admin.post = new ppu.Post;
      ppu.admin.postCreate = new ppu.admin.TheActualCreate({
        model: ppu.admin.post
      });
      ppu.admin.postCreate.render();
      ppu.categories = new ppu.Categories;
      ppu.categories.fetch({
        reset: true
      });
      ppu.admin.categoriesCheckboxnew = new ppu.admin.CategoriesCheckbox({
        collection: ppu.categories
      });
      ppu.admin.galleries = new ppu.admin.Galleries;
      return ppu.admin.galleries.fetch({
        reset: true,
        data: {
          name: "post_header"
        }
      });
    };

    Router.prototype.editTheActual = function(id) {
      ppu.admin.post = new ppu.Post({
        id: id
      });
      ppu.admin.post.fetch({
        data: {
          lang: app.lang
        }
      });
      ppu.admin.postEdit = new ppu.admin.PostEdit({
        model: ppu.admin.post
      });
      ppu.admin.galleries = new ppu.admin.Galleries;
      return ppu.admin.galleries.fetch({
        reset: true,
        data: {
          name: "post_header"
        }
      });
    };

    Router.prototype.lawyer = function() {
      ppu.lawyers = new ppu.Lawyers;
      ppu.lawyers.fetch({
        reset: true
      });
      ppu.admin.lawyers = new ppu.admin.LawyersView({
        collection: ppu.lawyers
      });
      return ppu.admin.lawyersFilters = new ppu.admin.LawyersFilters;
    };

    Router.prototype.createLawyer = function(lang) {
      ppu.lawyer = new ppu.Lawyer;
      ppu.lawyerCreateForm = new ppu.LawyerCreateForm({
        model: ppu.lawyer
      });
      ppu.lawyerCreateForm.render();
      ppu.categories = new ppu.Categories;
      ppu.categories.fetch({
        reset: true
      });
      ppu.admin.categoriesCheckboxnew = new ppu.admin.CategoriesCheckbox({
        collection: ppu.categories
      });
      return ppu.lawyerCreate = new ppu.LawyerCreateView;
    };

    Router.prototype.editLawyer = function(id) {
      var view;
      $("#lawyer-create").remove();
      ppu.lawyer = new ppu.Lawyer({
        id: id
      });
      ppu.lawyer.fetch({
        data: {
          lang: app.lang
        }
      });
      view = new ppu.LawyerEditView({
        model: ppu.lawyer
      });
      mixins.renderCollection(ppu.LawyerEducations, ppu.LawyerEducationsEdit, {
        lawyer_id: id
      });
      mixins.renderCollection(ppu.LawyerArticles, ppu.LawyerArticlesEdit, {
        lawyer_id: id
      });
      mixins.renderCollection(ppu.LawyerJobs, ppu.LawyerJobsEdit, {
        lawyer_id: id
      });
      mixins.renderCollection(ppu.LawyerRecognitions, ppu.LawyerRecognitionsEdit, {
        lawyer_id: id
      });
      mixins.renderCollection(ppu.LawyerInstitutions, ppu.LawyerInstitutionsEdit, {
        lawyer_id: id
      });
      mixins.renderCollection(ppu.LawyerLanguages, ppu.LawyerLanguagesEdit, {
        lawyer_id: id
      });
      mixins.renderCollection(ppu.LawyerPharases, ppu.LawyerPharasesEdit, {
        lawyer_id: id
      });
      mixins.renderCollection(ppu.LawyerAwards, ppu.LawyerAwardsEdit, {
        lawyer_id: id
      });
      return mixins.renderCollection(ppu.LawyerAcademics, ppu.LawyerAcademicsEdit, {
        lawyer_id: id
      });
    };

    Router.prototype.experience = function() {
      ppu.experiences = new ppu.Experiences;
      ppu.experiences.fetch({
        reset: true
      });
      ppu.admin.experiences = new ppu.admin.ExperiencesView({
        collection: ppu.experiences
      });
      return ppu.admin.experiencesFilters = new ppu.admin.ExperiencesFilters;
    };

    Router.prototype.createExperience = function(lang) {
      ppu.admin.experience = new ppu.Experience;
      ppu.admin.experienceCreate = new ppu.admin.ExperienceCreate({
        model: ppu.admin.experience
      });
      ppu.admin.experienceCreate.render();
      ppu.categories = new ppu.Categories;
      ppu.categories.fetch({
        reset: true
      });
      ppu.admin.categoriesCheckboxnew = new ppu.admin.CategoriesCheckbox({
        collection: ppu.categories
      });
      ppu.admin.galleries = new ppu.admin.Galleries;
      return ppu.admin.galleries.fetch({
        reset: true,
        data: {
          name: "company_logo"
        }
      });
    };

    Router.prototype.editExperience = function(id) {
      ppu.admin.experience = new ppu.Experience({
        id: id
      });
      ppu.admin.experience.fetch({
        data: {
          lang: app.lang
        }
      });
      ppu.admin.experienceEdit = new ppu.admin.ExperienceEdit({
        model: ppu.admin.experience
      });
      ppu.admin.galleries = new ppu.admin.Galleries;
      return ppu.admin.galleries.fetch({
        reset: true,
        data: {
          name: "company_logo"
        }
      });
    };

    return Router;

  })(Backbone.Router);
  ppu.admin.router = new ppu.admin.Router;
  return Backbone.history.start({
    pushState: true
  });
});
