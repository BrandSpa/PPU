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
      return this.listenTo(this.collection, 'add', this.addOne, this);
    };

    ExperiencesView.prototype.addOne = function(model) {
      var view;
      view = new ppu.admin.ExperienceView({
        model: model
      });
      return $(this.el).find('thead').append(view.render().el);
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
          keyword: query
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
