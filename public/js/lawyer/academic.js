var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.LawyerAcademic = (function(_super) {
    __extends(LawyerAcademic, _super);

    function LawyerAcademic() {
      return LawyerAcademic.__super__.constructor.apply(this, arguments);
    }

    LawyerAcademic.prototype.urlRoot = "/api/lawyrs/academics";

    return LawyerAcademic;

  })(Backbone.Model);
  ppu.LawyerAcademics = (function(_super) {
    __extends(LawyerAcademics, _super);

    function LawyerAcademics() {
      return LawyerAcademics.__super__.constructor.apply(this, arguments);
    }

    LawyerAcademics.prototype.url = "/api/lawyrs/academics";

    LawyerAcademics.prototype.model = ppu.LawyerAcademic;

    return LawyerAcademics;

  })(Backbone.Collection);
  ppu.LawyerAcademicCreate = (function(_super) {
    __extends(LawyerAcademicCreate, _super);

    function LawyerAcademicCreate() {
      return LawyerAcademicCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerAcademicCreate.prototype.el = $("#lawyer-form-academic");

    LawyerAcademicCreate.prototype.template = $("#lawyer-academic-form-template");

    LawyerAcademicCreate.prototype.events = {
      'click .lawyer-add-academic': 'addForm'
    };

    LawyerAcademicCreate.prototype.initialize = function() {
      return this.appendForm();
    };

    LawyerAcademicCreate.prototype.appendForm = function() {
      return ppu.appendForm(this.el, this.template);
    };

    LawyerAcademicCreate.prototype.addForm = function(e) {
      e.preventDefault();
      return this.appendForm();
    };

    LawyerAcademicCreate.prototype.store = function(lawyer_id) {
      return ppu.saveMultipeForms(this.el, this.model, lawyer_id);
    };

    return LawyerAcademicCreate;

  })(Backbone.View);
  ppu.LawyerAcademicsEditModal = (function(_super) {
    __extends(LawyerAcademicsEditModal, _super);

    function LawyerAcademicsEditModal() {
      return LawyerAcademicsEditModal.__super__.constructor.apply(this, arguments);
    }

    LawyerAcademicsEditModal.prototype.el = $("#lawyer-academic-edit-modal");

    LawyerAcademicsEditModal.prototype.template = $("#lawyer-academic-form-template");

    _.extend(LawyerAcademicsEditModal.prototype, mixins.lawyerRelationshipModalEdit);

    return LawyerAcademicsEditModal;

  })(Backbone.View);
  ppu.LawyerAcademicView = (function(_super) {
    __extends(LawyerAcademicView, _super);

    function LawyerAcademicView() {
      return LawyerAcademicView.__super__.constructor.apply(this, arguments);
    }

    LawyerAcademicView.prototype.tagName = 'li';

    LawyerAcademicView.prototype.template = $('#lawyer-academic-template');

    LawyerAcademicView.prototype.modal = ppu.LawyerAcademicsEditModal;

    _.extend(LawyerAcademicView.prototype, mixins.lawyerRelationshipView);

    return LawyerAcademicView;

  })(Backbone.View);
  ppu.LawyerAcademicModalCreate = (function(_super) {
    __extends(LawyerAcademicModalCreate, _super);

    function LawyerAcademicModalCreate() {
      return LawyerAcademicModalCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerAcademicModalCreate.prototype.el = $("#lawyer-relationship-create-modal");

    LawyerAcademicModalCreate.prototype.template = $("#lawyer-academic-form-template");

    _.extend(LawyerAcademicModalCreate.prototype, mixins.lawyerRelationshipModalCreate);

    return LawyerAcademicModalCreate;

  })(Backbone.View);
  return ppu.LawyerAcademicsEdit = (function(_super) {
    __extends(LawyerAcademicsEdit, _super);

    function LawyerAcademicsEdit() {
      return LawyerAcademicsEdit.__super__.constructor.apply(this, arguments);
    }

    LawyerAcademicsEdit.prototype.el = $("#lawyer-academic-edit");

    LawyerAcademicsEdit.prototype.view = ppu.LawyerAcademicView;

    LawyerAcademicsEdit.prototype.modal = ppu.LawyerAcademicModalCreate;

    _.extend(LawyerAcademicsEdit.prototype, mixins.lawyerRelationshipViews);

    return LawyerAcademicsEdit;

  })(Backbone.View);
});
