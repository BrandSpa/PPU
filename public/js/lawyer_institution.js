var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.LawyerInstitution = (function(_super) {
    __extends(LawyerInstitution, _super);

    function LawyerInstitution() {
      return LawyerInstitution.__super__.constructor.apply(this, arguments);
    }

    LawyerInstitution.prototype.url = "/api/institutions";

    return LawyerInstitution;

  })(Backbone.Model);
  ppu.LawyerInstitutions = (function(_super) {
    __extends(LawyerInstitutions, _super);

    function LawyerInstitutions() {
      return LawyerInstitutions.__super__.constructor.apply(this, arguments);
    }

    LawyerInstitutions.prototype.url = "/api/institutions";

    LawyerInstitutions.prototype.model = ppu.LawyerInstitution;

    return LawyerInstitutions;

  })(Backbone.Collection);
  ppu.LawyerInstitutionCreate = (function(_super) {
    __extends(LawyerInstitutionCreate, _super);

    function LawyerInstitutionCreate() {
      return LawyerInstitutionCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerInstitutionCreate.prototype.el = $("#lawyer-form-institution");

    LawyerInstitutionCreate.prototype.template = $("#lawyer-form-institution-template");

    LawyerInstitutionCreate.prototype.events = {
      'click .lawyer-add-institution': 'addForm'
    };

    LawyerInstitutionCreate.prototype.initialize = function() {
      return this.appendForm();
    };

    LawyerInstitutionCreate.prototype.appendForm = function() {
      return ppu.appendForm(this.el, this.template);
    };

    LawyerInstitutionCreate.prototype.addForm = function(e) {
      e.preventDefault();
      return this.appendForm();
    };

    LawyerInstitutionCreate.prototype.store = function(lawyer_id) {
      return ppu.saveMultipeForms(this.el, this.model, lawyer_id);
    };

    return LawyerInstitutionCreate;

  })(Backbone.View);
  ppu.LawyerInstitutionView = (function(_super) {
    __extends(LawyerInstitutionView, _super);

    function LawyerInstitutionView() {
      return LawyerInstitutionView.__super__.constructor.apply(this, arguments);
    }

    LawyerInstitutionView.prototype.tagName = 'li';

    LawyerInstitutionView.prototype.template = $('#lawyer-institution-template');

    _.extend(LawyerInstitutionView.prototype, mixins.lawyerRelationshipView);

    return LawyerInstitutionView;

  })(Backbone.View);
  return ppu.LawyerInstitutionsEdit = (function(_super) {
    __extends(LawyerInstitutionsEdit, _super);

    function LawyerInstitutionsEdit() {
      return LawyerInstitutionsEdit.__super__.constructor.apply(this, arguments);
    }

    LawyerInstitutionsEdit.prototype.el = $("#lawyer-institution-edit");

    LawyerInstitutionsEdit.prototype.view = ppu.LawyerInstitutionView;

    _.extend(LawyerInstitutionsEdit.prototype, mixins.lawyerRelationshipViews);

    return LawyerInstitutionsEdit;

  })(Backbone.View);
});
