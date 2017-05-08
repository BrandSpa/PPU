$(function() {
  ppu.LawyerEducation = (function(superClass) {
    extend(LawyerEducation, superClass);

    function LawyerEducation() {
      return LawyerEducation.__super__.constructor.apply(this, arguments);
    }

    LawyerEducation.prototype.urlRoot = "/api/lawyrs/educations";

    return LawyerEducation;
  })(Backbone.Model);

  ppu.LawyerEducations = (function(superClass) {
    extend(LawyerEducations, superClass);

    function LawyerEducations() {
      return LawyerEducations.__super__.constructor.apply(this, arguments);
    }

    LawyerEducations.prototype.url = "/api/lawyrs/educations";

    LawyerEducations.prototype.model = ppu.LawyerEducation;

    return LawyerEducations;
  })(Backbone.Collection);

  ppu.LawyerEducationCreate = (function(superClass) {
    extend(LawyerEducationCreate, superClass);

    function LawyerEducationCreate() {
      return LawyerEducationCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerEducationCreate.prototype.el = $("#lawyer-form-education");

    LawyerEducationCreate.prototype.template = $(
      "#lawyer-form-education-template"
    );

    LawyerEducationCreate.prototype.events = {
      "click .lawyer-add-education": "addForm"
    };

    LawyerEducationCreate.prototype.initialize = function() {
      this.appendForm();
      return app.pubsub.bind("lawyer:stored", this.store, this);
    };

    LawyerEducationCreate.prototype.appendForm = function() {
      return ppu.appendForm(this.el, this.template);
    };

    LawyerEducationCreate.prototype.addForm = function(e) {
      e.preventDefault();
      return this.appendForm();
    };

    LawyerEducationCreate.prototype.store = function(data) {
      return ppu.saveMultipeForms(this.el, this.model, data.id);
    };

    return LawyerEducationCreate;
  })(Backbone.View);

  ppu.LawyerEducationModalCreate = (function(superClass) {
    extend(LawyerEducationModalCreate, superClass);

    function LawyerEducationModalCreate() {
      return LawyerEducationModalCreate.__super__.constructor.apply(
        this,
        arguments
      );
    }

    LawyerEducationModalCreate.prototype.el = $(
      "#lawyer-relationship-create-modal"
    );

    LawyerEducationModalCreate.prototype.template = $(
      "#lawyer-form-education-template"
    );

    _.extend(
      LawyerEducationModalCreate.prototype,
      mixins.lawyerRelationshipModalCreate
    );

    return LawyerEducationModalCreate;
  })(Backbone.View);

  ppu.LawyerEducationEditModal = (function(superClass) {
    extend(LawyerEducationEditModal, superClass);

    function LawyerEducationEditModal() {
      return LawyerEducationEditModal.__super__.constructor.apply(
        this,
        arguments
      );
    }

    LawyerEducationEditModal.prototype.el = $("#lawyer-education-edit-modal");

    LawyerEducationEditModal.prototype.template = $(
      "#lawyer-form-education-template"
    );

    _.extend(
      LawyerEducationEditModal.prototype,
      mixins.lawyerRelationshipModalEdit
    );

    return LawyerEducationEditModal;
  })(Backbone.View);

  ppu.LawyerEducationView = (function(superClass) {
    extend(LawyerEducationView, superClass);

    function LawyerEducationView() {
      return LawyerEducationView.__super__.constructor.apply(this, arguments);
    }

    LawyerEducationView.prototype.tagName = "li";

    LawyerEducationView.prototype.template = $("#lawyer-education-template");

    LawyerEducationView.prototype.modal = ppu.LawyerEducationEditModal;

    _.extend(LawyerEducationView.prototype, mixins.lawyerRelationshipView);

    return LawyerEducationView;
  })(Backbone.View);

  ppu.LawyerEducationsEdit = (function(superClass) {
    extend(LawyerEducationsEdit, superClass);

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
