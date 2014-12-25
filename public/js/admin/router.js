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
      'crear-abogado': 'createLawyer',
      ':lang/crear-abogado': 'createLawyer',
      'editar-abogado/:id': 'editLawyer',
      'en/editar-abogado/:id': 'editLawyer',
      'admin/posts/new': 'createPost',
      'en/admin/posts/new': 'createPost',
      'admin/posts/:id/edit': 'editPost',
      'en/admin/posts/:id/edit': 'editPost',
      ':lang/crear-noticia': 'createPost'
    };

    Router.prototype.dashboard = function() {
      ppu.lawyers = new ppu.Lawyers;
      ppu.lawyers.fetch({
        reset: true
      });
      ppu.admin.lawyers = new ppu.admin.LawyersView({
        collection: ppu.lawyers
      });
      ppu.posts = new ppu.Posts;
      ppu.posts.fetch({
        reset: true
      });
      return ppu.admin.posts = new ppu.admin.PostsView({
        collection: ppu.posts
      });
    };

    Router.prototype.createLawyer = function(lang) {
      ppu.lawyer = new ppu.Lawyer;
      ppu.lawyerCreateForm = new ppu.LawyerCreateForm({
        model: ppu.lawyer
      });
      ppu.lawyerAcademic = new ppu.LawyerAcademic;
      ppu.lawyerAcademicCreate = new ppu.LawyerAcademicCreate({
        model: ppu.lawyerAcademic
      });
      ppu.lawyerArticle = new ppu.LawyerArticle;
      ppu.lawyerArticleCreate = new ppu.LawyerArticleCreate({
        model: ppu.lawyerArticle
      });
      ppu.lawyerAward = new ppu.LawyerAward;
      ppu.lawyerAwardCreate = new ppu.LawyerAwardCreate({
        model: ppu.lawyerAward
      });
      ppu.lawyerEducation = new ppu.LawyerEducation;
      ppu.lawyerEducationCreate = new ppu.LawyerEducationCreate({
        model: ppu.lawyerEducation
      });
      ppu.lawyerInstitution = new ppu.LawyerInstitution;
      ppu.lawyerInstitutionCreate = new ppu.LawyerInstitutionCreate({
        model: ppu.lawyerInstitution
      });
      ppu.lawyerJob = new ppu.LawyerJob;
      ppu.lawyerJobCreate = new ppu.LawyerJobCreate({
        model: ppu.lawyerJob
      });
      ppu.lawyerLanguage = new ppu.LawyerLanguage;
      ppu.lawyerLanguageCreate = new ppu.LawyerLanguageCreate({
        model: ppu.lawyerLanguage
      });
      ppu.lawyerPharase = new ppu.LawyerPharase;
      ppu.lawyerPharaseCreate = new ppu.LawyerPharaseCreate({
        model: ppu.lawyerPharase
      });
      ppu.lawyerRecognition = new ppu.LawyerRecognition;
      ppu.lawyerRecognitionCreate = new ppu.LawyerRecognitionCreate({
        model: ppu.lawyerRecognition
      });
      return ppu.lawyerCreate = new ppu.LawyerCreateView;
    };

    Router.prototype.editLawyer = function(slug) {
      var view;
      $("#lawyer-create").remove();
      ppu.lawyer = new ppu.Lawyer;
      ppu.lawyer.fetchBySlug(slug);
      return view = new ppu.LawyerEditView({
        model: ppu.lawyer
      });
    };

    Router.prototype.createPost = function(lang) {
      ppu.admin.post = new ppu.Post;
      ppu.admin.postCreate = new ppu.admin.PostCreate({
        model: ppu.admin.post
      });
      ppu.admin.postCreate.render();
      ppu.admin.galleries = new ppu.admin.Galleries;
      return ppu.admin.galleries.fetch({
        reset: true,
        data: {
          name: "post_header"
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

    return Router;

  })(Backbone.Router);
  ppu.admin.router = new ppu.admin.Router;
  return Backbone.history.start({
    pushState: true
  });
});
