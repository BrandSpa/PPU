$(function() {
	
  ppu.admin.PostsView = (function(superClass) {
    extend(PostsView, superClass);

    function PostsView() {
      return PostsView.__super__.constructor.apply(this, arguments);
    }

    PostsView.prototype.el = $("#posts-dasboard");

    PostsView.prototype.initialize = function() {
      this.listenTo(this.collection, "reset", this.render);
      this.listenTo(this.collection, "add", this.addOne, this);
      app.pubsub.on("posts:filter", this.filterCollection, this);
      app.pubsub.on("post:changeFeatured", this.changeFeatured, this);
      return app.pubsub.on("post:unfeatured", this.pull, this);
    };

    PostsView.prototype.filterCollection = function(filters) {
      return this.collection.fetch({
        reset: true,
        lang: app.lang,
        data: filters
      });
    };

    PostsView.prototype.pull = function() {
      return this.collection.fetch({
        reset: true
      });
    };

    PostsView.prototype.changeFeatured = function(val) {
      var coll;
      coll = new ppu.Posts();
      return this.collection
        .fetch({
          add: false,
          data: {
            is_featured: val
          }
        })
        .done(function(models) {
          return coll.add(models);
        });
    };

    PostsView.prototype.addOne = function(model) {
      var view;
      view = new ppu.admin.PostView({
        model: model
      });
      return $(this.el).find("thead").append(view.render().el);
    };

    PostsView.prototype.render = function() {
      $(this.el).find("tbody").html("");
      return this.collection.each(function(model) {
        var view;
        view = new ppu.admin.PostView({
          model: model
        });
        return $(this.el).find("tbody").append(view.render().el);
      }, this);
    };

    return PostsView;
  })(Backbone.View);
});
