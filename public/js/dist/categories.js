var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ppu.Category = (function(superClass) {
  extend(Category, superClass);

  function Category() {
    return Category.__super__.constructor.apply(this, arguments);
  }

  Category.prototype.urlRoot = '/api/categories';

  return Category;

})(Backbone.Model);

ppu.Categories = (function(superClass) {
  extend(Categories, superClass);

  function Categories() {
    return Categories.__super__.constructor.apply(this, arguments);
  }

  Categories.prototype.url = '/api/categories';

  Categories.prototype.model = ppu.Category;

  return Categories;

})(Backbone.Collection);
