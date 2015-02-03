var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  return ppu.FiltersMobile = (function(_super) {
    __extends(FiltersMobile, _super);

    function FiltersMobile() {
      return FiltersMobile.__super__.constructor.apply(this, arguments);
    }

    FiltersMobile.prototype.el = $("#filters-modal");

    FiltersMobile.prototype.events = {
      "click .apply-filters": "applyFilters",
      "change .category": "addCategory",
      "change .country": "addCountry"
    };

    FiltersMobile.prototype.initialize = function() {
      return this.filters = {};
    };

    FiltersMobile.prototype.applyFilters = function(e) {
      e.preventDefault();
      app.pubsub.trigger("apply:filters", this.filters);
      return this.$el.modal('hide');
    };

    FiltersMobile.prototype.addFilter = function(filter) {
      return this.filters = _.extend(this.filters, filter);
    };

    FiltersMobile.prototype.addCategory = function(e) {
      var val;
      val = $(e.currentTarget).find('select').val();
      return this.addFilter({
        category: val
      });
    };

    FiltersMobile.prototype.addCountry = function(e) {
      var val;
      val = $(e.currentTarget).find('select').val();
      return this.addFilter({
        country: val
      });
    };

    return FiltersMobile;

  })(Backbone.View);
});
