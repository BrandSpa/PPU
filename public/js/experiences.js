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
      return this.listenTo(this.collection, 'reset', this.render);
    };

    ExperiencesView.prototype.renderOne = function(model) {
      ppu.experienceView = new ppu.ExperienceView({
        model: model
      });
      return this.$el.append(ppu.experienceView.render().el);
    };

    ExperiencesView.prototype.render = function() {
      return this.collection.each(function(model) {
        return this.renderOne(model);
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
      'keydown .query': 'byQuery'
    };

    ExperiencesFilters.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      return this.$el.html(template);
    };

    ExperiencesFilters.prototype.byPosition = function(e) {
      var val;
      val = $(e.currentTarget).find('select').val();
      return ppu.lawyers.fetch({
        reset: true,
        data: {
          position: val
        }
      });
    };

    ExperiencesFilters.prototype.byCountry = function(e) {
      var val;
      val = $(e.currentTarget).val();
      return ppu.lawyers.fetch({
        reset: true,
        data: {
          country: val
        }
      });
    };

    ExperiencesFilters.prototype.byCategory = function(e) {
      var val;
      val = $(e.currentTarget).find('select').val();
      return ppu.lawyers.fetch({
        reset: true,
        data: {
          category: val
        }
      });
    };

    ExperiencesFilters.prototype.byQuery = function(e) {
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
