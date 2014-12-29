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
      "click .translate": "translate"
    };

    LawyerView.prototype.initialize = function() {
      this.listenTo(this.model, 'change', this.render);
      return this.listenTo(this.model, 'error', this.showErrors);
    };

    LawyerView.prototype.render = function() {
      var source, t;
      source = this.template.html();
      t = Handlebars.compile(source);
      $(this.el).html(t(this.model.toJSON()));
      return this;
    };

    LawyerView.prototype.translate = function(e) {
      e.preventDefault();
      return this.model.save({
        duplicate: true
      }).done(function(mod) {
        return window.location = "en/admin/lawyers/" + mod.id + "/edit";
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

    LawyersView.prototype.events = {
      'click .lawyer-see-more': 'seeMore',
      'keyup .query': 'search',
      'change .lawyer-filter-lang': 'filterLang',
      'change .lawyer-filter-country': 'filterCountry',
      'change .lawyer-filter-category': 'filterCategory',
      'change .lawyer-filter-position': 'filterPosition'
    };

    LawyersView.prototype.initialize = function() {
      this.listenTo(this.collection, 'reset', this.render);
      return this.listenTo(this.collection, 'add', this.addOne, this);
    };

    LawyersView.prototype.addOne = function(model) {
      var view;
      view = new ppu.admin.LawyerView({
        model: model
      });
      return $(this.el).find('thead').append(view.render().el);
    };

    LawyersView.prototype.render = function() {
      $(this.el).find('tbody').html('');
      return this.collection.each(function(model) {
        var view;
        view = new ppu.admin.LawyerView({
          model: model
        });
        return $(this.el).find('tbody').append(view.render().el);
      }, this);
    };

    LawyersView.prototype.seeMore = function(e) {
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

    LawyersView.prototype.search = function(e) {
      var query;
      e.preventDefault();
      query = $(e.currentTarget).val();
      if (query.length >= 3) {
        return this.collection.fetch({
          reset: true,
          data: {
            keyword: query
          }
        });
      }
    };

    LawyersView.prototype.getSelectVal = function(e) {
      return $(e.currentTarget).val();
    };

    LawyersView.prototype.byFilter = function(data) {
      return this.collection.fetch({
        reset: true,
        data: data
      });
    };

    LawyersView.prototype.filterLang = function(e) {
      var val;
      val = this.getSelectVal(e);
      return this.byFilter({
        lang: val
      });
    };

    LawyersView.prototype.filterCountry = function(e) {
      var val;
      val = this.getSelectVal(e);
      return this.byFilter({
        country: val
      });
    };

    LawyersView.prototype.filterPosition = function(e) {
      return this.byFilter({
        position: this.getSelectVal(e)
      });
    };

    LawyersView.prototype.filterCategory = function(e) {
      var val;
      val = $(e.currentTarget).val();
      return ppu.lawyers.fetch({
        reset: true,
        data: {
          category: val
        }
      });
    };

    return LawyersView;

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
      "change .change-position": 'toggleDescriptionByPosition'
    };

    LawyerCreateForm.prototype.initialize = function() {
      this.listenTo(this.model, "error", this.renderErrors, this);
      this.listenTo(this.model, "error", this.toErrors, this);
      this.listenTo(this.model, "sync", this.stored, this);
      this.render();
      return this.getCategories();
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
      if (val === "Senior Counsel" || val === "Especialista") {
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
      var id;
      id = model.id;
      ppu.lawyerLanguageCreate.store(id);
      ppu.lawyerEducationCreate.store(id);
      ppu.lawyerJobCreate.store(id);
      ppu.lawyerRecognitionCreate.store(id);
      ppu.lawyerInstitutionCreate.store(id);
      ppu.lawyerAcademicCreate.store(id);
      ppu.lawyerAwardCreate.store(id);
      ppu.lawyerArticleCreate.store(id);
      ppu.lawyerPharaseCreate.store(id);
      return window.location = "/admin/lawyers/" + id + "/edit";
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
        $(el).find('#lawyer-list-categories').html(template(collection));
        return _.each(categories, function(category) {
          return $(el).find("#lawyer-list-categories input[value='" + category.id + "']").attr("checked", "checked");
        });
      });
    };

    lawyerEdit.prototype.render = function() {
      var el, source, t;
      el = $("#lawyer-edit-modal");
      source = this.template.html();
      t = Handlebars.compile(source);
      $(this.el).find('.modal-body').html(t(this.model.toJSON()));
      if (this.model.get('level') >= 6) {
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
  return ppu.LawyerEditView = (function(_super) {
    __extends(LawyerEditView, _super);

    function LawyerEditView() {
      return LawyerEditView.__super__.constructor.apply(this, arguments);
    }

    LawyerEditView.prototype.el = $('.container-lawyer');

    LawyerEditView.prototype.template = $('#lawyer-template');

    LawyerEditView.prototype.events = {
      'click .open-edit-lawyer': 'openEdit',
      'click .open-share': 'openShare'
    };

    LawyerEditView.prototype.initialize = function() {
      this.listenTo(this.model, 'change', this.render);
      return this.listenTo(this.model, 'change', this.renderCategories);
    };

    LawyerEditView.prototype.render = function() {
      var id, source, t;
      id = this.model.get('id');
      source = this.template.html();
      t = Handlebars.compile(source);
      $(this.el).html(t(this.model.toJSON()));
      $("#lawyer-finish").removeClass("hidden");
      ppu.currentLawyerId = id;
      this.appendButtons();
      return this.getRelationships(id);
    };

    LawyerEditView.prototype.renderCategories = function() {
      var source, t;
      source = $("#lawyer-category-template").html();
      t = Handlebars.compile(source);
      return $("#lawyer-category-edit").find('ul').html(t(this.model.toJSON()));
    };

    LawyerEditView.prototype.appendButtons = function() {
      return this.$el.append('<a href="#" class="btn btn-info open-edit-lawyer">Editar información & áreas</a>');
    };

    LawyerEditView.prototype.getRelationships = function(id) {
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

    LawyerEditView.prototype.openEdit = function(e) {
      var view;
      e.preventDefault();
      view = new ppu.lawyerEdit({
        model: this.model
      });
      return view.render();
    };

    LawyerEditView.prototype.openShare = function(e) {
      return $('#share-modal').modal();
    };

    return LawyerEditView;

  })(Backbone.View);
});
