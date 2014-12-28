var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.Workspace = (function(_super) {
    __extends(Workspace, _super);

    function Workspace() {
      return Workspace.__super__.constructor.apply(this, arguments);
    }

    Workspace.prototype.routes = {
      "abogados": "lawyers",
      "abogados/:slug": "lawyer",
      "posts": "posts",
      "posts/:slug": "post",
      "areas": "areas",
      "areas/:name": "area"
    };

    Workspace.prototype.initialize = function() {
      return new ppu.AppView;
    };

    Workspace.prototype.lawyers = function(lang) {
      ppu.lawyers = new ppu.Lawyers;
      ppu.lawyers.fetch({
        reset: true
      });
      ppu.lawyersFilters = new ppu.LawyersFilters;
      ppu.lawyersFilters.render();
      return ppu.lawyersView = new ppu.LawyersView({
        collection: ppu.lawyers
      });
    };

    Workspace.prototype.lawyer = function(slug) {
      ppu.lawyers = new ppu.Lawyers;
      ppu.lawyers.fetch({
        reset: true,
        data: {
          lang: app.lang,
          slug: slug
        }
      });
      return ppu.LawyerDetailView = new ppu.LawyerDetailView({
        collection: ppu.lawyers
      });
    };

    Workspace.prototype.posts = function() {
      ppu.postsFeatured = new ppu.Posts;
      ppu.postsFeatured.fetch({
        reset: true,
        data: {
          featured: true
        }
      });
      ppu.postsFilters = new ppu.PostsFilters;
      ppu.postsFilters.render();
      ppu.posts = new ppu.Posts;
      ppu.posts.fetch({
        reset: true,
        data: {
          published: true,
          not_featured: true
        }
      });
      ppu.postsFeaturedView = new ppu.PostsFeaturedView({
        collection: ppu.postsFeatured
      });
      return ppu.postsView = new ppu.PostsView({
        collection: ppu.posts
      });
    };

    Workspace.prototype.post = function(slug) {
      ppu.posts = new ppu.Posts;
      ppu.posts.fetch({
        reset: true,
        data: {
          slug: slug
        }
      });
      return ppu.postDetailView = new ppu.PostDetailView({
        collection: ppu.posts
      });
    };

    Workspace.prototype.areas = function() {
      ppu.categories = new ppu.Categories;
      ppu.categories.fetch({
        reset: true
      });
      return ppu.categoriesView = new ppu.CategoriesView({
        collection: ppu.categories
      });
    };

    return Workspace;

  })(Backbone.Router);
  new ppu.Workspace;
  return Backbone.history.start({
    pushState: true
  });
});
