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
      'click .lawyer-add-education': 'addEducation',
      'click .lawyer-add-job': 'addJob',
      'click .lawyer-add-recognition': 'addRecognition',
      'click .lawyer-add-institution': 'addInstitution',
      'click .lawyer-add-langs': 'addLang',
      'click .lawyer-add-pharase': 'addPharase',
      'change .lawyer-lang': 'changeLang'
    };

    LawyerCreate.prototype.initialize = function() {
      this.listenTo(this.model, 'error', this.showErrors);
      this.listenTo(this.model, 'sync', this.stored);
      this.getCategories();
      return this.appendDatePicker();
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

    LawyerCreate.prototype.getCategories = function() {
      var categories, source, template;
      categories = new ppu.Categories;
      source = $("#lawyer-categories-template").html();
      template = Handlebars.compile(source);
      return categories.fetch().done(function(collection) {
        return $("#lawyer-list-categories").html(template(collection));
      });
    };

    LawyerCreate.prototype.appendDatePicker = function() {
      return $(document).find('.datepicker-year').datepicker({
        format: 'yyyy',
        viewMode: "years",
        minViewMode: "years",
        language: 'es',
        autoclose: true
      });
    };

    LawyerCreate.prototype.addEducation = function(e) {
      var el, source;
      e.preventDefault();
      el = $(e.currentTarget);
      source = $("#lawyer-form-education-template").html();
      el.parent().before(source);
      return this.appendDatePicker();
    };

    LawyerCreate.prototype.addJob = function(e) {
      var el, source;
      e.preventDefault();
      el = $(e.currentTarget);
      source = $("#lawyer-form-job-template").html();
      el.parent().before(source);
      return this.appendDatePicker();
    };

    LawyerCreate.prototype.addRecognition = function(e) {
      var el, source;
      e.preventDefault();
      el = $(e.currentTarget);
      source = $("#lawyer-form-recognition-template").html();
      el.parent().before(source);
      return this.appendDatePicker();
    };

    LawyerCreate.prototype.addInstitution = function(e) {
      var el, source;
      e.preventDefault();
      el = $(e.currentTarget);
      source = $("#lawyer-form-institution-template").html();
      el.parent().before(source);
      return this.appendDatePicker();
    };

    LawyerCreate.prototype.addLang = function(e) {
      var el, source;
      e.preventDefault();
      el = $(e.currentTarget);
      source = $("#lawyer-form-langs-template").html();
      el.parent().before(source);
      return this.appendDatePicker();
    };

    LawyerCreate.prototype.addPharase = function(e) {
      var el, source;
      e.preventDefault();
      el = $(e.currentTarget);
      source = $("#lawyer-form-pharase-template").html();
      el.parent().before(source);
      return this.appendDatePicker();
    };

    LawyerCreate.prototype.store = function(e) {
      var data;
      e.preventDefault();
      data = $(document).find(this.el).find('form').serializeJSON();
      return this.model.save(data);
    };

    LawyerCreate.prototype.stored = function(model) {
      var id, new_model, view;
      id = model.id;
      new_model = new ppu.Lawyer({
        id: id
      });
      new_model.fetch();
      view = new ppu.LawyerFinish({
        model: new_model
      });
      return $(this.el).fadeOut().remove();
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

    return LawyerFinish;

  })(Backbone.View);
  return ppu.LawyerImageUpload = (function(_super) {
    __extends(LawyerImageUpload, _super);

    function LawyerImageUpload() {
      return LawyerImageUpload.__super__.constructor.apply(this, arguments);
    }

    LawyerImageUpload.prototype.el = $('#lawyer-upload-image-modal');

    LawyerImageUpload.prototype.render = function() {
      $(this.el).modal({
        backdrop: 'static'
      });
      ppu.mediaDropzone = new Dropzone("#media-dropzone");
      return ppu.mediaDropzone.on("success", function(file, responseText) {
        return console.log(responseText);
      });
    };

    return LawyerImageUpload;

  })(Backbone.View);
});
