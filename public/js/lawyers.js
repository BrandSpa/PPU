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

    LawyersFilters.prototype.el = $('#top-bar');

    LawyersFilters.prototype.template = $("#lawyers-filter");

    LawyersFilters.prototype.events = {
      'change .position': 'byPosition',
      'change .country': 'byCountry',
      'change .category': 'byCategory',
      'keydown .query': 'byQuery'
    };

    LawyersFilters.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      return this.$el.html(template);
    };

    LawyersFilters.prototype.byPosition = function(e) {
      var val;
      val = $(e.currentTarget).val();
      return ppu.lawyers.fetch({
        reset: true,
        data: {
          position: val
        }
      });
    };

    LawyersFilters.prototype.byCountry = function(e) {
      var val;
      val = $(e.currentTarget).val();
      return ppu.lawyers.fetch({
        reset: true,
        data: {
          country: val
        }
      });
    };

    LawyersFilters.prototype.byCategory = function(e) {
      var val;
      val = $(e.currentTarget).find('select').val();
      return ppu.lawyers.fetch({
        reset: true,
        data: {
          category: val
        }
      });
    };

    LawyersFilters.prototype.byQuery = function(e) {
      var val;
      val = $(e.currentTarget).val();
      if (val.length >= 3) {
        return ppu.lawyers.fetch({
          reset: true,
          data: {
            keyword: val
          }
        });
      }
    };

    return LawyersFilters;

  })(Backbone.View);
  return ppu.LawyerDetailView = (function(_super) {
    __extends(LawyerDetailView, _super);

    function LawyerDetailView() {
      return LawyerDetailView.__super__.constructor.apply(this, arguments);
    }

    LawyerDetailView.prototype.el = $('#lawyer');

    LawyerDetailView.prototype.template = $('#lawyer-template');

    LawyerDetailView.prototype.initialize = function() {
      return this.listenTo(this.collection, 'reset', this.render);
    };

    LawyerDetailView.prototype.render = function() {
      return this.collection.each(function(model) {
        var template;
        template = app.compile(this.template);
        return $(this.el).html(template(model.toJSON()));
      }, this);
    };

    return LawyerDetailView;

  })(Backbone.View);
});
