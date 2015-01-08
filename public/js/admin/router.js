var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.admin.Router = (function(_super) {
    __extends(Router, _super);

    function Router() {
      return Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.routes = {
      'dashboard': 'dashboard',
      "admin/lawyers/new": "createLawyer",
      'admin/posts/new': 'createPost',
      'admin/experiences/new': 'createExperience',
      "en/admin/lawyers/new": "createLawyer",
      'en/admin/posts/new': 'createPost',
      'admin/lawyers/:id/edit': 'editLawyer',
      'admin/posts/:id/edit': 'editPost',
      'admin/experiences/:id/edit': 'editExperience',
      "en/admin/lawyers/:id/edit": "editLawyer",
      'en/admin/posts/:id/edit': 'editPost',
      'en/admin/experiences/:id/edit': 'editExperience',
      'crear-abogado': 'createLawyer',
      ':lang/crear-abogado': 'createLawyer',
      'editar-abogado/:id': 'editLawyer',
      'en/editar-abogado/:id': 'editLawyer'
    };

    Router.prototype.dashboard = function() {
      ppu.lawyers = new ppu.Lawyers;
      ppu.lawyers.fetch({
        reset: true
      });
      ppu.admin.lawyers = new ppu.admin.LawyersView({
        collection: ppu.lawyers
      });
      ppu.admin.lawyersFilters = new ppu.admin.LawyersFilters;
      ppu.posts = new ppu.Posts;
      ppu.posts.fetch({
        reset: true
      });
      ppu.admin.posts = new ppu.admin.PostsView({
        collection: ppu.posts
      });
      ppu.admin.postsFilters = new ppu.admin.PostsFilters;
      ppu.experiences = new ppu.Experiences;
      ppu.experiences.fetch({
        reset: true
      });
      ppu.admin.experiences = new ppu.admin.ExperiencesView({
        collection: ppu.experiences
      });
      return ppu.admin.experiencesFilters = new ppu.admin.ExperiencesFilters;
    };

    Router.prototype.createLawyer = function(lang) {
      ppu.lawyer = new ppu.Lawyer;
      ppu.lawyerCreateForm = new ppu.LawyerCreateForm({
        model: ppu.lawyer
      });
      ppu.lawyerCreateForm.render();
      ppu.categories = new ppu.Categories;
      ppu.categories.fetch({
        reset: true
      });
      ppu.admin.categoriesCheckboxnew = new ppu.admin.CategoriesCheckbox({
        collection: ppu.categories
      });
      return ppu.lawyerCreate = new ppu.LawyerCreateView;
    };

    Router.prototype.editLawyer = function(id) {
      var view;
      $("#lawyer-create").remove();
      ppu.lawyer = new ppu.Lawyer({
        id: id
      });
      ppu.lawyer.fetch({
        data: {
          lang: app.lang
        }
      });
      view = new ppu.LawyerEditView({
        model: ppu.lawyer
      });
      mixins.renderCollection(ppu.LawyerEducations, ppu.LawyerEducationsEdit, {
        lawyer_id: id
      });
      mixins.renderCollection(ppu.LawyerArticles, ppu.LawyerArticlesEdit, {
        lawyer_id: id
      });
      mixins.renderCollection(ppu.LawyerJobs, ppu.LawyerJobsEdit, {
        lawyer_id: id
      });
      mixins.renderCollection(ppu.LawyerRecognitions, ppu.LawyerRecognitionsEdit, {
        lawyer_id: id
      });
      mixins.renderCollection(ppu.LawyerInstitutions, ppu.LawyerInstitutionsEdit, {
        lawyer_id: id
      });
      mixins.renderCollection(ppu.LawyerLanguages, ppu.LawyerLanguagesEdit, {
        lawyer_id: id
      });
      mixins.renderCollection(ppu.LawyerPharases, ppu.LawyerPharasesEdit, {
        lawyer_id: id
      });
      mixins.renderCollection(ppu.LawyerAwards, ppu.LawyerAwardsEdit, {
        lawyer_id: id
      });
      return mixins.renderCollection(ppu.LawyerAcademics, ppu.LawyerAcademicsEdit, {
        lawyer_id: id
      });
    };

    Router.prototype.createPost = function(lang) {
      ppu.admin.post = new ppu.Post;
      ppu.admin.postCreate = new ppu.admin.PostCreate({
        model: ppu.admin.post
      });
      ppu.admin.postCreate.render();
      ppu.categories = new ppu.Categories;
      ppu.categories.fetch({
        reset: true
      });
      ppu.admin.categoriesCheckboxnew = new ppu.admin.CategoriesCheckbox({
        collection: ppu.categories
      });
      ppu.admin.galleries = new ppu.admin.Galleries;
      return ppu.admin.galleries.fetch({
        reset: true,
        data: {
          name: "post_header"
        }
      });
    };

    Router.prototype.createExperience = function(lang) {
      ppu.admin.experience = new ppu.Experience;
      ppu.admin.experienceCreate = new ppu.admin.ExperienceCreate({
        model: ppu.admin.experience
      });
      ppu.admin.experienceCreate.render();
      ppu.categories = new ppu.Categories;
      ppu.categories.fetch({
        reset: true
      });
      ppu.admin.categoriesCheckboxnew = new ppu.admin.CategoriesCheckbox({
        collection: ppu.categories
      });
      ppu.admin.galleries = new ppu.admin.Galleries;
      return ppu.admin.galleries.fetch({
        reset: true,
        data: {
          name: "company_logo"
        }
      });
    };

    Router.prototype.editPost = function(id) {
      ppu.admin.post = new ppu.Post({
        id: id
      });
      ppu.admin.post.fetch({
        data: {
          lang: app.lang
        }
      });
      ppu.admin.postEdit = new ppu.admin.PostEdit({
        model: ppu.admin.post
      });
      ppu.admin.galleries = new ppu.admin.Galleries;
      return ppu.admin.galleries.fetch({
        reset: true,
        data: {
          name: "post_header"
        }
      });
    };

    Router.prototype.editExperience = function(id) {
      ppu.admin.experience = new ppu.Experience({
        id: id
      });
      ppu.admin.experience.fetch({
        data: {
          lang: app.lang
        }
      });
      ppu.admin.experienceEdit = new ppu.admin.ExperienceEdit({
        model: ppu.admin.experience
      });
      ppu.admin.galleries = new ppu.admin.Galleries;
      return ppu.admin.galleries.fetch({
        reset: true,
        data: {
          name: "company_logo"
        }
      });
    };

    return Router;

  })(Backbone.Router);
  ppu.admin.router = new ppu.admin.Router;
  return Backbone.history.start({
    pushState: true
  });
});
