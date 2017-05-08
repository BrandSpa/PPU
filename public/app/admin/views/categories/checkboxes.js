ppu.admin.CategoriesCheckbox = (function(superClass) {
  extend(CategoriesCheckbox, superClass);

  function CategoriesCheckbox() {
    return CategoriesCheckbox.__super__.constructor.apply(this, arguments);
  }

  CategoriesCheckbox.prototype.el = $("#categories-checkbox");

  CategoriesCheckbox.prototype.initialize = function() {
    return this.listenTo(this.collection, "reset", this.render);
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
