var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  ppu.admin.LawyerView = (function(superClass) {
    extend(LawyerView, superClass);

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
      v = new ppu.lawyerConfirmTranslate;
      return v.render();
    };

    LawyerView.prototype.translate = function(e) {
      var id;
      id = this.model.id;
      return $.post("/api/lawyers/" + id + "/duplicate").done(function(model) {
        return window.location = "/en/admin/lawyers/" + mod.id + "/edit";
      });
    };

    return LawyerView;

  })(Backbone.View);
  ppu.admin.LawyersView = (function(superClass) {
    extend(LawyersView, superClass);

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
  ppu.admin.LawyersFilters = (function(superClass) {
    extend(LawyersFilters, superClass);

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
  ppu.LawyerCreateForm = (function(superClass) {
    extend(LawyerCreateForm, superClass);

    function LawyerCreateForm() {
      return LawyerCreateForm.__super__.constructor.apply(this, arguments);
    }

    LawyerCreateForm.prototype.el = $("#lawyer-form-create");

    LawyerCreateForm.prototype.template = $("#lawyer-form-template");

    LawyerCreateForm.prototype.events = {
      "change .change-level": 'toggleDescriptionByLevel',
      "change .change-position": 'toggleDescriptionByPosition',
      "change .change-position": 'toggleDescriptionByPosition',
      "click .publish": "publish",
      "click .unpublish": "unpublish"
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

    LawyerCreateForm.prototype.publish = function(e) {
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

    LawyerCreateForm.prototype.unpublish = function(e) {
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

    return LawyerCreateForm;

  })(Backbone.View);
  ppu.LawyerCreateView = (function(superClass) {
    extend(LawyerCreateView, superClass);

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
  ppu.lawyerEdit = (function(superClass) {
    extend(lawyerEdit, superClass);

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
  ppu.LawyerEditView = (function(superClass) {
    extend(LawyerEditView, superClass);

    function LawyerEditView() {
      return LawyerEditView.__super__.constructor.apply(this, arguments);
    }

    LawyerEditView.prototype.el = $('.container-lawyer');

    LawyerEditView.prototype.template = $('#lawyer-template');

    LawyerEditView.prototype.events = {
      'click .open-edit-lawyer': 'openEdit',
      'click .open-share': 'openShare',
      "click .confirm-translate": "confirmTranslate",
      "click .translate": "translate",
      "click .publish": "publish",
      "click .unpublish": "unpublish"
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
      var id;
      id = this.model.id;
      return $.post("/api/lawyers/" + id + "/duplicate").done(function(model) {
        return window.location = "/en/admin/lawyers/" + model.id + "/edit";
      });
    };

    LawyerEditView.prototype.openShare = function(e) {
      return $('#share-modal').modal();
    };

    LawyerEditView.prototype.publish = function(e) {
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

    LawyerEditView.prototype.unpublish = function(e) {
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

    return LawyerEditView;

  })(Backbone.View);
  return ppu.lawyerConfirmTranslate = (function(superClass) {
    extend(lawyerConfirmTranslate, superClass);

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
