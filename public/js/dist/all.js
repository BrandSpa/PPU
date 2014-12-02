var lang;

window.ppu = {};

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
    return toastr.error(message);
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
      "nuevo-abogado": 'adminLawyer',
      ":lang/nuevo-abogado": 'adminLawyer'
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

    Workspace.prototype.adminLawyer = function() {
      var model;
      model = new ppu.Lawyer;
      return ppu.lawyerCreate = new ppu.LawyerCreate({
        model: model
      });
    };

    return Workspace;

  })(Backbone.Router);
  new ppu.Workspace;
  return Backbone.history.start({
    pushState: true
  });
});
