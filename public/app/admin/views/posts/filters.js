$(function() {
  ppu.admin.PostsFilters = (function(superClass) {
    extend(PostsFilters, superClass);

    function PostsFilters() {
      return PostsFilters.__super__.constructor.apply(this, arguments);
    }

    PostsFilters.prototype.el = $(".post-filter");

    PostsFilters.prototype.events = {
      "click .see-more": "seeMore",
      "change .country": "byCountry",
      "change .category": "byCategory",
      "keydown .query": "byKeyword",
      "change .by-lang": "byLang"
    };

    PostsFilters.prototype.initialize = function() {
      return (this.filtersAplied = {
        lang: "es",
        the_actual_ch: 0,
        the_actual_co: 0
      });
    };

    PostsFilters.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      return this.$el.html(template);
    };

    PostsFilters.prototype.filterBy = function(data) {
      data = _.extend(this.filtersAplied, data);
      return app.pubsub.trigger("posts:filter", data);
    };

    PostsFilters.prototype.seeMore = function(e) {
      var data, offset;
      e.preventDefault();
      offset = $(this.el).data("offset") || 20;
      data = _.extend(this.filtersAplied, {
        paginate: offset
      });
      ppu.posts.fetch({
        data: data
      });
      return $(this.el).data("offset", offset + 20);
    };

    PostsFilters.prototype.byCountry = function(e) {
      var data, el, val;
      el = $(e.currentTarget);
      val = el.val();
      data = _.extend(this.filtersAplied, {
        country: val
      });
      return app.pubsub.trigger("posts:filter", data);
    };

    PostsFilters.prototype.byCategory = function(e) {
      var data, val;
      val = $(e.currentTarget).find("select").val();
      data = _.extend(this.filtersAplied, {
        category: val
      });
      return app.pubsub.trigger("posts:filter", data);
    };

    PostsFilters.prototype.byKeyword = function(e) {
      var val;
      val = $(e.currentTarget).val();
      if (val.length >= 1) {
        return this.filterBy({
          keyword: val
        });
      }
    };

    PostsFilters.prototype.byLang = function(e) {
      var val;
      val = $(e.currentTarget).val();
      return this.filterBy({
        lang: val
      });
    };

    return PostsFilters;
  })(Backbone.View);
});
