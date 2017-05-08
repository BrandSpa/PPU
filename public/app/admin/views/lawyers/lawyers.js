ppu.admin.LawyersView = (function(superClass) {
  extend(LawyersView, superClass);

  function LawyersView() {
    return LawyersView.__super__.constructor.apply(this, arguments);
  }

  LawyersView.prototype.el = $("#lawyers-dashboard");

  LawyersView.prototype.initialize = function() {
    this.listenTo(this.collection, "reset", this.render);
    this.listenTo(this.collection, "add", this.addOne);
    this.filtersAplied = {
      lang: app.lang
    };
    return app.pubsub.bind("lawyers:filter", this.filterCollection, this);
  };

  LawyersView.prototype.filterCollection = function(data) {
    $(".lawyers-filters").data("offset", 0);
    return this.collection.fetch({
      reset: true,
      data: data
    });
  };

  LawyersView.prototype.addOne = function(model) {
    var view;
    view = new ppu.admin.LawyerView({
      model: model
    });
    return $(this.el).find("tbody").append(view.render().el);
  };

  LawyersView.prototype.render = function() {
    $(this.el).find("tbody").empty();
    return this.collection.each(function(model) {
      return this.addOne(model);
    }, this);
  };

  return LawyersView;
})(Backbone.View);
