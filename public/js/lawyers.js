var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.Lawyer = (function(_super) {
    __extends(Lawyer, _super);

    function Lawyer() {
      return Lawyer.__super__.constructor.apply(this, arguments);
    }

    Lawyer.prototype.urlRoot = "/api/lawyers";

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

    LawyerView.prototype.className = 'lawyer-list';

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
      return this.listenTo(this.collection, 'reset', this.render);
    };

    LawyersView.prototype.render = function() {
      $(this.el).html('');
      return this.collection.each(function(model) {
        var view;
        view = new ppu.LawyerView({
          model: model
        });
        return $(this.el).append(view.render().el).hide().fadeIn('slow');
      }, this);
    };

    return LawyersView;

  })(Backbone.View);
  ppu.LawyersFilters = (function(_super) {
    __extends(LawyersFilters, _super);

    function LawyersFilters() {
      return LawyersFilters.__super__.constructor.apply(this, arguments);
    }

    LawyersFilters.prototype.el = $('#lawyers-filters');

    LawyersFilters.prototype.events = {
      'change .position': 'byPosition',
      'change .country': 'byCountry',
      'submit .search': 'byQuery'
    };

    LawyersFilters.prototype.byPosition = function(e) {
      var el, position;
      el = $(e.currentTarget);
      position = el.val();
      return ppu.lawyers.fetch({
        reset: true,
        data: {
          position: position
        }
      });
    };

    LawyersFilters.prototype.byCountry = function(e) {
      var country, el;
      el = $(e.currentTarget);
      country = el.val();
      return ppu.lawyers.fetch({
        reset: true,
        data: {
          country: country
        }
      });
    };

    return LawyersFilters;

  })(Backbone.View);
  ppu.LawyerDetailView = (function(_super) {
    __extends(LawyerDetailView, _super);

    function LawyerDetailView() {
      return LawyerDetailView.__super__.constructor.apply(this, arguments);
    }

    LawyerDetailView.prototype.el = $('#lawyer-detail');

    LawyerDetailView.prototype.template = $('#lawyer-show-template');

    LawyerDetailView.prototype.initialize = function() {
      return this.listenTo(this.model, 'change', this.render);
    };

    LawyerDetailView.prototype.render = function() {
      var compile, source;
      source = this.template.html();
      compile = Handlebars.compile(source);
      return $(this.el).html(t(this.model.toJSON()));
    };

    return LawyerDetailView;

  })(Backbone.View);
  ppu.LawyerCreate = (function(_super) {
    __extends(LawyerCreate, _super);

    function LawyerCreate() {
      return LawyerCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerCreate.prototype.el = $("#lawyer-create");

    LawyerCreate.prototype.events = {
      'click .lawyer-store': 'store',
      'change .lawyer-lang': 'changeLang'
    };

    LawyerCreate.prototype.initialize = function() {
      this.listenTo(this.model, 'error', this.showErrors);
      this.listenTo(this.model, 'sync', this.stored);
      this.getCategories();
      return ppu.appendDatePickerYear;
    };

    LawyerCreate.prototype.getCategories = function() {
      ppu.categories = new ppu.Categories;
      return ppu.categories.fetch().done(function(collection) {
        var source, template;
        source = $('#lawyer-categories-template').html();
        template = Handlebars.compile(source);
        return $('#lawyer-list-categories').html(template(collection));
      });
    };

    LawyerCreate.prototype.changeLang = function(e) {
      var el;
      el = $(e.currentTarget);
      if (el.val() === 'en') {
        return window.location = '/en/crear-abogado';
      } else {
        return window.location = '/crear-abogado';
      }
    };

    LawyerCreate.prototype.store = function(e) {
      var $forms, datas, options;
      e.preventDefault();
      $forms = $("#lawyer-form-create").find('form');
      console.log($forms);
      datas = new FormData($forms[0]);
      options = ppu.ajaxOptions("POST", datas);
      return this.model.save(datas, $.extend({}, options));
    };

    LawyerCreate.prototype.stored = function(model) {
      var id;
      id = model.id;
      return ppu.lawyerEducationCreate.store(id);
    };

    return LawyerCreate;

  })(Backbone.View);
  ppu.LawyerFinish = (function(_super) {
    __extends(LawyerFinish, _super);

    function LawyerFinish() {
      return LawyerFinish.__super__.constructor.apply(this, arguments);
    }

    LawyerFinish.prototype.el = $('#lawyer-finish');

    LawyerFinish.prototype.template = $('#lawyer-finish-template');

    LawyerFinish.prototype.events = {
      'click .lawyer-save-img': 'uploadPhoto'
    };

    LawyerFinish.prototype.initialize = function() {
      return this.listenTo(this.model, 'change', this.render);
    };

    LawyerFinish.prototype.render = function() {
      var source, t;
      source = this.template.html();
      t = Handlebars.compile(source);
      $(this.el).find(".panel-body").html(t(this.model.toJSON()));
      return $(this.el).removeClass("hidden");
    };

    LawyerFinish.prototype.uploadPhoto = function(e) {
      var $forms;
      e.preventDefault();
      $forms = $(this.el).find("form");
      return $forms.each(function(index) {
        var datas, model, options;
        model = new ppu.LawyerAward;
        datas = new FormData($forms[index]);
        datas.append("fields[lawyer_id]", 6);
        options = ppu.ajaxOptions("POST", datas);
        return model.save(datas, $.extend({}, options));
      });
    };

    LawyerFinish.prototype.openUploadPhoto = function(e) {
      var el, id, view;
      e.preventDefault();
      el = $(e.currentTarget);
      id = el.data('lawyer');
      view = new ppu.LawyerImageUpload;
      return view.render(id);
    };

    return LawyerFinish;

  })(Backbone.View);
  ppu.LawyerImageUpload = (function(_super) {
    __extends(LawyerImageUpload, _super);

    function LawyerImageUpload() {
      return LawyerImageUpload.__super__.constructor.apply(this, arguments);
    }

    LawyerImageUpload.prototype.el = $('#lawyer-upload-image-modal');

    LawyerImageUpload.prototype.render = function(id) {
      var t;
      t = this;
      $(this.el).modal({
        backdrop: 'static'
      });
      $(this.el).find('input[name="lawyer_id"]').val(id);
      ppu.mediaDropzone = new Dropzone("#media-dropzone");
      return ppu.mediaDropzone.on("success", function(file, responseText) {
        console.log(responseText);
        ppu.lawyerFinish.set(responseText);
        return t.closeModal();
      });
    };

    return LawyerImageUpload;

  })(Backbone.View);
  ppu.LawyerArticleUpload = (function(_super) {
    __extends(LawyerArticleUpload, _super);

    function LawyerArticleUpload() {
      return LawyerArticleUpload.__super__.constructor.apply(this, arguments);
    }

    LawyerArticleUpload.prototype.el = $('#lawyer-upload-image-modal');

    LawyerArticleUpload.prototype.render = function(id) {
      var t;
      t = this;
      $(this.el).modal({
        backdrop: 'static'
      });
      $(this.el).find('input[name="lawyer_id"]').val(id);
      ppu.mediaDropzone = new Dropzone("#media-dropzone");
      return ppu.mediaDropzone.on("success", function(file, responseText) {
        return t.closeModal();
      });
    };

    return LawyerArticleUpload;

  })(Backbone.View);
  ppu.LawyerDashboard = (function(_super) {
    __extends(LawyerDashboard, _super);

    function LawyerDashboard() {
      return LawyerDashboard.__super__.constructor.apply(this, arguments);
    }

    LawyerDashboard.prototype.tagName = 'tr';

    LawyerDashboard.prototype.template = $('#lawyer-dashbord-template');

    LawyerDashboard.prototype.initialize = function() {
      this.listenTo(this.model, 'change', this.render);
      return this.listenTo(this.model, 'error', this.showErrors);
    };

    LawyerDashboard.prototype.render = function() {
      var source, t;
      source = this.template.html();
      t = Handlebars.compile(source);
      $(this.el).html(t(this.model.toJSON()));
      return this;
    };

    return LawyerDashboard;

  })(Backbone.View);
  return ppu.LawyersDashboard = (function(_super) {
    __extends(LawyersDashboard, _super);

    function LawyersDashboard() {
      return LawyersDashboard.__super__.constructor.apply(this, arguments);
    }

    LawyersDashboard.prototype.el = $('#lawyers-dashboard');

    LawyersDashboard.prototype.events = {
      'click .lawyer-see-more': 'seeMore',
      'submit .lawyer-search': 'search',
      'change .lawyer-filter-lang': 'filterLang',
      'change .lawyer-filter-country': 'filterCountry',
      'change .lawyer-filter-position': 'filterPosition'
    };

    LawyersDashboard.prototype.initialize = function() {
      this.listenTo(this.collection, 'reset', this.render);
      return this.listenTo(this.collection, 'add', this.addOne, this);
    };

    LawyersDashboard.prototype.addOne = function(model) {
      var view;
      view = new ppu.LawyerDashboard({
        model: model
      });
      return $(this.el).find('thead').append(view.render().el);
    };

    LawyersDashboard.prototype.render = function() {
      $(this.el).find('tbody').html('');
      return this.collection.each(function(model) {
        var view;
        view = new ppu.LawyerDashboard({
          model: model
        });
        return $(this.el).find('tbody').append(view.render().el);
      }, this);
    };

    LawyersDashboard.prototype.seeMore = function(e) {
      var el, more, offset;
      e.preventDefault();
      el = e.currentTarget;
      offset = $(el).data('offset');
      more = offset + 10;
      this.collection.fetch({
        data: {
          offset: more
        }
      });
      return $(el).data('offset', more);
    };

    LawyersDashboard.prototype.search = function(e) {
      var query;
      e.preventDefault();
      query = $('input[name="query"]').val();
      return this.collection.fetch({
        reset: true,
        data: {
          keyword: query
        }
      });
    };

    LawyersDashboard.prototype.filterLang = function(e) {
      var el;
      el = $(e.currentTarget);
      return this.collection.fetch({
        reset: true,
        data: {
          lang: el.val()
        }
      });
    };

    LawyersDashboard.prototype.filterCountry = function(e) {
      var el;
      el = $(e.currentTarget);
      return this.collection.fetch({
        reset: true,
        data: {
          country: el.val()
        }
      });
    };

    LawyersDashboard.prototype.filterPosition = function(e) {
      var el;
      el = $(e.currentTarget);
      return this.collection.fetch({
        reset: true,
        data: {
          position: el.val()
        }
      });
    };

    return LawyersDashboard;

  })(Backbone.View);
});
