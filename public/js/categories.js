var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.Category = (function(_super) {
    __extends(Category, _super);

    function Category() {
      return Category.__super__.constructor.apply(this, arguments);
    }

    Category.prototype.urlRoot = '/api/categories';

    return Category;

  })(Backbone.Model);
  ppu.Categories = (function(_super) {
    __extends(Categories, _super);

    function Categories() {
      return Categories.__super__.constructor.apply(this, arguments);
    }

    Categories.prototype.url = '/api/categories';

    Categories.prototype.model = ppu.Category;

    return Categories;

  })(Backbone.Collection);
  ppu.CategoryView = (function(_super) {
    __extends(CategoryView, _super);

    function CategoryView() {
      return CategoryView.__super__.constructor.apply(this, arguments);
    }

    CategoryView.prototype.template = $("#category-template");

    CategoryView.prototype.className = "col-md-6 col-sm-6 col-xs-12 category-item";

    CategoryView.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      $(this.el).html(template(this.model.toJSON()));
      return this;
    };

    return CategoryView;

  })(Backbone.View);
  ppu.CategoriesView = (function(_super) {
    __extends(CategoriesView, _super);

    function CategoriesView() {
      return CategoriesView.__super__.constructor.apply(this, arguments);
    }

    CategoriesView.prototype.el = $("#categories");

    CategoriesView.prototype.initialize = function() {
      this.listenTo(this.collection, 'reset', this.render);
      return this.getTitle();
    };

    CategoriesView.prototype.getTitle = function() {
      return $("#top-bar").html($("#category-title").html());
    };

    CategoriesView.prototype.renderOne = function(model) {
      ppu.categoryView = new ppu.CategoryView({
        model: model
      });
      return this.$el.append(ppu.categoryView.render().el);
    };

    CategoriesView.prototype.render = function() {
      return this.collection.each(function(model) {
        return this.renderOne(model);
      }, this);
    };

    return CategoriesView;

  })(Backbone.View);
  ppu.CategoryDetail = (function(_super) {
    __extends(CategoryDetail, _super);

    function CategoryDetail() {
      return CategoryDetail.__super__.constructor.apply(this, arguments);
    }

    CategoryDetail.prototype.el = $("#category");

    CategoryDetail.prototype.template = $("#category-detail-template");

    CategoryDetail.prototype.initialize = function() {
      this.listenTo(this.model, "change", this.render);
      return this.getTitle();
    };

    CategoryDetail.prototype.getTitle = function() {
      return $("#top-bar").html($("#category-detail-title").html());
    };

    CategoryDetail.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      this.$el.html(template(this.model.toJSON()));
      this.setUrlTranslation(this.model);
      app.pubsub.trigger("categories:list");
      return app.pubsub.trigger("lawyers:related", this.model.get("name"));
    };

    return CategoryDetail;

  })(Backbone.View);
  return ppu.CategoriesList = (function(_super) {
    __extends(CategoriesList, _super);

    function CategoriesList() {
      return CategoriesList.__super__.constructor.apply(this, arguments);
    }

    CategoriesList.prototype.el = $("#categories-list");

    CategoriesList.prototype.template = $("#categories-list-template");

    CategoriesList.prototype.initialize = function() {
      this.listenTo(this.collection, "reset", this.render);
      return app.pubsub.bind("categories:list", this.getAll, this);
    };

    CategoriesList.prototype.getAll = function() {
      return ppu.categories.fetch({
        reset: true
      });
    };

    CategoriesList.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      $("#categories-list").html(template(this.collection.toJSON()));
      return console.log($("#categories-list").html());
    };

    return CategoriesList;

  })(Backbone.View);
});
