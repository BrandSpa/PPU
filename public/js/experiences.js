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
        data: data
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
      var el, val;
      el = $(e.currentTarget);
      if ($(".countries").find('input[type="checkbox"]:checked').length === 2) {
        return this.filterBy({
          country: ""
        });
      } else {
        if (el.find(":not(:checked)")) {
          val = this.CountryNotChecked(el);
          return this.filterBy({
            country: val
          });
        }
      }
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
