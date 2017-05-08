// Generated by CoffeeScript 1.12.5
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  $(function() {
    return ppu.FiltersMobile = (function(superClass) {
      extend(FiltersMobile, superClass);

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
        this.filters = {};
        return app.pubsub.on("filters:showPosition", this.showPosition, this);
      };

      FiltersMobile.prototype.filterBy = function(data) {
        data = _.extend({
          paginate: 0
        }, data);
        data = _.extend(this.filtersAplied, data);
        return app.pubsub.trigger("posts:filter", data);
      };

      FiltersMobile.prototype.applyFilters = function(e) {
        e.preventDefault();
        app.pubsub.trigger("apply:filters", this.filters);
        return this.$el.modal('hide');
      };

      FiltersMobile.prototype.showPosition = function() {
        console.log("dale remove");
        return $("#filters-modal").find('.position').removeClass('hidden');
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

}).call(this);
