var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  ppu.admin.CategoryCheckbox = (function(superClass) {
    extend(CategoryCheckbox, superClass);

    function CategoryCheckbox() {
      return CategoryCheckbox.__super__.constructor.apply(this, arguments);
    }

    CategoryCheckbox.prototype.template = $("#category-checkbox-template");

    CategoryCheckbox.prototype.className = "checkbox";

    CategoryCheckbox.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      this.$el.html(template(this.model.toJSON()));
      return this;
    };

    return CategoryCheckbox;

  })(Backbone.View);
  return ppu.admin.CategoriesCheckbox = (function(superClass) {
    extend(CategoriesCheckbox, superClass);

    function CategoriesCheckbox() {
      return CategoriesCheckbox.__super__.constructor.apply(this, arguments);
    }

    CategoriesCheckbox.prototype.el = $("#categories-checkbox");

    CategoriesCheckbox.prototype.initialize = function() {
      return this.listenTo(this.collection, 'reset', this.render);
    };

    CategoriesCheckbox.prototype.renderOne = function(model) {
      var view;
      view = new ppu.admin.CategoryCheckbox({
        model: model
      });
      return $("#categories-checkbox").append(view.render().el);
    };

    CategoriesCheckbox.prototype.render = function() {
      return this.collection.each(function(model) {
        return this.renderOne(model);
      }, this);
    };

    return CategoriesCheckbox;

  })(Backbone.View);
});
