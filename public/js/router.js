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
      ":lang/abogados": "lawyers",
      "abogados/:id": "lawyer",
      "crear-abogado": 'adminLawyer',
      "crear-abogado": 'adminLawyer',
      "terminar-abogado/:id": 'finishLawyer',
      ":lang/crear-abogado": 'adminLawyer',
      "dashboard": 'dashboard'
    };

    Workspace.prototype.lawyers = function(lang) {
      ppu.lawyers = new ppu.Lawyers;
      ppu.lawyers.fetch({
        reset: true
      });
      ppu.lawyersFilters = new ppu.LawyersFilters;
      return ppu.lawyersView = new ppu.LawyersView({
        collection: ppu.lawyers
      });
    };

    Workspace.prototype.lawyer = function() {};

    Workspace.prototype.adminLawyer = function(param) {
      if (param === 'en') {
        $('.lawyer-lang option:eq(2)').prop('selected', true);
      } else {
        $('.lawyer-lang option:eq(1)').prop('selected', true);
      }
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
      ppu.lawyerRecognintion = new ppu.LawyerRecognintion;
      ppu.lawyerRecognintionCreate = new ppu.LawyerRecognintionCreate({
        model: ppu.lawyerRecognintion
      });
      ppu.lawyer = new ppu.Lawyer;
      return ppu.lawyerCreate = new ppu.LawyerCreate({
        model: ppu.lawyer
      });
    };

    Workspace.prototype.finishLawyer = function(id) {
      var view;
      $("#lawyer-create").fadeOut().remove();
      ppu.lawyerFinish = new ppu.Lawyer({
        id: id
      });
      ppu.lawyerFinish.fetch();
      return view = new ppu.LawyerFinish({
        model: ppu.lawyerFinish
      });
    };

    Workspace.prototype.dashboard = function() {
      ppu.lawyers = new ppu.Lawyers;
      ppu.lawyers.fetch({
        reset: true
      });
      return ppu.lawyersDashboard = new ppu.LawyersDashboard({
        collection: ppu.lawyers
      });
    };

    return Workspace;

  })(Backbone.Router);
  new ppu.Workspace;
  return Backbone.history.start({
    pushState: true
  });
});
