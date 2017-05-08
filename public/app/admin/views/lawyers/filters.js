ppu.admin.LawyersFilters = (function(superClass) {
  extend(LawyersFilters, superClass);

  function LawyersFilters() {
    return LawyersFilters.__super__.constructor.apply(this, arguments);
  }

  LawyersFilters.prototype.el = $(".lawyers-filters");

  LawyersFilters.prototype.events = {
    "click .see-more": "seeMore",
    "keyup .query": "search",
    "change .lawyer-filter-lang": "filterLang",
    "change .lawyer-filter-country": "filterCountry",
    "change .lawyer-filter-category": "filterCategory",
    "change .lawyer-filter-position": "filterPosition"
  };

  LawyersFilters.prototype.initialize = function() {
    return (this.filtersAplied = {
      lang: app.lang
    });
  };

  LawyersFilters.prototype.seeMore = function(e) {
    var data, offset;
    e.preventDefault();
    offset = $(this.el).data("offset") || 20;
    data = _.extend(this.filtersAplied, {
      paginate: offset
    });
    ppu.lawyers.fetch({
      data: data
    });
    return $(this.el).data("offset", offset + 20);
  };

  LawyersFilters.prototype.search = function(e) {
    var data, query;
    e.preventDefault();
    query = $(e.currentTarget).val();
    if (query.length >= 3) {
      data = _.extend(this.filtersAplied, {
        paginate: 0,
        search: query
      });
      return app.pubsub.trigger("lawyers:filter", data);
    }
  };

  LawyersFilters.prototype.filterLang = function(e) {
    var data, val;
    val = $(e.currentTarget).val();
    data = _.extend(this.filtersAplied, {
      paginate: 0,
      lang: val
    });
    console.log(data);
    return app.pubsub.trigger("lawyers:filter", data);
  };

  LawyersFilters.prototype.filterCountry = function(e) {
    var data, val;
    val = $(e.currentTarget).val();
    data = _.extend(this.filtersAplied, {
      paginate: 0,
      country: val
    });
    console.log(
      _.extend(this.filtersAplied, {
        paginate: 0,
        country: val
      })
    );
    return app.pubsub.trigger("lawyers:filter", data);
  };

  LawyersFilters.prototype.filterPosition = function(e) {
    var data, val;
    val = $(e.currentTarget).val();
    data = _.extend(this.filtersAplied, {
      paginate: 0,
      position: val
    });
    return app.pubsub.trigger("lawyers:filter", data);
  };

  LawyersFilters.prototype.filterCategory = function(e) {
    var data, val;
    val = $(e.currentTarget).val();
    data = _.extend(this.filtersAplied, {
      paginate: 0,
      category: val
    });
    return app.pubsub.trigger("lawyers:filter", data);
  };

  return LawyersFilters;
})(Backbone.View);
