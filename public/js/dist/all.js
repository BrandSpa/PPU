var lang;

window.ppu = {};

Dropzone.autoDiscover = false;

ppu.pathUrl = window.location.pathname.split('/');

lang = ppu.pathUrl[1];

if (lang === "en") {
  $.ajaxSetup({
    data: {
      lang: "en"
    }
  });
}

Backbone.View.prototype.en = function() {
  lang = ppu.pathUrl[1];
  if (lang === "en") {
    return true;
  } else {
    return false;
  }
};

Backbone.View.prototype.showErrors = function(model, response) {
  var errors;
  errors = JSON.parse(response.responseText);
  return _.each(errors, function(message, row) {
    console.log(message);
    return toastr.error(message);
  });
};

Backbone.View.prototype.closeModal = function() {
  this.remove();
  $('.modal-backdrop').remove();
  return $('body').removeClass('modal-open');
};

ppu.appendDatePickerYear = function(el) {
  return $(el).find('.datepicker-year').datepicker({
    format: 'yyyy',
    viewMode: "years",
    minViewMode: "years",
    language: 'es',
    autoclose: true
  });
};

ppu.appendForm = function(el, template) {
  var source, temp;
  source = $(template).html();
  temp = Handlebars.compile(source);
  $(el).find('.fields').append(temp).fadeIn();
  return ppu.appendDatePickerYear(el);
};

ppu.ajaxOptions = function(type, data) {
  return {
    type: type,
    data: data,
    processData: false,
    cache: false,
    contentType: false
  };
};

ppu.saveMultipeForms = function(el, model, lawyer_id) {
  var $forms;
  $forms = $(el).find("form");
  model = model;
  return $forms.each(function(index) {
    var data;
    data = new FormData($forms[index]);
    data.append("fields[lawyer_id]", lawyer_id);
    return model.save(data, $.extend({}, ppu.ajaxOptions("POST", data)));
  });
};

$(document).ajaxSend(function(e, xhr, options) {
  var token;
  token = $("meta[name='csrf-token']").attr("content");
  return xhr.setRequestHeader("X-CSRF-Token", token);
});

$(document).find('.datepicker-year').datepicker({
  format: 'yyyy',
  viewMode: "years",
  minViewMode: "years",
  language: 'es',
  autoclose: true
});

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
      return ppu.lawyerCreate = new ppu.LawyerCreate;
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
