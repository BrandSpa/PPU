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
      "experiencias": "experiences",
      "experiencias/:slug": "experience",
      "posts": "posts",
      "posts/:slug": "post",
      "areas": "areas",
      "areas/:slug": "area",
      "trabaje-con-nosotros": "curriculum"
    };

    Workspace.prototype.initialize = function() {
      new ppu.AppView;
      return window.urlTranslation = "";
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
      ppu.post = new ppu.Post({
        id: slug
      });
      ppu.post.fetch();
      return ppu.postDetailView = new ppu.PostDetailView({
        model: ppu.post
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

    Workspace.prototype.area = function(slug) {
      ppu.category = new ppu.Category({
        id: slug
      });
      ppu.category.fetch();
      return ppu.categoryDetail = new ppu.CategoryDetail({
        model: ppu.category
      });
    };

    Workspace.prototype.experience = function(slug) {
      ppu.experience = new ppu.Experience({
        id: slug
      });
      ppu.experience.fetch();
      return ppu.experienceDetailView = new ppu.ExperienceDetailView({
        model: ppu.experience
      });
    };

    Workspace.prototype.experiences = function() {
      ppu.experiencesFilters = new ppu.ExperiencesFilters;
      ppu.experiencesFilters.render();
      ppu.experiences = new ppu.Experiences;
      ppu.experiences.fetch({
        reset: true,
        data: {
          published: true,
          not_featured: true
        }
      });
      return ppu.experiencesView = new ppu.ExperiencesView({
        collection: ppu.experiences
      });
    };

    Workspace.prototype.curriculum = function() {
      ppu.curriculum = new ppu.Curriculum;
      return ppu.curriculumCreate = new ppu.CurriculumCreate({
        model: ppu.curriculum
      });
    };

    return Workspace;

  })(Backbone.Router);
  new ppu.Workspace;
  return Backbone.history.start({
    pushState: true
  });
});
