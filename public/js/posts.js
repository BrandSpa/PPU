var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.Post = (function(_super) {
    __extends(Post, _super);

    function Post() {
      return Post.__super__.constructor.apply(this, arguments);
    }

    Post.prototype.urlRoot = '/api/posts';

    return Post;

  })(Backbone.Model);
  ppu.Posts = (function(_super) {
    __extends(Posts, _super);

    function Posts() {
      return Posts.__super__.constructor.apply(this, arguments);
    }

    Posts.prototype.url = '/api/posts';

    Posts.prototype.model = ppu.Post;

    return Posts;

  })(Backbone.Collection);
  ppu.PostView = (function(_super) {
    __extends(PostView, _super);

    function PostView() {
      return PostView.__super__.constructor.apply(this, arguments);
    }

    PostView.prototype.template = $("#post-template");

    PostView.prototype.className = "col-md-6 col-sm-6 col-xs-12 post-item";

    PostView.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      $(this.el).html(template(this.model.toJSON()));
      return this;
    };

    return PostView;

  })(Backbone.View);
  ppu.PostFeaturedView = (function(_super) {
    __extends(PostFeaturedView, _super);

    function PostFeaturedView() {
      return PostFeaturedView.__super__.constructor.apply(this, arguments);
    }

    PostFeaturedView.prototype.template = $("#post-template");

    PostFeaturedView.prototype.className = "col-md-6 col-sm-6 col-xs-12 post-featured-item";

    PostFeaturedView.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      $(this.el).html(template(this.model.toJSON()));
      return this;
    };

    return PostFeaturedView;

  })(Backbone.View);
  ppu.PostsView = (function(_super) {
    __extends(PostsView, _super);

    function PostsView() {
      return PostsView.__super__.constructor.apply(this, arguments);
    }

    PostsView.prototype.el = $("#posts");

    PostsView.prototype.initialize = function() {
      this.listenTo(this.collection, 'reset', this.render);
      return app.pubsub.bind("posts:filter", this.filterCollection, this);
    };

    PostsView.prototype.filterCollection = function(filters) {
      return this.collection.fetch({
        reset: true,
        lang: app.lang,
        data: filters
      });
    };

    PostsView.prototype.renderOne = function(model) {
      ppu.postView = new ppu.PostView({
        model: model
      });
      return this.$el.append(ppu.postView.render().el);
    };

    PostsView.prototype.render = function() {
      this.$el.html("");
      return this.collection.each(function(model) {
        return this.renderOne(model);
      }, this);
    };

    return PostsView;

  })(Backbone.View);
  ppu.PostMainFeaturedView = (function(_super) {
    __extends(PostMainFeaturedView, _super);

    function PostMainFeaturedView() {
      return PostMainFeaturedView.__super__.constructor.apply(this, arguments);
    }

    PostMainFeaturedView.prototype.template = $("#post-main-featured-template");

    PostMainFeaturedView.prototype.className = "col-md-6 col-sm-6 col-xs-12 post-main-featured-item";

    PostMainFeaturedView.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      $(this.el).html(template(this.model.toJSON()));
      return this;
    };

    return PostMainFeaturedView;

  })(Backbone.View);
  ppu.PostsFeaturedView = (function(_super) {
    __extends(PostsFeaturedView, _super);

    function PostsFeaturedView() {
      return PostsFeaturedView.__super__.constructor.apply(this, arguments);
    }

    PostsFeaturedView.prototype.el = $("#posts-featured");

    PostsFeaturedView.prototype.initialize = function() {
      this.listenTo(this.collection, "reset", this.render);
      return app.pubsub.bind("posts:filter", this.hide, this);
    };

    PostsFeaturedView.prototype.hide = function() {
      return this.$el.fadeOut();
    };

    PostsFeaturedView.prototype.renderMain = function(model) {
      ppu.postMainFeaturedView = new ppu.PostMainFeaturedView({
        model: model
      });
      return this.$el.append(ppu.postMainFeaturedView.render().el);
    };

    PostsFeaturedView.prototype.renderOne = function(model) {
      ppu.postView = new ppu.PostFeaturedView({
        model: model
      });
      return this.$el.append(ppu.postView.render().el);
    };

    PostsFeaturedView.prototype.render = function() {
      return this.collection.each(function(model) {
        if (model.get('featured') === 1) {
          return this.renderMain(model);
        } else {
          return this.renderOne(model);
        }
      }, this);
    };

    return PostsFeaturedView;

  })(Backbone.View);
  ppu.PostsFilters = (function(_super) {
    __extends(PostsFilters, _super);

    function PostsFilters() {
      return PostsFilters.__super__.constructor.apply(this, arguments);
    }

    PostsFilters.prototype.el = $('#top-bar');

    PostsFilters.prototype.template = $("#posts-filter");

    PostsFilters.prototype.events = {
      'change .country': 'byCountry',
      'change .category': 'byCategory',
      'keydown .query': 'byKeyword'
    };

    PostsFilters.prototype.initialize = function() {
      return this.filtersAplied = {};
    };

    PostsFilters.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      return this.$el.html(template);
    };

    PostsFilters.prototype.byCountry = function(e) {
      var data, el, val, value;
      el = $(e.currentTarget);
      if ($(".countries").find('input[type="checkbox"]:checked').length === 2) {
        data = _.extend(this.filtersAplied, {
          by_country: ""
        });
      } else {
        if (el.find(":not(:checked)")) {
          value = el.val();
        }
        if (value === "Colombia") {
          val = "Chile";
        } else {
          val = "Colombia";
        }
        $(".countries").find("input[value='" + val + "']").prop('checked', true);
        data = _.extend(this.filtersAplied, {
          by_country: val
        });
      }
      return app.pubsub.trigger("posts:filter", data);
    };

    PostsFilters.prototype.byCategory = function(e) {
      var data, val;
      val = $(e.currentTarget).find('select').val();
      data = _.extend(this.filtersAplied, {
        by_category: val
      });
      return app.pubsub.trigger("posts:filter", data);
    };

    PostsFilters.prototype.byKeyword = function(e) {
      var data, val;
      val = $(e.currentTarget).val();
      data = _.extend(this.filtersAplied, {
        by_keyword: val
      });
      if (val.length >= 3) {
        return app.pubsub.trigger("posts:filter", data);
      }
    };

    return PostsFilters;

  })(Backbone.View);
  return ppu.PostDetailView = (function(_super) {
    __extends(PostDetailView, _super);

    function PostDetailView() {
      return PostDetailView.__super__.constructor.apply(this, arguments);
    }

    PostDetailView.prototype.el = $("#post-detail");

    PostDetailView.prototype.template = $("#post-detail-template");

    PostDetailView.prototype.initialize = function() {
      this.listenTo(this.model, "change", this.render);
      return this.getTitle();
    };

    PostDetailView.prototype.getTitle = function() {
      return $("#top-bar").html($("#post-detail-title").html());
    };

    PostDetailView.prototype.render = function() {
      var template;
      template = app.compile(this.template);
      this.$el.html(template(this.model.toJSON()));
      return this.setUrlTranslation(this.model);
    };

    return PostDetailView;

  })(Backbone.View);
});
