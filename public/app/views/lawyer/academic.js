
  $(function() {
    ppu.LawyerAcademic = (function(superClass) {
      extend(LawyerAcademic, superClass);

      function LawyerAcademic() {
        return LawyerAcademic.__super__.constructor.apply(this, arguments);
      }

      LawyerAcademic.prototype.urlRoot = "/api/lawyrs/academics";

      return LawyerAcademic;

    })(Backbone.Model);

    ppu.LawyerAcademics = (function(superClass) {
      extend(LawyerAcademics, superClass);

      function LawyerAcademics() {
        return LawyerAcademics.__super__.constructor.apply(this, arguments);
      }

      LawyerAcademics.prototype.url = "/api/lawyrs/academics";

      LawyerAcademics.prototype.model = ppu.LawyerAcademic;

      return LawyerAcademics;

    })(Backbone.Collection);
    
    ppu.LawyerAcademicCreate = (function(superClass) {
      extend(LawyerAcademicCreate, superClass);

      function LawyerAcademicCreate() {
        return LawyerAcademicCreate.__super__.constructor.apply(this, arguments);
      }

      LawyerAcademicCreate.prototype.el = $("#lawyer-form-academic");

      LawyerAcademicCreate.prototype.template = $("#lawyer-academic-form-template");

      LawyerAcademicCreate.prototype.events = {
        'click .lawyer-add-academic': 'addForm'
      };

      LawyerAcademicCreate.prototype.initialize = function() {
        this.appendForm();
        return app.pubsub.bind('lawyer:stored', this.store, this);
      };

      LawyerAcademicCreate.prototype.appendForm = function() {
        return ppu.appendForm(this.el, this.template);
      };

      LawyerAcademicCreate.prototype.addForm = function(e) {
        e.preventDefault();
        return this.appendForm();
      };

      LawyerAcademicCreate.prototype.store = function(data) {
        return ppu.saveMultipeForms(this.el, this.model, data.id);
      };

      return LawyerAcademicCreate;

    })(Backbone.View);
    ppu.LawyerAcademicsEditModal = (function(superClass) {
      extend(LawyerAcademicsEditModal, superClass);

      function LawyerAcademicsEditModal() {
        return LawyerAcademicsEditModal.__super__.constructor.apply(this, arguments);
      }

      LawyerAcademicsEditModal.prototype.el = $("#lawyer-academic-edit-modal");

      LawyerAcademicsEditModal.prototype.template = $("#lawyer-academic-form-template");

      _.extend(LawyerAcademicsEditModal.prototype, mixins.lawyerRelationshipModalEdit);

      return LawyerAcademicsEditModal;

    })(Backbone.View);
    ppu.LawyerAcademicView = (function(superClass) {
      extend(LawyerAcademicView, superClass);

      function LawyerAcademicView() {
        return LawyerAcademicView.__super__.constructor.apply(this, arguments);
      }

      LawyerAcademicView.prototype.tagName = 'li';

      LawyerAcademicView.prototype.template = $('#lawyer-academic-template');

      LawyerAcademicView.prototype.modal = ppu.LawyerAcademicsEditModal;

      _.extend(LawyerAcademicView.prototype, mixins.lawyerRelationshipView);

      return LawyerAcademicView;

    })(Backbone.View);
    ppu.LawyerAcademicModalCreate = (function(superClass) {
      extend(LawyerAcademicModalCreate, superClass);

      function LawyerAcademicModalCreate() {
        return LawyerAcademicModalCreate.__super__.constructor.apply(this, arguments);
      }

      LawyerAcademicModalCreate.prototype.el = $("#lawyer-relationship-create-modal");

      LawyerAcademicModalCreate.prototype.template = $("#lawyer-academic-form-template");

      _.extend(LawyerAcademicModalCreate.prototype, mixins.lawyerRelationshipModalCreate);

      return LawyerAcademicModalCreate;

    })(Backbone.View);
    return ppu.LawyerAcademicsEdit = (function(superClass) {
      extend(LawyerAcademicsEdit, superClass);

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

