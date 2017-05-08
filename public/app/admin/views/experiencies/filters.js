ppu.admin.ExperiencesFilters = (function(superClass) {
  extend(ExperiencesFilters, superClass);

  function ExperiencesFilters() {
    return ExperiencesFilters.__super__.constructor.apply(this, arguments);
  }

  ExperiencesFilters.prototype.el = $(".experience-filter");

  ExperiencesFilters.prototype.events = {
    "change .position": "byPosition",
    "change .country": "byCountry",
    "change .category": "byCategory",
    "keydown .query": "byQuery",
    "click .see-more": "seeMore"
  };

  ExperiencesFilters.prototype.initialize = function() {
    return (this.filtersAplied = {
      lang: "es"
    });
  };

  ExperiencesFilters.prototype.render = function() {
    var template;
    template = app.compile(this.template);
    return this.$el.html(template);
  };

  ExperiencesFilters.prototype.filterBy = function(data) {
    data = _.extend(this.filtersAplied, data);
    return app.pubsub.trigger("experiences:filter", data);
  };

  ExperiencesFilters.prototype.seeMore = function(e) {
    var data, offset;
    e.preventDefault();
    offset = $(this.el).data("offset") || 20;
    data = _.extend(this.filtersAplied, {
      paginate: offset
    });
    ppu.experiences.fetch({
      data: data
    });
    return $(this.el).data("offset", offset + 20);
  };

  ExperiencesFilters.prototype.byPosition = function(e) {
    var val;
    val = $(e.currentTarget).find("select").val();
    return this.filterBy({
      position: val
    });
  };

  ExperiencesFilters.prototype.byCountry = function(e) {
    var val;
    val = $(e.currentTarget).val();
    return this.filterBy({
      country: val
    });
  };

  ExperiencesFilters.prototype.byCategory = function(e) {
    var val;
    val = $(e.currentTarget).find("select").val();
    return this.filterBy({
      category: val
    });
  };

  ExperiencesFilters.prototype.byQuery = function(e) {
    var val;
    val = $(e.currentTarget).val();
    if (val.length >= 3) {
      return this.filterBy({
        keyword: val
      });
    }
  };

  return ExperiencesFilters;
})(Backbone.View);
