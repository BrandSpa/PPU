var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.LawyerRecognition = (function(_super) {
    __extends(LawyerRecognition, _super);

    function LawyerRecognition() {
      return LawyerRecognition.__super__.constructor.apply(this, arguments);
    }

    LawyerRecognition.prototype.urlRoot = "/api/recognitions";

    return LawyerRecognition;

  })(Backbone.Model);
  ppu.LawyerRecognitions = (function(_super) {
    __extends(LawyerRecognitions, _super);

    function LawyerRecognitions() {
      return LawyerRecognitions.__super__.constructor.apply(this, arguments);
    }

    LawyerRecognitions.prototype.url = "/api/recognitions";

    LawyerRecognitions.prototype.model = ppu.LawyerRecognition;

    return LawyerRecognitions;

  })(Backbone.Collection);
  ppu.LawyerRecognitionCreate = (function(_super) {
    __extends(LawyerRecognitionCreate, _super);

    function LawyerRecognitionCreate() {
      return LawyerRecognitionCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerRecognitionCreate.prototype.el = $("#lawyer-form-recognition");

    LawyerRecognitionCreate.prototype.template = $("#lawyer-form-recognition-template");

    LawyerRecognitionCreate.prototype.events = {
      'click .lawyer-add-recognition': 'addForm'
    };

    LawyerRecognitionCreate.prototype.initialize = function() {
      return this.appendForm();
    };

    LawyerRecognitionCreate.prototype.appendForm = function() {
      return ppu.appendForm(this.el, this.template);
    };

    LawyerRecognitionCreate.prototype.addForm = function(e) {
      e.preventDefault();
      return this.appendForm();
    };

    LawyerRecognitionCreate.prototype.store = function(lawyer_id) {
      return ppu.saveMultipeForms(this.el, this.model, lawyer_id);
    };

    return LawyerRecognitionCreate;

  })(Backbone.View);
  ppu.LawyerRecognitionsEditModal = (function(_super) {
    __extends(LawyerRecognitionsEditModal, _super);

    function LawyerRecognitionsEditModal() {
      return LawyerRecognitionsEditModal.__super__.constructor.apply(this, arguments);
    }

    LawyerRecognitionsEditModal.prototype.el = $("#lawyer-recognition-edit-modal");

    LawyerRecognitionsEditModal.prototype.template = $("#lawyer-form-recognition-template");

    _.extend(LawyerRecognitionsEditModal.prototype, mixins.lawyerRelationshipModalEdit);

    return LawyerRecognitionsEditModal;

  })(Backbone.View);
  ppu.LawyerRecognitionView = (function(_super) {
    __extends(LawyerRecognitionView, _super);

    function LawyerRecognitionView() {
      return LawyerRecognitionView.__super__.constructor.apply(this, arguments);
    }

    LawyerRecognitionView.prototype.tagName = 'li';

    LawyerRecognitionView.prototype.template = $('#lawyer-recognition-template');

    LawyerRecognitionView.prototype.modal = ppu.LawyerRecognitionsEditModal;

    _.extend(LawyerRecognitionView.prototype, mixins.lawyerRelationshipView);

    return LawyerRecognitionView;

  })(Backbone.View);
  ppu.LawyerRecognitionModalCreate = (function(_super) {
    __extends(LawyerRecognitionModalCreate, _super);

    function LawyerRecognitionModalCreate() {
      return LawyerRecognitionModalCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerRecognitionModalCreate.prototype.el = $("#lawyer-relationship-create-modal");

    LawyerRecognitionModalCreate.prototype.template = $("#lawyer-form-recognition-template");

    _.extend(LawyerRecognitionModalCreate.prototype, mixins.lawyerRelationshipModalCreate);

    return LawyerRecognitionModalCreate;

  })(Backbone.View);
  return ppu.LawyerRecognitionsEdit = (function(_super) {
    __extends(LawyerRecognitionsEdit, _super);

    function LawyerRecognitionsEdit() {
      return LawyerRecognitionsEdit.__super__.constructor.apply(this, arguments);
    }

    LawyerRecognitionsEdit.prototype.el = $("#lawyer-recognition-edit");

    LawyerRecognitionsEdit.prototype.view = ppu.LawyerRecognitionView;

    LawyerRecognitionsEdit.prototype.modal = ppu.LawyerRecognitionModalCreate;

    _.extend(LawyerRecognitionsEdit.prototype, mixins.lawyerRelationshipViews);

    return LawyerRecognitionsEdit;

  })(Backbone.View);
});
