var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  ppu.LawyerRecognition = (function(superClass) {
    extend(LawyerRecognition, superClass);

    function LawyerRecognition() {
      return LawyerRecognition.__super__.constructor.apply(this, arguments);
    }

    LawyerRecognition.prototype.urlRoot = "/api/lawyrs/recognitions";

    return LawyerRecognition;

  })(Backbone.Model);
  ppu.LawyerRecognitions = (function(superClass) {
    extend(LawyerRecognitions, superClass);

    function LawyerRecognitions() {
      return LawyerRecognitions.__super__.constructor.apply(this, arguments);
    }

    LawyerRecognitions.prototype.url = "/api/lawyrs/recognitions";

    LawyerRecognitions.prototype.model = ppu.LawyerRecognition;

    return LawyerRecognitions;

  })(Backbone.Collection);
  ppu.LawyerRecognitionCreate = (function(superClass) {
    extend(LawyerRecognitionCreate, superClass);

    function LawyerRecognitionCreate() {
      return LawyerRecognitionCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerRecognitionCreate.prototype.el = $("#lawyer-form-recognition");

    LawyerRecognitionCreate.prototype.template = $("#lawyer-form-recognition-template");

    LawyerRecognitionCreate.prototype.events = {
      'click .lawyer-add-recognition': 'addForm'
    };

    LawyerRecognitionCreate.prototype.initialize = function() {
      this.appendForm();
      return app.pubsub.bind('lawyer:stored', this.store, this);
    };

    LawyerRecognitionCreate.prototype.appendForm = function() {
      return ppu.appendForm(this.el, this.template);
    };

    LawyerRecognitionCreate.prototype.addForm = function(e) {
      e.preventDefault();
      return this.appendForm();
    };

    LawyerRecognitionCreate.prototype.store = function(data) {
      return ppu.saveMultipeForms(this.el, this.model, data.id);
    };

    return LawyerRecognitionCreate;

  })(Backbone.View);
  ppu.LawyerRecognitionsEditModal = (function(superClass) {
    extend(LawyerRecognitionsEditModal, superClass);

    function LawyerRecognitionsEditModal() {
      return LawyerRecognitionsEditModal.__super__.constructor.apply(this, arguments);
    }

    LawyerRecognitionsEditModal.prototype.el = $("#lawyer-recognition-edit-modal");

    LawyerRecognitionsEditModal.prototype.template = $("#lawyer-form-recognition-template");

    _.extend(LawyerRecognitionsEditModal.prototype, mixins.lawyerRelationshipModalEdit);

    return LawyerRecognitionsEditModal;

  })(Backbone.View);
  ppu.LawyerRecognitionView = (function(superClass) {
    extend(LawyerRecognitionView, superClass);

    function LawyerRecognitionView() {
      return LawyerRecognitionView.__super__.constructor.apply(this, arguments);
    }

    LawyerRecognitionView.prototype.tagName = 'li';

    LawyerRecognitionView.prototype.template = $('#lawyer-recognition-template');

    LawyerRecognitionView.prototype.modal = ppu.LawyerRecognitionsEditModal;

    _.extend(LawyerRecognitionView.prototype, mixins.lawyerRelationshipView);

    return LawyerRecognitionView;

  })(Backbone.View);
  ppu.LawyerRecognitionModalCreate = (function(superClass) {
    extend(LawyerRecognitionModalCreate, superClass);

    function LawyerRecognitionModalCreate() {
      return LawyerRecognitionModalCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerRecognitionModalCreate.prototype.el = $("#lawyer-relationship-create-modal");

    LawyerRecognitionModalCreate.prototype.template = $("#lawyer-form-recognition-template");

    _.extend(LawyerRecognitionModalCreate.prototype, mixins.lawyerRelationshipModalCreate);

    return LawyerRecognitionModalCreate;

  })(Backbone.View);
  return ppu.LawyerRecognitionsEdit = (function(superClass) {
    extend(LawyerRecognitionsEdit, superClass);

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
