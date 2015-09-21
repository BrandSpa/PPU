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
  interval: 7000
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
  setPosition: function(position) {
    return this.model.save({
      position: position
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
  stop: function(event, ui) {
    var _this, list;
    _this = this;
    list = $(this.el).find('tbody tr');
    return $.map(list, function(el) {
      var id, model, pos;
      pos = $(el).index();
      id = $(el).data('id');
      model = _this.collection.get(id);
      return model.save({
        fields: {
          position: pos
        }
      });
    });
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
    this.$el.find('.modal-body').empty();
    source = $(this.template).html();
    template = Handlebars.compile(source);
    this.$el.find('.modal-body').html(template(data));
    this.openModal();
    return this.appendDatePicker();
  },
  openModal: function() {
    return $(this.el).modal({
      backdrop: 'static'
    });
  },
  appendDatePicker: function() {
    return $(this.el).find('.datepicker-year').datepicker({
      format: 'yyyy',
      viewMode: "years",
      minViewMode: "years",
      language: 'es',
      autoclose: true
    });
  },
  create: function(e) {
    var $form, data, el, lawyer_id;
    e.preventDefault();
    el = $(e.currentTarget);
    lawyer_id = el.data('lawyer_id');
    $form = this.$el.find('form');
    data = new FormData($form[0]);
    return this.store(data);
  },
  store: function(data) {
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
    this.$el.find('.modal-body').empty();
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
  var ref;
  return (ref = val1 === val2) != null ? ref : {
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

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.AppView = (function(superClass) {
    extend(AppView, superClass);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.prototype.el = $("#ppu-app");

    AppView.prototype.events = {
      'click .change-lang-page': 'changeLangPage'
    };

    AppView.prototype.initialize = function() {
      return this.activeLink();
    };

    AppView.prototype.activeLink = function() {
      var links;
      links = $(this.el).find('.nav-main li a');
      return links.each(function(link, b) {
        if ($(b).data('url') === ("/" + ppu.pathUrl[1])) {
          return $(b).parent().addClass('active');
        }
      });
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

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ppu.Category = (function(superClass) {
  extend(Category, superClass);

  function Category() {
    return Category.__super__.constructor.apply(this, arguments);
  }

  Category.prototype.urlRoot = '/api/categories';

  return Category;

})(Backbone.Model);

ppu.Categories = (function(superClass) {
  extend(Categories, superClass);

  function Categories() {
    return Categories.__super__.constructor.apply(this, arguments);
  }

  Categories.prototype.url = '/api/categories';

  Categories.prototype.model = ppu.Category;

  return Categories;

})(Backbone.Collection);

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ppu.Curriculum = (function(superClass) {
  extend(Curriculum, superClass);

  function Curriculum() {
    return Curriculum.__super__.constructor.apply(this, arguments);
  }

  Curriculum.prototype.urlRoot = "/api/curriculums";

  return Curriculum;

})(Backbone.Model);

ppu.Curriculums = (function(superClass) {
  extend(Curriculums, superClass);

  function Curriculums() {
    return Curriculums.__super__.constructor.apply(this, arguments);
  }

  Curriculums.prototype.url = "/api/curriculums";

  Curriculums.prototype.model = ppu.Curriculum;

  return Curriculums;

})(Backbone.Collection);

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ppu.Contact = (function(superClass) {
  extend(Contact, superClass);

  function Contact() {
    return Contact.__super__.constructor.apply(this, arguments);
  }

  Contact.prototype.urlRoot = "/api/contacts";

  return Contact;

})(Backbone.Model);

ppu.Contacts = (function(superClass) {
  extend(Contacts, superClass);

  function Contacts() {
    return Contacts.__super__.constructor.apply(this, arguments);
  }

  Contacts.prototype.url = "/api/contacts";

  Contacts.prototype.model = ppu.Contact;

  return Contacts;

})(Backbone.Collection);

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ppu.Lawyer = (function(superClass) {
  extend(Lawyer, superClass);

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

ppu.Lawyers = (function(superClass) {
  extend(Lawyers, superClass);

  function Lawyers() {
    return Lawyers.__super__.constructor.apply(this, arguments);
  }

  Lawyers.prototype.url = "/api/lawyers";

  Lawyers.prototype.model = ppu.Lawyer;

  return Lawyers;

})(Backbone.Collection);

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ppu.Post = (function(superClass) {
  extend(Post, superClass);

  function Post() {
    return Post.__super__.constructor.apply(this, arguments);
  }

  Post.prototype.urlRoot = '/api/posts';

  return Post;

})(Backbone.Model);

ppu.Posts = (function(superClass) {
  extend(Posts, superClass);

  function Posts() {
    return Posts.__super__.constructor.apply(this, arguments);
  }

  Posts.prototype.url = '/api/posts';

  Posts.prototype.model = ppu.Post;

  return Posts;

})(Backbone.Collection);

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ppu.Experience = (function(superClass) {
  extend(Experience, superClass);

  function Experience() {
    return Experience.__super__.constructor.apply(this, arguments);
  }

  Experience.prototype.urlRoot = "/api/experiences";

  return Experience;

})(Backbone.Model);

ppu.Experiences = (function(superClass) {
  extend(Experiences, superClass);

  function Experiences() {
    return Experiences.__super__.constructor.apply(this, arguments);
  }

  Experiences.prototype.url = "/api/experiences";

  Experiences.prototype.model = ppu.Experience;

  return Experiences;

})(Backbone.Collection);

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.FiltersMobile = (function(superClass) {
    extend(FiltersMobile, superClass);

    function FiltersMobile() {
      return FiltersMobile.__super__.constructor.apply(this, arguments);
    }

    FiltersMobile.prototype.el = $("#filters-modal");

    FiltersMobile.prototype.events = {
      "click .apply-filters": "applyFilters",
      "change .category": "addCategory",
      "change .country": "addCountry"
    };

    FiltersMobile.prototype.initialize = function() {
      this.filters = {};
      return app.pubsub.on("filters:showPosition", this.showPosition, this);
    };

    FiltersMobile.prototype.applyFilters = function(e) {
      e.preventDefault();
      app.pubsub.trigger("apply:filters", this.filters);
      return this.$el.modal('hide');
    };

    FiltersMobile.prototype.showPosition = function() {
      console.log("dale remove");
      return $("#filters-modal").find('.position').removeClass('hidden');
    };

    FiltersMobile.prototype.addFilter = function(filter) {
      return this.filters = _.extend(this.filters, filter);
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

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.CategoryView = (function(superClass) {
    extend(CategoryView, superClass);

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
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.CategoriesView = (function(superClass) {
    extend(CategoriesView, superClass);

    function CategoriesView() {
      return CategoriesView.__super__.constructor.apply(this, arguments);
    }

    CategoriesView.prototype.el = $("#categories");

    CategoriesView.prototype.initialize = function() {
      return this.listenTo(this.collection, 'reset', this.render);
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
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.CategoryDetail = (function(superClass) {
    extend(CategoryDetail, superClass);

    function CategoryDetail() {
      return CategoryDetail.__super__.constructor.apply(this, arguments);
    }

    CategoryDetail.prototype.el = $("#category");

    CategoryDetail.prototype.template = $("#category-detail-template");

    CategoryDetail.prototype.initialize = function() {
      return this.listenTo(this.model, "change", this.render);
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
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.CategoriesList = (function(superClass) {
    extend(CategoriesList, superClass);

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
      return $("#categories-list").html(template(this.collection.toJSON()));
    };

    return CategoriesList;

  })(Backbone.View);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.LawyerView = (function(superClass) {
    extend(LawyerView, superClass);

    function LawyerView() {
      return LawyerView.__super__.constructor.apply(this, arguments);
    }

    LawyerView.prototype.template = $('#lawyer-template');

    LawyerView.prototype.className = 'col-md-6 col-sm-6 col-xs-12 lawyer-item';

    LawyerView.prototype.events = {
      "click": "open"
    };

    LawyerView.prototype.open = function() {
      return window.location = "/abogados/" + (this.model.get('slug'));
    };

    LawyerView.prototype.render = function() {
      var compile, source;
      source = this.template.html();
      compile = Handlebars.compile(source);
      $(this.el).html(compile(this.model.toJSON()));
      return this;
    };

    return LawyerView;

  })(Backbone.View);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.LawyersView = (function(superClass) {
    extend(LawyersView, superClass);

    function LawyersView() {
      return LawyersView.__super__.constructor.apply(this, arguments);
    }

    LawyersView.prototype.el = $('#lawyers');

    LawyersView.prototype.initialize = function() {
      var data;
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'add', this.renderOne);
      if (app.lang === "en") {
        data = _.extend({
          published: 1,
          order_by_english: ""
        });
      } else {
        data = _.extend({
          published: 1,
          order_by_spanish: ""
        });
      }
      this.collection.fetch({
        reset: true,
        data: data
      });
      return app.pubsub.on("apply:filters", this.filterCollection, this);
    };

    LawyersView.prototype.filterCollection = function(filters) {
      filters = _.extend({
        lang: app.lang
      }, filters);
      return this.collection.fetch({
        reset: true,
        data: filters
      });
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
      $(this.el).empty();
      return this.collection.each(function(model) {
        return this.renderOne(model);
      }, this);
    };

    return LawyersView;

  })(Backbone.View);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.LawyerDetailView = (function(superClass) {
    extend(LawyerDetailView, superClass);

    function LawyerDetailView() {
      return LawyerDetailView.__super__.constructor.apply(this, arguments);
    }

    LawyerDetailView.prototype.el = $('#lawyer');

    LawyerDetailView.prototype.template = $('#lawyer-template');

    LawyerDetailView.prototype.initialize = function() {
      return this.listenTo(this.model, 'change', this.render);
    };

    LawyerDetailView.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      $(this.el).html(template(this.model.toJSON()));
      return this.resizeImages();
    };

    LawyerDetailView.prototype.resizeImages = function() {
      var images;
      images = this.$el.find('.award img');
      return _.each(images, function(e) {
        return $(e).load(function(a) {
          if ($(this).height() > 90) {
            return $(this).css('height', '90px');
          }
        });
      });
    };

    return LawyerDetailView;

  })(Backbone.View);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.LawyersFilters = (function(superClass) {
    extend(LawyersFilters, superClass);

    function LawyersFilters() {
      return LawyersFilters.__super__.constructor.apply(this, arguments);
    }

    LawyersFilters.prototype.el = $('#top-bar');

    LawyersFilters.prototype.template = $("#lawyers-filter");

    LawyersFilters.prototype.offset = 20;

    LawyersFilters.prototype.events = {
      'change .position': 'byPosition',
      'change .countries': 'byCountry',
      'change .category': 'byCategory',
      'keyup .query': 'byQuery',
      'submit .search': 'bySearch'
    };

    LawyersFilters.prototype.initialize = function() {
      this.render();
      this.filtersAplied = {
        lang: app.lang,
        published: 1
      };
      this.order_by();
      this.$el.data("filtersAplied", this.filtersAplied);
      app.pubsub.on("general:scroll", this.paginate, this);
      return app.pubsub.trigger("filters:showPosition");
    };

    LawyersFilters.prototype.order_by = function() {
      if (app.lang === "en") {
        return _.extend(this.filtersAplied, {
          order_by_english: ""
        });
      } else {
        return _.extend(this.filtersAplied, {
          order_by_spanish: ""
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
        data: data,
        beforeSend: function() {
          return $('.preload').removeClass('hidden');
        },
        success: function() {
          return $('.preload').addClass('hidden');
        }
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
      var data, val;
      val = $(e.currentTarget).find('select').val();
      data = _.extend(this.filtersAplied, {
        paginate: 0,
        country: val
      });
      return ppu.lawyers.fetch({
        reset: true,
        data: data
      });
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
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.lawyersRelatedCategory = (function(superClass) {
    extend(lawyersRelatedCategory, superClass);

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

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.PostView = (function(superClass) {
    extend(PostView, superClass);

    function PostView() {
      return PostView.__super__.constructor.apply(this, arguments);
    }

    PostView.prototype.template = $("#post-template");

    PostView.prototype.className = "col-md-6 col-sm-6 col-xs-12 post-item";

    PostView.prototype.events = {
      "click .share-hover": "open"
    };

    PostView.prototype.open = function() {
      return window.location = "/posts/" + (this.model.get('slug'));
    };

    PostView.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      $(this.el).html(template(this.model.toJSON()));
      return this;
    };

    return PostView;

  })(Backbone.View);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.PostFeaturedView = (function(superClass) {
    extend(PostFeaturedView, superClass);

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
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.PostMainFeaturedView = (function(superClass) {
    extend(PostMainFeaturedView, superClass);

    function PostMainFeaturedView() {
      return PostMainFeaturedView.__super__.constructor.apply(this, arguments);
    }

    PostMainFeaturedView.prototype.template = $("#post-main-featured-template");

    PostMainFeaturedView.prototype.className = "col-md-6 col-sm-6 col-xs-12 post-main-featured-item";

    PostMainFeaturedView.prototype.events = {
      "click": "open"
    };

    PostMainFeaturedView.prototype.open = function() {
      return window.location = "/posts/" + (this.model.get('slug'));
    };

    PostMainFeaturedView.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      $(this.el).html(template(this.model.toJSON()));
      return this;
    };

    return PostMainFeaturedView;

  })(Backbone.View);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.PostsView = (function(superClass) {
    extend(PostsView, superClass);

    function PostsView() {
      return PostsView.__super__.constructor.apply(this, arguments);
    }

    PostsView.prototype.el = $("#posts");

    PostsView.prototype.initialize = function() {
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'add', this.renderOne);
      app.pubsub.on("posts:filter", this.filterCollection, this);
      return app.pubsub.on("apply:filters", this.filterCollection, this);
    };

    PostsView.prototype.filterCollection = function(filters) {
      filters = _.extend({
        lang: app.lang
      }, filters);
      return this.collection.fetch({
        reset: true,
        data: filters,
        beforeSend: function() {
          return $('.preload').removeClass('hidden');
        },
        success: function() {
          return $('.preload').addClass('hidden');
        }
      });
    };

    PostsView.prototype.renderOne = function(model) {
      ppu.postView = new ppu.PostView({
        model: model
      });
      return this.$el.append(ppu.postView.render().el);
    };

    PostsView.prototype.renderMain = function(model) {
      ppu.postMainFeaturedView = new ppu.PostMainFeaturedView({
        model: model
      });
      return this.$el.prepend(ppu.postMainFeaturedView.render().el);
    };

    PostsView.prototype.render = function() {
      var i;
      this.$el.empty();
      if (this.collection.length <= 0) {
        $('.not-found').removeClass('hidden');
      } else {
        $('.not-found').addClass('hidden');
      }
      i = 0;
      return this.collection.each(function(model) {
        if (i === 0) {
          this.renderMain(model);
        } else {
          this.renderOne(model);
        }
        return i++;
      }, this);
    };

    return PostsView;

  })(Backbone.View);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.PostsFeaturedView = (function(superClass) {
    extend(PostsFeaturedView, superClass);

    function PostsFeaturedView() {
      return PostsFeaturedView.__super__.constructor.apply(this, arguments);
    }

    PostsFeaturedView.prototype.el = $("#posts-featured");

    PostsFeaturedView.prototype.initialize = function() {
      this.listenTo(this.collection, "reset", this.render);
      app.pubsub.bind("posts:rendered", this.getFeatured, this);
      return app.pubsub.on("posts:filter", this.remove, this);
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
      ppu.postView = new ppu.PostFeaturedView({
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
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.PostsFilters = (function(superClass) {
    extend(PostsFilters, superClass);

    function PostsFilters() {
      return PostsFilters.__super__.constructor.apply(this, arguments);
    }

    PostsFilters.prototype.el = $('#top-bar');

    PostsFilters.prototype.template = $("#posts-filter");

    PostsFilters.prototype.events = {
      'change .countries': 'byCountry',
      'change .category': 'byCategory',
      'keyup .query': 'byKeyword',
      'submit .search': 'bySearch'
    };

    PostsFilters.prototype.initialize = function() {
      this.filtersAplied = {
        lang: app.lang,
        published: 1,
        the_actual_ch: 0,
        the_actual_co: 0
      };
      app.pubsub.on("general:scroll", this.paginate, this);
      return this.offset = 20;
    };

    PostsFilters.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      this.$el.html(template);
      return ppu.appendSelect(this.el);
    };

    PostsFilters.prototype.filterBy = function(data) {
      data = _.extend({
        paginate: 0
      }, data);
      data = _.extend(this.filtersAplied, data);
      return app.pubsub.trigger("posts:filter", data);
    };

    PostsFilters.prototype.paginate = function() {
      var data;
      data = _.extend(this.filtersAplied, {
        paginate: this.offset
      });
      ppu.posts.fetch({
        data: data,
        beforeSend: function() {
          return $('.preload').removeClass('hidden');
        },
        success: function() {
          return $('.preload').addClass('hidden');
        }
      });
      return this.offset = this.offset + 20;
    };

    PostsFilters.prototype.byCountry = function(e) {
      var val;
      val = $(e.currentTarget).find('select').val();
      return this.filterBy({
        country: val
      });
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
        category: val
      });
    };

    PostsFilters.prototype.byKeyword = function(e) {
      var val;
      val = $(e.currentTarget).val();
      if (val.length >= 2) {
        return this.filterBy({
          keyword: val
        });
      } else if (val.length === 1) {
        return this.filterBy({
          keyword: "",
          featured_order: "ASC"
        });
      }
    };

    PostsFilters.prototype.bySearch = function(e) {
      var val;
      e.preventDefault();
      val = $(e.currentTarget).find(".query").val();
      return this.filterBy({
        keyword: val
      });
    };

    return PostsFilters;

  })(Backbone.View);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.PostDetailView = (function(superClass) {
    extend(PostDetailView, superClass);

    function PostDetailView() {
      return PostDetailView.__super__.constructor.apply(this, arguments);
    }

    PostDetailView.prototype.el = $("#post-detail");

    PostDetailView.prototype.template = $("#post-detail-template");

    PostDetailView.prototype.initialize = function() {
      return this.listenTo(this.model, "change", this.render);
    };

    PostDetailView.prototype.render = function() {
      var relatedData, template;
      template = app.compile(this.template);
      this.$el.html(template(this.model.toJSON()));
      this.setUrlTranslation(this.model);
      this.model.get('categories');
      if (this.model.get('categories')[0]) {
        relatedData = {
          category: this.model.get('categories')[0].name,
          without: this.model.id
        };
        return app.pubsub.trigger('posts:getRelated', relatedData);
      }
    };

    return PostDetailView;

  })(Backbone.View);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.PostsRelated = (function(superClass) {
    extend(PostsRelated, superClass);

    function PostsRelated() {
      return PostsRelated.__super__.constructor.apply(this, arguments);
    }

    PostsRelated.prototype.el = $("#posts-related");

    PostsRelated.prototype.initialize = function() {
      this.listenTo(this.collection, 'reset', this.render);
      return app.pubsub.on('posts:getRelated', this.get, this);
    };

    PostsRelated.prototype.get = function(data) {
      return this.collection.fetch({
        reset: true,
        data: data
      });
    };

    PostsRelated.prototype.renderOne = function(model) {
      ppu.postView = new ppu.PostView({
        model: model
      });
      return this.$el.append(ppu.postView.render().el);
    };

    PostsRelated.prototype.render = function() {
      this.$el.empty();
      if (this.collection.length > 0) {
        $('.related-title').removeClass('hidden');
        return this.collection.each(function(model) {
          return this.renderOne(model);
        }, this);
      }
    };

    return PostsRelated;

  })(Backbone.View);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.ExperienceView = (function(superClass) {
    extend(ExperienceView, superClass);

    function ExperienceView() {
      return ExperienceView.__super__.constructor.apply(this, arguments);
    }

    ExperienceView.prototype.template = $("#experience-template");

    ExperienceView.prototype.className = "col-md-6 col-sm-6 col-xs-12 experience-item";

    ExperienceView.prototype.events = {
      "click": "open"
    };

    ExperienceView.prototype.open = function() {
      return window.location = "/experiencias/" + (this.model.get('slug'));
    };

    ExperienceView.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      $(this.el).html(template(this.model.toJSON()));
      return this;
    };

    return ExperienceView;

  })(Backbone.View);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.ExperiencesView = (function(superClass) {
    extend(ExperiencesView, superClass);

    function ExperiencesView() {
      return ExperiencesView.__super__.constructor.apply(this, arguments);
    }

    ExperiencesView.prototype.el = $("#experiences");

    ExperiencesView.prototype.initialize = function() {
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'add', this.renderOne);
      app.pubsub.bind("experiences:filter", this.filterCollection, this);
      return app.pubsub.on("apply:filters", this.filterCollection, this);
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
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.ExperiencesFilters = (function(superClass) {
    extend(ExperiencesFilters, superClass);

    function ExperiencesFilters() {
      return ExperiencesFilters.__super__.constructor.apply(this, arguments);
    }

    ExperiencesFilters.prototype.el = $('#top-bar');

    ExperiencesFilters.prototype.template = $("#experiences-filter");

    ExperiencesFilters.prototype.events = {
      'change .position': 'byPosition',
      'change .countries': 'byCountry',
      'change .category': 'byCategory',
      'keydown .query': 'byQuery',
      'submit .search': 'bySearch'
    };

    ExperiencesFilters.prototype.initialize = function() {
      this.filtersAplied = {
        lang: app.lang
      };
      app.pubsub.on("general:scroll", this.paginate, this);
      return this.offset = 20;
    };

    ExperiencesFilters.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      this.$el.html(template);
      return ppu.appendSelect(this.el);
    };

    ExperiencesFilters.prototype.paginate = function() {
      var data;
      data = _.extend(this.filtersAplied, {
        paginate: this.offset
      });
      ppu.experiences.fetch({
        data: data,
        beforeSend: function() {
          return $('.preload').removeClass('hidden');
        },
        success: function() {
          return $('.preload').addClass('hidden');
        }
      });
      return this.offset = this.offset + 20;
    };

    ExperiencesFilters.prototype.filterBy = function(data) {
      this.offset = 0;
      data = _.extend({
        paginate: 0
      }, data);
      data = _.extend(this.filtersAplied, data);
      return app.pubsub.trigger("experiences:filter", data);
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
      val = $(e.currentTarget).find('select').val();
      return this.filterBy({
        country: val
      });
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
        category: val
      });
    };

    ExperiencesFilters.prototype.byQuery = function(e) {
      var val;
      val = $(e.currentTarget).val();
      if (val.length >= 1) {
        return this.filterBy({
          keyword: val
        });
      } else {
        return this.filterBy({
          keyword: ""
        });
      }
    };

    ExperiencesFilters.prototype.bySearch = function(e) {
      var val;
      e.preventDefault();
      val = $(e.currentTarget).find(".query").val();
      return this.filterBy({
        keyword: val
      });
    };

    return ExperiencesFilters;

  })(Backbone.View);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.ExperienceDetailView = (function(superClass) {
    extend(ExperienceDetailView, superClass);

    function ExperienceDetailView() {
      return ExperienceDetailView.__super__.constructor.apply(this, arguments);
    }

    ExperienceDetailView.prototype.el = $("#experience");

    ExperienceDetailView.prototype.template = $("#experience-detail-template");

    ExperienceDetailView.prototype.initialize = function() {
      return this.listenTo(this.model, "change", this.render);
    };

    ExperienceDetailView.prototype.render = function() {
      var dataRelated, template;
      template = app.compile(this.template);
      this.$el.html(template(this.model.toJSON()));
      this.setUrlTranslation(this.model);
      dataRelated = {
        category: this.model.get('categories')[0].name,
        without: this.model.id
      };
      return app.pubsub.trigger('experiences:getRelated', dataRelated);
    };

    return ExperienceDetailView;

  })(Backbone.View);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.ExperienecesRelated = (function(superClass) {
    extend(ExperienecesRelated, superClass);

    function ExperienecesRelated() {
      return ExperienecesRelated.__super__.constructor.apply(this, arguments);
    }

    ExperienecesRelated.prototype.el = "#experiences-related";

    ExperienecesRelated.prototype.initialize = function() {
      this.listenTo(this.collection, 'reset', this.render);
      return app.pubsub.on('experiences:getRelated', this.get, this);
    };

    ExperienecesRelated.prototype.get = function(data) {
      return this.collection.fetch({
        reset: true,
        data: data
      });
    };

    ExperienecesRelated.prototype.renderOne = function(model) {
      ppu.experienceView = new ppu.ExperienceView({
        model: model
      });
      return this.$el.append(ppu.experienceView.render().el);
    };

    ExperienecesRelated.prototype.render = function() {
      $(this.el).empty();
      return this.collection.each(function(model) {
        return this.renderOne(model);
      }, this);
    };

    return ExperienecesRelated;

  })(Backbone.View);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.CurriculumCreate = (function(superClass) {
    extend(CurriculumCreate, superClass);

    function CurriculumCreate() {
      return CurriculumCreate.__super__.constructor.apply(this, arguments);
    }

    CurriculumCreate.prototype.el = $("#work-with-us");

    CurriculumCreate.prototype.events = {
      "click .send-cv": "store"
    };

    CurriculumCreate.prototype.initialize = function() {
      this.listenTo(this.model, "sync", this.stored);
      return this.listenTo(this.model, "error", this.renderErrors, this);
    };

    CurriculumCreate.prototype.store = function(e) {
      var $forms, datas, options;
      e.preventDefault();
      $forms = $(this.el).find('form');
      datas = new FormData($forms[0]);
      options = ppu.ajaxOptions("POST", datas);
      return this.model.save(datas, $.extend({}, options));
    };

    CurriculumCreate.prototype.renderTitle = function() {
      var title;
      title = $("#work-with-title-template").html();
      return $("#top-bar").html(title);
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

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.FooterContactCreate = (function(superClass) {
    extend(FooterContactCreate, superClass);

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

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.TheCurrentView = (function(superClass) {
    extend(TheCurrentView, superClass);

    function TheCurrentView() {
      return TheCurrentView.__super__.constructor.apply(this, arguments);
    }

    TheCurrentView.prototype.template = $("#the-actual-post-template");

    TheCurrentView.prototype.className = "col-md-6 col-sm-6 col-xs-12 post-item";

    TheCurrentView.prototype.events = {
      "click .share-hover": "open"
    };

    TheCurrentView.prototype.open = function() {
      return window.location = "/el-actual/" + (this.model.get('slug'));
    };

    TheCurrentView.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      $(this.el).html(template(this.model.toJSON()));
      return this;
    };

    return TheCurrentView;

  })(Backbone.View);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.TheActualFeaturedView = (function(superClass) {
    extend(TheActualFeaturedView, superClass);

    function TheActualFeaturedView() {
      return TheActualFeaturedView.__super__.constructor.apply(this, arguments);
    }

    TheActualFeaturedView.prototype.template = $("#the-actual-featured-template");

    TheActualFeaturedView.prototype.className = "col-md-6 col-sm-6 col-xs-12 post-main-featured-item";

    TheActualFeaturedView.prototype.events = {
      "click": "open"
    };

    TheActualFeaturedView.prototype.open = function() {
      return window.location = "/el-actual/" + (this.model.get('slug'));
    };

    TheActualFeaturedView.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      $(this.el).html(template(this.model.toJSON()));
      return this;
    };

    return TheActualFeaturedView;

  })(Backbone.View);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.TheActualChViews = (function(superClass) {
    extend(TheActualChViews, superClass);

    function TheActualChViews() {
      return TheActualChViews.__super__.constructor.apply(this, arguments);
    }

    TheActualChViews.prototype.el = $("#posts");

    TheActualChViews.prototype.initialize = function() {
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'add', this.renderOne);
      app.pubsub.on("posts:filter", this.filterCollection, this);
      app.pubsub.on("apply:filters", this.filterCollection, this);
      return app.pubsub.on("posts:paginate", this.paginate, this);
    };

    TheActualChViews.prototype.filterCollection = function(filters) {
      filters = _.extend({
        lang: app.lang
      }, filters);
      return this.collection.fetch({
        reset: true,
        data: filters,
        beforeSend: function() {
          return $('.preload').removeClass('hidden');
        },
        success: function() {
          return $('.preload').addClass('hidden');
        }
      });
    };

    TheActualChViews.prototype.paginate = function(data) {
      return this.collection.fetch({
        data: data,
        beforeSend: function() {
          return $('.preload').removeClass('hidden');
        },
        success: function() {
          return $('.preload').addClass('hidden');
        }
      });
    };

    TheActualChViews.prototype.renderOne = function(model) {
      ppu.postView = new ppu.TheCurrentView({
        model: model
      });
      return this.$el.append(ppu.postView.render().el);
    };

    TheActualChViews.prototype.renderMain = function(model) {
      ppu.postMainFeaturedView = new ppu.TheActualFeaturedView({
        model: model
      });
      return this.$el.prepend(ppu.postMainFeaturedView.render().el);
    };

    TheActualChViews.prototype.render = function() {
      var i;
      this.$el.empty();
      if (this.collection.length <= 0) {
        $('.not-found').removeClass('hidden');
      } else {
        $('.not-found').addClass('hidden');
      }
      i = 0;
      return this.collection.each(function(model) {
        if (i === 0) {
          this.renderMain(model);
        } else {
          this.renderOne(model);
        }
        return i++;
      }, this);
    };

    return TheActualChViews;

  })(Backbone.View);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.TheActualChFilter = (function(superClass) {
    extend(TheActualChFilter, superClass);

    function TheActualChFilter() {
      return TheActualChFilter.__super__.constructor.apply(this, arguments);
    }

    TheActualChFilter.prototype.el = $('#top-bar');

    TheActualChFilter.prototype.template = $("#the-current-filters");

    TheActualChFilter.prototype.events = {
      'change .countries': 'byCountry',
      'change .category': 'byCategory',
      'keyup .query': 'byKeyword',
      'submit .search': 'bySearch'
    };

    TheActualChFilter.prototype.initialize = function() {
      this.filtersAplied = {
        lang: app.lang,
        published: 1,
        the_actual_ch: 1
      };
      app.pubsub.on("general:scroll", this.paginate, this);
      return this.offset = 20;
    };

    TheActualChFilter.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      this.$el.html(template);
      return ppu.appendSelect(this.el);
    };

    TheActualChFilter.prototype.filterBy = function(data) {
      data = _.extend({
        paginate: 0
      }, data);
      data = _.extend(this.filtersAplied, data);
      return app.pubsub.trigger("posts:filter", data);
    };

    TheActualChFilter.prototype.paginate = function() {
      var data;
      data = _.extend(this.filtersAplied, {
        paginate: this.offset
      });
      app.pubsub.trigger("posts:paginate", data);
      return this.offset = this.offset + 20;
    };

    TheActualChFilter.prototype.byCategory = function(e) {
      var val;
      val = $(e.currentTarget).find('select').val();
      return this.filterBy({
        category: val
      });
    };

    TheActualChFilter.prototype.byKeyword = function(e) {
      var val;
      val = $(e.currentTarget).val();
      if (val.length >= 2) {
        return this.filterBy({
          keyword: val
        });
      } else if (val.length === 1) {
        return this.filterBy({
          keyword: "",
          featured_order: "ASC"
        });
      }
    };

    TheActualChFilter.prototype.bySearch = function(e) {
      var val;
      e.preventDefault();
      val = $(e.currentTarget).find(".query").val();
      return this.filterBy({
        keyword: val
      });
    };

    return TheActualChFilter;

  })(Backbone.View);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  ppu.TheActualDetailView = (function(superClass) {
    extend(TheActualDetailView, superClass);

    function TheActualDetailView() {
      return TheActualDetailView.__super__.constructor.apply(this, arguments);
    }

    TheActualDetailView.prototype.el = $("#post-detail");

    TheActualDetailView.prototype.template = $("#post-detail-template");

    TheActualDetailView.prototype.initialize = function() {
      this.listenTo(this.model, "change", this.render);
      return this.getTitle();
    };

    TheActualDetailView.prototype.getTitle = function() {
      return $("#top-bar").html($("#post-detail-title").html());
    };

    TheActualDetailView.prototype.render = function() {
      var relatedData, template;
      template = app.compile(this.template);
      this.$el.html(template(this.model.toJSON()));
      this.setUrlTranslation(this.model);
      this.model.get('categories');
      if (this.model.get('categories')[0]) {
        relatedData = {
          category: this.model.get('categories')[0].name,
          without: this.model.id,
          the_actual_ch: 1
        };
        return app.pubsub.trigger('posts:getRelated', relatedData);
      }
    };

    return TheActualDetailView;

  })(Backbone.View);
  return ppu.TheActualRelated = (function(superClass) {
    extend(TheActualRelated, superClass);

    function TheActualRelated() {
      return TheActualRelated.__super__.constructor.apply(this, arguments);
    }

    TheActualRelated.prototype.el = $("#posts-related");

    TheActualRelated.prototype.initialize = function() {
      this.listenTo(this.collection, 'reset', this.render);
      return app.pubsub.on('posts:getRelated', this.get, this);
    };

    TheActualRelated.prototype.get = function(data) {
      return this.collection.fetch({
        reset: true,
        data: data
      });
    };

    TheActualRelated.prototype.renderOne = function(model) {
      ppu.postView = new ppu.TheCurrentView({
        model: model
      });
      return this.$el.append(ppu.postView.render().el);
    };

    TheActualRelated.prototype.render = function() {
      this.$el.empty();
      console.log(this.collection.length);
      if (this.collection.length > 0) {
        $('.related-title').removeClass('hidden');
        return this.collection.each(function(model) {
          return this.renderOne(model);
        }, this);
      }
    };

    return TheActualRelated;

  })(Backbone.View);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  ppu.TheActualCoView = (function(superClass) {
    extend(TheActualCoView, superClass);

    function TheActualCoView() {
      return TheActualCoView.__super__.constructor.apply(this, arguments);
    }

    TheActualCoView.prototype.template = $("#the-actual-post-template");

    TheActualCoView.prototype.className = "col-md-6 col-sm-6 col-xs-12 post-item";

    TheActualCoView.prototype.events = {
      "click .share-hover": "open"
    };

    TheActualCoView.prototype.open = function() {
      return window.location = "/el-actual-colombia/" + (this.model.get('slug'));
    };

    TheActualCoView.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      $(this.el).html(template(this.model.toJSON()));
      return this;
    };

    return TheActualCoView;

  })(Backbone.View);
  return ppu.TheActualCoFeaturedView = (function(superClass) {
    extend(TheActualCoFeaturedView, superClass);

    function TheActualCoFeaturedView() {
      return TheActualCoFeaturedView.__super__.constructor.apply(this, arguments);
    }

    TheActualCoFeaturedView.prototype.template = $("#the-actual-featured-template");

    TheActualCoFeaturedView.prototype.className = "col-md-6 col-sm-6 col-xs-12 post-main-featured-item";

    TheActualCoFeaturedView.prototype.events = {
      "click": "open"
    };

    TheActualCoFeaturedView.prototype.open = function() {
      return window.location = "/el-actual-colombia/" + (this.model.get('slug'));
    };

    TheActualCoFeaturedView.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      $(this.el).html(template(this.model.toJSON()));
      return this;
    };

    return TheActualCoFeaturedView;

  })(Backbone.View);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.TheActualCoFeaturedView = (function(superClass) {
    extend(TheActualCoFeaturedView, superClass);

    function TheActualCoFeaturedView() {
      return TheActualCoFeaturedView.__super__.constructor.apply(this, arguments);
    }

    TheActualCoFeaturedView.prototype.template = $("#the-actual-featured-template");

    TheActualCoFeaturedView.prototype.className = "col-md-6 col-sm-6 col-xs-12 post-main-featured-item";

    TheActualCoFeaturedView.prototype.events = {
      "click": "open"
    };

    TheActualCoFeaturedView.prototype.open = function() {
      return window.location = "/el-actual-colombia/" + (this.model.get('slug'));
    };

    TheActualCoFeaturedView.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      $(this.el).html(template(this.model.toJSON()));
      return this;
    };

    return TheActualCoFeaturedView;

  })(Backbone.View);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.TheActualCoViews = (function(superClass) {
    extend(TheActualCoViews, superClass);

    function TheActualCoViews() {
      return TheActualCoViews.__super__.constructor.apply(this, arguments);
    }

    TheActualCoViews.prototype.el = $("#posts");

    TheActualCoViews.prototype.initialize = function() {
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'add', this.renderOne);
      app.pubsub.on("posts:filter", this.filterCollection, this);
      app.pubsub.on("apply:filters", this.filterCollection, this);
      return app.pubsub.on("posts:paginate", this.paginate, this);
    };

    TheActualCoViews.prototype.filterCollection = function(filters) {
      filters = _.extend({
        lang: app.lang
      }, filters);
      return this.collection.fetch({
        reset: true,
        data: filters,
        beforeSend: function() {
          return $('.preload').removeClass('hidden');
        },
        success: function() {
          return $('.preload').addClass('hidden');
        }
      });
    };

    TheActualCoViews.prototype.paginate = function(data) {
      return this.collection.fetch({
        data: data,
        beforeSend: function() {
          return $('.preload').removeClass('hidden');
        },
        success: function() {
          return $('.preload').addClass('hidden');
        }
      });
    };

    TheActualCoViews.prototype.renderOne = function(model) {
      ppu.postView = new ppu.TheActualCoView({
        model: model
      });
      return this.$el.append(ppu.postView.render().el);
    };

    TheActualCoViews.prototype.renderMain = function(model) {
      ppu.postMainFeaturedView = new ppu.TheActualCoFeaturedView({
        model: model
      });
      return this.$el.prepend(ppu.postMainFeaturedView.render().el);
    };

    TheActualCoViews.prototype.render = function() {
      var i;
      this.$el.empty();
      if (this.collection.length <= 0) {
        $('.not-found').removeClass('hidden');
      } else {
        $('.not-found').addClass('hidden');
      }
      i = 0;
      return this.collection.each(function(model) {
        if (i === 0) {
          this.renderMain(model);
        } else {
          this.renderOne(model);
        }
        return i++;
      }, this);
    };

    return TheActualCoViews;

  })(Backbone.View);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  return ppu.TheActualCoFilter = (function(superClass) {
    extend(TheActualCoFilter, superClass);

    function TheActualCoFilter() {
      return TheActualCoFilter.__super__.constructor.apply(this, arguments);
    }

    TheActualCoFilter.prototype.el = $('#top-bar');

    TheActualCoFilter.prototype.template = $("#the-current-filters");

    TheActualCoFilter.prototype.events = {
      'change .countries': 'byCountry',
      'change .category': 'byCategory',
      'keyup .query': 'byKeyword',
      'submit .search': 'bySearch'
    };

    TheActualCoFilter.prototype.initialize = function() {
      this.filtersAplied = {
        lang: app.lang,
        published: 1,
        the_actual_co: 1
      };
      app.pubsub.on("general:scroll", this.paginate, this);
      return this.offset = 20;
    };

    TheActualCoFilter.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      this.$el.html(template);
      return ppu.appendSelect(this.el);
    };

    TheActualCoFilter.prototype.filterBy = function(data) {
      data = _.extend({
        paginate: 0
      }, data);
      data = _.extend(this.filtersAplied, data);
      return app.pubsub.trigger("posts:filter", data);
    };

    TheActualCoFilter.prototype.paginate = function() {
      var data;
      data = _.extend(this.filtersAplied, {
        paginate: this.offset
      });
      app.pubsub.trigger("posts:paginate", data);
      return this.offset = this.offset + 20;
    };

    TheActualCoFilter.prototype.byCategory = function(e) {
      var val;
      val = $(e.currentTarget).find('select').val();
      return this.filterBy({
        category: val
      });
    };

    TheActualCoFilter.prototype.byKeyword = function(e) {
      var val;
      val = $(e.currentTarget).val();
      if (val.length >= 2) {
        return this.filterBy({
          keyword: val
        });
      } else if (val.length === 1) {
        return this.filterBy({
          keyword: "",
          featured_order: "ASC"
        });
      }
    };

    TheActualCoFilter.prototype.bySearch = function(e) {
      var val;
      e.preventDefault();
      val = $(e.currentTarget).find(".query").val();
      return this.filterBy({
        keyword: val
      });
    };

    return TheActualCoFilter;

  })(Backbone.View);
});

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  ppu.TheActualCoDetailView = (function(superClass) {
    extend(TheActualCoDetailView, superClass);

    function TheActualCoDetailView() {
      return TheActualCoDetailView.__super__.constructor.apply(this, arguments);
    }

    TheActualCoDetailView.prototype.el = $("#post-detail");

    TheActualCoDetailView.prototype.template = $("#post-detail-template");

    TheActualCoDetailView.prototype.initialize = function() {
      this.listenTo(this.model, "change", this.render);
      return this.getTitle();
    };

    TheActualCoDetailView.prototype.getTitle = function() {
      return $("#top-bar").html($("#post-detail-title").html());
    };

    TheActualCoDetailView.prototype.render = function() {
      var relatedData, template;
      template = app.compile(this.template);
      this.$el.html(template(this.model.toJSON()));
      this.setUrlTranslation(this.model);
      this.model.get('categories');
      if (this.model.get('categories')[0]) {
        relatedData = {
          category: this.model.get('categories')[0].name,
          without: this.model.id,
          the_actual_co: 1
        };
        return app.pubsub.trigger('posts:getRelated', relatedData);
      }
    };

    return TheActualCoDetailView;

  })(Backbone.View);
  return ppu.TheActualCoRelated = (function(superClass) {
    extend(TheActualCoRelated, superClass);

    function TheActualCoRelated() {
      return TheActualCoRelated.__super__.constructor.apply(this, arguments);
    }

    TheActualCoRelated.prototype.el = $("#posts-related");

    TheActualCoRelated.prototype.initialize = function() {
      this.listenTo(this.collection, 'reset', this.render);
      return app.pubsub.on('posts:getRelated', this.get, this);
    };

    TheActualCoRelated.prototype.get = function(data) {
      return this.collection.fetch({
        reset: true,
        data: data
      });
    };

    TheActualCoRelated.prototype.renderOne = function(model) {
      ppu.postView = new ppu.TheCurrentView({
        model: model
      });
      return this.$el.append(ppu.postView.render().el);
    };

    TheActualCoRelated.prototype.render = function() {
      this.$el.empty();
      if (this.collection.length > 0) {
        $('.related-title').removeClass('hidden');
        return this.collection.each(function(model) {
          return this.renderOne(model);
        }, this);
      }
    };

    return TheActualCoRelated;

  })(Backbone.View);
});

ppu.TheActualChController = {
  index: function() {
    var collection, filters;
    collection = new ppu.Posts;
    collection.fetch({
      reset: true,
      data: {
        published: 1,
        featured_order: "ASC",
        the_actual_ch: 1
      }
    });
    new ppu.TheActualChViews({
      collection: collection
    });
    filters = new ppu.TheActualChFilter;
    return filters.render();
  },
  show: function(slug) {
    ppu.post = new ppu.Post({
      id: slug
    });
    ppu.posts = new ppu.Posts;
    ppu.post.fetch();
    ppu.postDetailView = new ppu.TheActualDetailView({
      model: ppu.post
    });
    return ppu.postsRelated = new ppu.PostsRelated({
      collection: ppu.posts
    });
  }
};

ppu.TheActualCoController = {
  index: function() {
    var collection, filters;
    collection = new ppu.Posts;
    collection.fetch({
      reset: true,
      data: {
        published: 1,
        featured_order: "ASC",
        the_actual_co: 1
      }
    });
    new ppu.TheActualCoViews({
      collection: collection
    });
    filters = new ppu.TheActualCoFilter;
    return filters.render();
  },
  show: function(slug) {
    ppu.post = new ppu.Post({
      id: slug
    });
    ppu.posts = new ppu.Posts;
    ppu.postDetailView = new ppu.TheActualCoDetailView({
      model: ppu.post
    });
    ppu.post.fetch();
    return ppu.postsRelated = new ppu.PostsRelated({
      collection: ppu.posts
    });
  }
};

ppu.PostsController = {
  index: function() {
    ppu.posts = new ppu.Posts;
    ppu.posts.fetch({
      reset: true,
      data: {
        featured_order: "ASC",
        published: 1,
        the_actual_ch: 0,
        the_actual_co: 0
      }
    });
    ppu.postsView = new ppu.PostsView({
      collection: ppu.posts
    });
    ppu.postsFilters = new ppu.PostsFilters;
    ppu.postsFilters.render();
    return ppu.filtersMobile = new ppu.FiltersMobile;
  },
  show: function(slug) {
    ppu.post = new ppu.Post({
      id: slug
    });
    ppu.posts = new ppu.Posts;
    ppu.post.fetch();
    ppu.postDetailView = new ppu.PostDetailView({
      model: ppu.post
    });
    ppu.postsRelated = new ppu.PostsRelated({
      collection: ppu.posts
    });
    return $("#top-bar").html($("#post-detail-title").html());
  }
};

ppu.LawyersController = {
  index: function() {
    ppu.lawyers = new ppu.Lawyers;
    ppu.lawyersView = new ppu.LawyersView({
      collection: ppu.lawyers
    });
    ppu.lawyersFilters = new ppu.LawyersFilters;
    return ppu.filtersMobile = new ppu.FiltersMobile;
  },
  show: function(slug) {
    ppu.lawyer = new ppu.Lawyer({
      id: slug
    });
    ppu.LawyerDetailView = new ppu.LawyerDetailView({
      model: ppu.lawyer
    });
    ppu.lawyer.fetch();
    return $("#top-bar").html($("#lawyer-detail-title").html());
  }
};

ppu.CategoriesController = {
  index: function() {
    ppu.categories = new ppu.Categories;
    ppu.categories.fetch({
      reset: true
    });
    ppu.categoriesView = new ppu.CategoriesView({
      collection: ppu.categories
    });
    return $("#top-bar").html($("#category-title").html());
  },
  show: function(slug) {
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
    ppu.lawyersRelated = new ppu.lawyersRelatedCategory({
      collection: ppu.lawyers
    });
    return $("#top-bar").html($("#category-detail-title").html());
  }
};

ppu.ExperiencesController = {
  index: function() {
    ppu.experiencesFilters = new ppu.ExperiencesFilters;
    ppu.experiencesFilters.render();
    ppu.experiences = new ppu.Experiences;
    ppu.experiences.fetch({
      reset: true
    });
    ppu.experiencesView = new ppu.ExperiencesView({
      collection: ppu.experiences
    });
    return ppu.filtersMobile = new ppu.FiltersMobile;
  },
  show: function(slug) {
    ppu.experience = new ppu.Experience({
      id: slug
    });
    ppu.experience.fetch();
    ppu.experienceDetailView = new ppu.ExperienceDetailView({
      model: ppu.experience
    });
    ppu.experiences = new ppu.Experiences;
    ppu.experienecesRelated = new ppu.ExperienecesRelated({
      collection: ppu.experiences
    });
    return $("#top-bar").html($("#experience-detail-title").html());
  }
};

ppu.curriculumsController = {
  index: function() {
    ppu.curriculum = new ppu.Curriculum;
    return ppu.curriculumCreate = new ppu.CurriculumCreate({
      model: ppu.curriculum
    });
  }
};

ppu.UsController = {
  index: function() {
    var title;
    title = $("#us-title-template").html();
    return $("#top-bar").html(title);
  }
};

ppu.ProbonoController = {
  index: function() {
    var title;
    title = $("#probono-title-template").html();
    return $("#top-bar").html(title);
  }
};

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  ppu.Workspace = (function(superClass) {
    extend(Workspace, superClass);

    function Workspace() {
      return Workspace.__super__.constructor.apply(this, arguments);
    }

    Workspace.prototype.routes = {
      "": "posts",
      "posts": "posts",
      "posts/:slug": "post",
      "abogados": "lawyers",
      "abogados/:slug": "lawyer",
      "experiencias": "experiences",
      "experiencias/:slug": "experience",
      "el-actual": "theActual",
      "el-actual/:slug": "theActualDetail",
      "el-actual-colombia": "theActualCo",
      "el-actual-colombia/:slug": "theActualCoDetail",
      "areas": "areas",
      "areas/:slug": "area",
      "trabaje-con-nosotros": "curriculum",
      "nosotros": "us",
      "probono": "probono"
    };

    Workspace.prototype.initialize = function() {
      new ppu.AppView;
      window.urlTranslation = "";
      ppu.contact = new ppu.Contact;
      return ppu.FooterContactCreate = new ppu.FooterContactCreate({
        model: ppu.contact
      });
    };

    Workspace.prototype.posts = function() {
      return ppu.PostsController.index();
    };

    Workspace.prototype.post = function(slug) {
      return ppu.PostsController.show(slug);
    };

    Workspace.prototype.lawyers = function() {
      return ppu.LawyersController.index();
    };

    Workspace.prototype.lawyer = function(slug) {
      return ppu.LawyersController.show(slug);
    };

    Workspace.prototype.theActual = function() {
      return ppu.TheActualChController.index();
    };

    Workspace.prototype.theActualDetail = function(slug) {
      return ppu.TheActualChController.show(slug);
    };

    Workspace.prototype.theActualCo = function() {
      return ppu.TheActualCoController.index();
    };

    Workspace.prototype.theActualCoDetail = function(slug) {
      return ppu.TheActualCoController.show(slug);
    };

    Workspace.prototype.areas = function() {
      return ppu.CategoriesController.index();
    };

    Workspace.prototype.area = function(slug) {
      return ppu.CategoriesController.show(slug);
    };

    Workspace.prototype.experiences = function() {
      return ppu.ExperiencesController.index();
    };

    Workspace.prototype.experience = function(slug) {
      return ppu.ExperiencesController.show(slug);
    };

    Workspace.prototype.curriculum = function() {
      return ppu.curriculumsController.index();
    };

    Workspace.prototype.us = function() {
      return ppu.UsController.index();
    };

    Workspace.prototype.probono = function() {
      return ppu.ProbonoController.index();
    };

    return Workspace;

  })(Backbone.Router);
  new ppu.Workspace;
  return Backbone.history.start({
    pushState: true
  });
});
