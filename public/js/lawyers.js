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
      var order;
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'add', this.renderOne);
      order = this.order_by();
      this.collection.fetch({
        reset: true,
        data: order
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

    LawyersView.prototype.order_by = function() {
      if (app.lang === "en") {
        return {
          order_by_english: true
        };
      } else {
        return {
          order_by_spanish: true
        };
      }
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
      $(this.el).html('');
      return this.collection.each(function(model) {
        return this.renderOne(model);
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

    LawyersFilters.prototype.offset = 20;

    LawyersFilters.prototype.events = {
      'change .position': 'byPosition',
      'change .country': 'byCountry',
      'change .category': 'byCategory',
      'keyup .query': 'byQuery',
      'submit .search': 'bySearch'
    };

    LawyersFilters.prototype.initialize = function() {
      this.render();
      this.filtersAplied = {
        lang: app.lang
      };
      this.order_by();
      this.$el.data("filtersAplied", this.filtersAplied);
      app.pubsub.on("general:scroll", this.paginate, this);
      return app.pubsub.trigger("filters:showPosition");
    };

    LawyersFilters.prototype.order_by = function() {
      if (app.lang === "en") {
        return _.extend(this.filtersAplied, {
          order_by_english: true
        });
      } else {
        return _.extend(this.filtersAplied, {
          order_by_spanish: true
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
        data: data
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
      var data, el, val, value;
      el = $(e.currentTarget);
      if ($(".countries").find('input[type="checkbox"]:checked').length === 2) {
        data = _.extend(this.filtersAplied, {
          paginate: 0,
          country: ""
        });
        return ppu.lawyers.fetch({
          reset: true,
          data: data
        });
      } else {
        if (el.find(":not(:checked)")) {
          value = el.val();
        }
        if (value === "Colombia") {
          val = "Chile";
        } else {
          val = "Colombia";
        }
        $(".countries").find("input[value='" + val + "']").prop('checked', true);
        data = _.extend(this.filtersAplied, {
          paginate: 0,
          country: val
        });
        return ppu.lawyers.fetch({
          reset: true,
          data: data
        });
      }
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
  ppu.LawyerDetailView = (function(_super) {
    __extends(LawyerDetailView, _super);

    function LawyerDetailView() {
      return LawyerDetailView.__super__.constructor.apply(this, arguments);
    }

    LawyerDetailView.prototype.el = $('#lawyer');

    LawyerDetailView.prototype.template = $('#lawyer-template');

    LawyerDetailView.prototype.initialize = function() {
      this.listenTo(this.model, 'change', this.render);
      this.getTitle();
      return this.model.fetch();
    };

    LawyerDetailView.prototype.getTitle = function() {
      return $("#top-bar").html($("#lawyer-detail-title").html());
    };

    LawyerDetailView.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      return $(this.el).html(template(this.model.toJSON()));
    };

    return LawyerDetailView;

  })(Backbone.View);
  return ppu.lawyersRelatedCategory = (function(_super) {
    __extends(lawyersRelatedCategory, _super);

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
