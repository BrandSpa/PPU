ppu.admin.ExperiencesView = (function(superClass) {
  extend(ExperiencesView, superClass);

  function ExperiencesView() {
    return ExperiencesView.__super__.constructor.apply(this, arguments);
  }

  ExperiencesView.prototype.el = $("#experiences-dasboard");

  ExperiencesView.prototype.initialize = function() {
    this.listenTo(this.collection, "reset", this.render);
    this.listenTo(this.collection, "add", this.addOne, this);
    return app.pubsub.on("experiences:filter", this.filterCollection, this);
  };

  ExperiencesView.prototype.filterCollection = function(filters) {
    return this.collection.fetch({
      reset: true,
      data: filters
    });
  };

  ExperiencesView.prototype.addOne = function(model) {
    var view;
    view = new ppu.admin.ExperienceView({
      model: model
    });
    return $(this.el).find("tbody").append(view.render().el);
  };

  ExperiencesView.prototype.render = function() {
    $(this.el).find("tbody").html("");
    return this.collection.each(function(model) {
      var view;
      view = new ppu.admin.ExperienceView({
        model: model
      });
      return $(this.el).find("tbody").append(view.render().el);
    }, this);
  };

  return ExperiencesView;
})(Backbone.View);
