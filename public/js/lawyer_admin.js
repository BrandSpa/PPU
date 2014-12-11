var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
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
  ppu.LawyersDashboard = (function(_super) {
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
  ppu.LawyerCreateForm = (function(_super) {
    __extends(LawyerCreateForm, _super);

    function LawyerCreateForm() {
      return LawyerCreateForm.__super__.constructor.apply(this, arguments);
    }

    LawyerCreateForm.prototype.el = $("#lawyer-form-create");

    LawyerCreateForm.prototype.template = $("#lawyer-form-template");

    LawyerCreateForm.prototype.events = {
      "change .change-level": 'toggleDescription'
    };

    LawyerCreateForm.prototype.initialize = function() {
      this.listenTo(this.model, "error", this.renderErrors, this);
      this.listenTo(this.model, "error", this.toErrors, this);
      this.listenTo(this.model, "sync", this.stored, this);
      this.render();
      this.getCategories();
      return this.changeLang();
    };

    LawyerCreateForm.prototype.render = function() {
      var source, template;
      source = this.template.html();
      template = Handlebars.compile(source);
      return $(this.el).find('.panel-body').html(template());
    };

    LawyerCreateForm.prototype.getCategories = function() {
      ppu.categories = new ppu.Categories;
      return ppu.categories.fetch().done(function(collection) {
        var source, template;
        source = $('#lawyer-categories-template').html();
        template = Handlebars.compile(source);
        return $('#lawyer-list-categories').html(template(collection));
      });
    };

    LawyerCreateForm.prototype.toggleDescription = function(e) {
      var el, val;
      el = $(e.currentTarget);
      val = el.val();
      if (val >= 6) {
        return $('.lawyer-description').removeClass('hidden').hide().slideDown();
      } else {
        return $('.lawyer-description').fadeOut();
      }
    };

    LawyerCreateForm.prototype.changeLang = function() {
      if (lang === 'en') {
        return $('.lawyer-lang option:eq(2)').prop('selected', true);
      } else {
        return $('.lawyer-lang option:eq(1)').prop('selected', true);
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
      var id;
      id = model.id;
      ppu.lawyerLanguageCreate.store(id);
      ppu.lawyerEducationCreate.store(id);
      ppu.lawyerJobCreate.store(id);
      ppu.lawyerRecognitionCreate.store(id);
      ppu.lawyerInstitutionCreate.store(id);
      ppu.lawyerAwardCreate.store(id);
      ppu.lawyerArticleCreate.store(id);
      ppu.lawyerPharaseCreate.store(id);
      return window.location = "/dashboard";
    };

    return LawyerCreateForm;

  })(Backbone.View);
  ppu.LawyerCreate = (function(_super) {
    __extends(LawyerCreate, _super);

    function LawyerCreate() {
      return LawyerCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerCreate.prototype.el = $("#lawyer-create");

    LawyerCreate.prototype.events = {
      'click .lawyer-store': 'store',
      'change .lawyer-lang': 'changeLang',
      "keydown .form-control": "removeError",
      "change .form-control": "removeError"
    };

    LawyerCreate.prototype.initialize = function() {
      return ppu.appendDatePickerYear(this.el);
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
      e.preventDefault();
      return ppu.lawyerCreateForm.store();
    };

    LawyerCreate.prototype.stored = function(model) {};

    return LawyerCreate;

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
      return ppu.categories.fetch().done(function(collection) {
        var source, template;
        source = $('#lawyer-categories-template').html();
        template = Handlebars.compile(source);
        $(el).find('#lawyer-list-categories').html(template(collection));
        return _.each(categories, function(category) {
          return $(el).find("#lawyer-list-categories input[value='" + category.id + "']").attr("checked", "checked");
        });
      });
    };

    lawyerEdit.prototype.render = function() {
      var source, t;
      source = this.template.html();
      t = Handlebars.compile(source);
      $(this.el).find('.modal-body').html(t(this.model.toJSON()));
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
  return ppu.LawyerFinish = (function(_super) {
    __extends(LawyerFinish, _super);

    function LawyerFinish() {
      return LawyerFinish.__super__.constructor.apply(this, arguments);
    }

    LawyerFinish.prototype.el = $('.container-lawyer');

    LawyerFinish.prototype.template = $('#lawyer-show-template');

    LawyerFinish.prototype.events = {
      'click .open-edit-lawyer': 'openEdit'
    };

    LawyerFinish.prototype.initialize = function() {
      return this.listenTo(this.model, 'change', this.render);
    };

    LawyerFinish.prototype.render = function() {
      var source, t;
      source = this.template.html();
      t = Handlebars.compile(source);
      $(this.el).html(t(this.model.toJSON()));
      $("#lawyer-finish").removeClass("hidden");
      this.$el.append('<a href="#" class="btn btn-info open-edit-lawyer">Editar</a>');
      return this.getRelationships(this.model.get('id'));
    };

    LawyerFinish.prototype.getRelationships = function(id) {
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
      return mixins.renderCollection(ppu.LawyerAwards, ppu.LawyerAwardsEdit, {
        lawyer_id: id
      });
    };

    LawyerFinish.prototype.openEdit = function(e) {
      var view;
      e.preventDefault();
      view = new ppu.lawyerEdit({
        model: this.model
      });
      return view.render();
    };

    return LawyerFinish;

  })(Backbone.View);
});
