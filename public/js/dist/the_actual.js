var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  ppu.admin.TheActualView = (function(superClass) {
    extend(TheActualView, superClass);

    function TheActualView() {
      return TheActualView.__super__.constructor.apply(this, arguments);
    }

    TheActualView.prototype.template = $('#the-actual-admin-template');

    TheActualView.prototype.tagName = 'tr';

    TheActualView.prototype.events = {
      "click .publish": "publish",
      "click .unpublish": "unpublish",
      "click .change-featured": "changeFeatured",
      "click .publish-on-social-network": "publishFb",
      "click .translate": "translate"
    };

    TheActualView.prototype.initialize = function() {
      return this.listenTo(this.model, "change", this.render);
    };

    TheActualView.prototype.render = function() {
      var source, t;
      source = this.template.html();
      t = Handlebars.compile(source);
      $(this.el).html(t(this.model.toJSON()));
      return this;
    };

    TheActualView.prototype.publish = function(e) {
      e.preventDefault();
      return this.model.save({
        fields: {
          published: true
        }
      });
    };

    TheActualView.prototype.publishFb = function(e) {
      var published, url;
      e.preventDefault();
      url = setSubdomain(this.model.get('lang')) + ("posts/" + (this.model.get('slug')));
      return published = openShare(url);
    };

    TheActualView.prototype.unpublish = function(e) {
      e.preventDefault();
      return this.model.save({
        fields: {
          published: false
        }
      });
    };

    TheActualView.prototype.translate = function(e) {
      var id;
      e.preventDefault();
      id = this.model.id;
      return $.post("/api/posts/" + id + "/duplicate").done(function(model) {
        return window.location = "/en/admin/the-actual/" + model.id + "/edit";
      });
    };

    TheActualView.prototype.changeFeatured = function(e) {
      var el;
      el = $(e.currentTarget).find('input').val();
      app.pubsub.trigger('post:changeFeatured', el);
      return this.model.save({
        fields: {
          featured: el
        }
      });
    };

    return TheActualView;

  })(Backbone.View);
  return ppu.admin.TheActualViews = (function(superClass) {
    extend(TheActualViews, superClass);

    function TheActualViews() {
      return TheActualViews.__super__.constructor.apply(this, arguments);
    }

    TheActualViews.prototype.el = $("#posts-dasboard");

    TheActualViews.prototype.initialize = function() {
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'add', this.addOne, this);
      app.pubsub.on("posts:filter", this.filterCollection, this);
      app.pubsub.on("post:changeFeatured", this.changeFeatured, this);
      return app.pubsub.on('post:unfeatured', this.unfeatured, this);
    };

    TheActualViews.prototype.filterCollection = function(filters) {
      return this.collection.fetch({
        reset: true,
        lang: app.lang,
        data: filters
      });
    };

    TheActualViews.prototype.unfeatured = function() {
      return this.collection.fetch({
        reset: true
      });
    };

    TheActualViews.prototype.changeFeatured = function(val) {
      var coll;
      coll = new ppu.Posts;
      return this.collection.fetch({
        add: false,
        data: {
          is_featured: val
        }
      }).done(function(models) {
        return coll.add(models);
      });
    };

    TheActualViews.prototype.addOne = function(model) {
      var view;
      view = new ppu.admin.TheActualView({
        model: model
      });
      return $(this.el).find('thead').append(view.render().el);
    };

    TheActualViews.prototype.render = function() {
      $(this.el).find('tbody').html('');
      return this.collection.each(function(model) {
        var view;
        view = new ppu.admin.TheActualView({
          model: model
        });
        return $(this.el).find('tbody').append(view.render().el);
      }, this);
    };

    return TheActualViews;

  })(Backbone.View);
});
