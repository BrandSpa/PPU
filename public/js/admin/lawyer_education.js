var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.LawyerEducation = (function(_super) {
    __extends(LawyerEducation, _super);

    function LawyerEducation() {
      return LawyerEducation.__super__.constructor.apply(this, arguments);
    }

    LawyerEducation.prototype.urlRoot = "/api/educations";

    return LawyerEducation;

  })(Backbone.Model);
  ppu.LawyerEducations = (function(_super) {
    __extends(LawyerEducations, _super);

    function LawyerEducations() {
      return LawyerEducations.__super__.constructor.apply(this, arguments);
    }

    LawyerEducations.prototype.url = "/api/educations";

    LawyerEducations.prototype.model = ppu.LawyerEducation;

    return LawyerEducations;

  })(Backbone.Collection);
  ppu.LawyerEducationCreate = (function(_super) {
    __extends(LawyerEducationCreate, _super);

    function LawyerEducationCreate() {
      return LawyerEducationCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerEducationCreate.prototype.el = $("#lawyer-form-education");

    LawyerEducationCreate.prototype.template = $("#lawyer-form-education-template");

    LawyerEducationCreate.prototype.events = {
      'click .lawyer-add-education': 'addForm'
    };

    LawyerEducationCreate.prototype.initialize = function() {
      return this.appendForm();
    };

    LawyerEducationCreate.prototype.appendForm = function() {
      return ppu.appendForm(this.el, this.template);
    };

    LawyerEducationCreate.prototype.addForm = function(e) {
      e.preventDefault();
      return this.appendForm();
    };

    LawyerEducationCreate.prototype.store = function(lawyer_id) {
      return ppu.saveMultipeForms(this.el, this.model, lawyer_id);
    };

    return LawyerEducationCreate;

  })(Backbone.View);
  ppu.LawyerEducationModalCreate = (function(_super) {
    __extends(LawyerEducationModalCreate, _super);

    function LawyerEducationModalCreate() {
      return LawyerEducationModalCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerEducationModalCreate.prototype.el = $("#lawyer-relationship-create-modal");

    LawyerEducationModalCreate.prototype.template = $("#lawyer-form-education-template");

    _.extend(LawyerEducationModalCreate.prototype, mixins.lawyerRelationshipModalCreate);

    return LawyerEducationModalCreate;

  })(Backbone.View);
  ppu.LawyerEducationEditModal = (function(_super) {
    __extends(LawyerEducationEditModal, _super);

    function LawyerEducationEditModal() {
      return LawyerEducationEditModal.__super__.constructor.apply(this, arguments);
    }

    LawyerEducationEditModal.prototype.el = $("#lawyer-education-edit-modal");

    LawyerEducationEditModal.prototype.template = $("#lawyer-form-education-template");

    _.extend(LawyerEducationEditModal.prototype, mixins.lawyerRelationshipModalEdit);

    return LawyerEducationEditModal;

  })(Backbone.View);
  ppu.LawyerEducationView = (function(_super) {
    __extends(LawyerEducationView, _super);

    function LawyerEducationView() {
      return LawyerEducationView.__super__.constructor.apply(this, arguments);
    }

    LawyerEducationView.prototype.tagName = 'li';

    LawyerEducationView.prototype.template = $('#lawyer-education-template');

    LawyerEducationView.prototype.modal = ppu.LawyerEducationEditModal;

    _.extend(LawyerEducationView.prototype, mixins.lawyerRelationshipView);

    return LawyerEducationView;

  })(Backbone.View);
  return ppu.LawyerEducationsEdit = (function(_super) {
    __extends(LawyerEducationsEdit, _super);

    function LawyerEducationsEdit() {
      return LawyerEducationsEdit.__super__.constructor.apply(this, arguments);
    }

    LawyerEducationsEdit.prototype.el = $("#lawyer-education-edit");

    LawyerEducationsEdit.prototype.view = ppu.LawyerEducationView;

    LawyerEducationsEdit.prototype.modal = ppu.LawyerEducationModalCreate;

    _.extend(LawyerEducationsEdit.prototype, mixins.lawyerRelationshipViews);

    return LawyerEducationsEdit;

  })(Backbone.View);
});
