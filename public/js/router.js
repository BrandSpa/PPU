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
      "": "posts",
      "posts/:slug": "post",
      "areas": "areas",
      "areas/:slug": "area",
      "trabaje-con-nosotros": "curriculum",
      "nosotros": "us",
      "probono": "probono"
    };

    Workspace.prototype.initialize = function() {
      new ppu.AppView;
      window.urlTranslation = "";
      ppu.contact = new ppu.Contact;
      return ppu.FooterContactCreate = new ppu.FooterContactCreate({
        model: ppu.contact
      });
    };

    Workspace.prototype.lawyers = function(lang) {
      ppu.lawyers = new ppu.Lawyers;
      ppu.lawyersView = new ppu.LawyersView({
        collection: ppu.lawyers
      });
      ppu.lawyersFilters = new ppu.LawyersFilters;
      return ppu.filtersMobile = new ppu.FiltersMobile;
    };

    Workspace.prototype.lawyer = function(slug) {
      ppu.lawyer = new ppu.Lawyer({
        id: slug
      });
      return ppu.LawyerDetailView = new ppu.LawyerDetailView({
        model: ppu.lawyer
      });
    };

    Workspace.prototype.posts = function() {
      ppu.posts = new ppu.Posts;
      ppu.posts.fetch({
        reset: true,
        data: {
          published: true,
          not_featured: true
        }
      });
      ppu.postsView = new ppu.PostsView({
        collection: ppu.posts
      });
      ppu.postsFilters = new ppu.PostsFilters;
      ppu.postsFilters.render();
      return ppu.filtersMobile = new ppu.FiltersMobile;
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
      ppu.categoryDetail = new ppu.CategoryDetail({
        model: ppu.category
      });
      ppu.categories = new ppu.Categories;
      ppu.categoriesList = new ppu.CategoriesList({
        collection: ppu.categories
      });
      ppu.lawyers = new ppu.Lawyers;
      return ppu.lawyersRelated = new ppu.lawyersRelatedCategory({
        collection: ppu.lawyers
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
      ppu.experiencesView = new ppu.ExperiencesView({
        collection: ppu.experiences
      });
      return ppu.filtersMobile = new ppu.FiltersMobile;
    };

    Workspace.prototype.curriculum = function() {
      var title;
      ppu.curriculum = new ppu.Curriculum;
      ppu.curriculumCreate = new ppu.CurriculumCreate({
        model: ppu.curriculum
      });
      title = $("#work-with-title-template").html();
      return $("#top-bar").html(title);
    };

    Workspace.prototype.us = function() {
      var title;
      title = $("#us-title-template").html();
      return $("#top-bar").html(title);
    };

    Workspace.prototype.probono = function() {
      var title;
      title = $("#probono-title-template").html();
      return $("#top-bar").html(title);
    };

    return Workspace;

  })(Backbone.Router);
  new ppu.Workspace;
  return Backbone.history.start({
    pushState: true
  });
});
