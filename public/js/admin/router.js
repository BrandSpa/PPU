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
      'editar-abogado/:id': 'editLawyer',
      'crear-noticia': 'createPost',
      ':lang/crear-noticia': 'createPost'
    };

    Router.prototype.url = Backbone.history.location.href;

    Router.prototype.dashboard = function() {
      ppu.lawyers = new ppu.Lawyers;
      ppu.lawyers.fetch({
        reset: true
      });
      return ppu.admin.lawyers = new ppu.admin.LawyersView({
        collection: ppu.lawyers
      });
    };

    Router.prototype.createLawyer = function(lang) {
      if (lang === "en") {
        window.lang = 'en';
        $.ajaxSetup({
          data: {
            lang: "en"
          }
        });
      } else {
        window.lang = 'es';
        $.ajaxSetup({
          data: {
            lang: "es"
          }
        });
      }
      ppu.lawyer = new ppu.Lawyer;
      ppu.lawyerCreateForm = new ppu.LawyerCreateForm({
        model: ppu.lawyer
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

    Router.prototype.editLawyer = function(id) {
      var view;
      $("#lawyer-create").remove();
      ppu.lawyer = new ppu.Lawyer({
        id: id
      });
      ppu.lawyer.fetch();
      return view = new ppu.LawyerEditView({
        model: ppu.lawyer
      });
    };

    Router.prototype.createPost = function(lang) {
      ppu.admin.postCreate = new ppu.admin.PostCreate;
      return ppu.admin.postCreate.render();
    };

    return Router;

  })(Backbone.Router);
  ppu.admin.router = new ppu.admin.Router;
  return Backbone.history.start({
    pushState: true
  });
});
