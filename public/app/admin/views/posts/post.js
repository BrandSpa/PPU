$(function() {
  ppu.admin.PostView = (function(superClass) {
    extend(PostView, superClass);

    function PostView() {
      return PostView.__super__.constructor.apply(this, arguments);
    }

    PostView.prototype.template = $("#post-admin-template");

    PostView.prototype.tagName = "tr";

    PostView.prototype.events = {
      "click .publish": "publish",
      "click .unpublish": "unpublish",
      "click .change-featured": "changeFeatured",
      "click .publish-on-social-network": "publishFb",
      "click .highlight": "featured",
      "click .unhighlight": "unhighlight",
      "click .translate": "translate"
    };

    PostView.prototype.initialize = function() {
      return this.listenTo(this.model, "change", this.render);
    };

    PostView.prototype.render = function() {
      var source, t;
      source = this.template.html();
      t = Handlebars.compile(source);
      $(this.el).html(t(this.model.toJSON()));
      return this;
    };

    PostView.prototype.publish = function(e) {
      e.preventDefault();
      return this.model.save({
        fields: {
          published: true
        }
      });
    };

    PostView.prototype.featured = function(e) {
      var id;
      e.preventDefault();
      id = this.model.id;
      return $.post("/api/posts/" + id + "/featured").done(function() {
        return app.pubsub.trigger("post:unfeatured");
      });
    };

    PostView.prototype.publishFb = function(e) {
      var published, url;
      e.preventDefault();
      url =
        setSubdomain(this.model.get("lang")) +
        ("posts/" + this.model.get("slug"));
      return (published = openShare(url));
    };

    PostView.prototype.unpublish = function(e) {
      e.preventDefault();
      return this.model.save({
        fields: {
          published: false
        }
      });
    };

    PostView.prototype.translate = function(e) {
      var id;
      e.preventDefault();
      id = this.model.id;
      return $.post("/api/posts/" + id + "/duplicate").done(function(model) {
        return (window.location = "/en/admin/posts/" + model.id + "/edit");
      });
    };

    PostView.prototype.changeFeatured = function(e) {
      var el;
      el = $(e.currentTarget).find("input").val();
      app.pubsub.trigger("post:changeFeatured", el);
      return this.model.save({
        fields: {
          featured: el
        }
      });
    };

    return PostView;
  })(Backbone.View);
});
