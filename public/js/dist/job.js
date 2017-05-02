var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  ppu.LawyerJob = (function(superClass) {
    extend(LawyerJob, superClass);

    function LawyerJob() {
      return LawyerJob.__super__.constructor.apply(this, arguments);
    }

    LawyerJob.prototype.urlRoot = "/api/lawyrs/jobs";

    return LawyerJob;

  })(Backbone.Model);
  ppu.LawyerJobs = (function(superClass) {
    extend(LawyerJobs, superClass);

    function LawyerJobs() {
      return LawyerJobs.__super__.constructor.apply(this, arguments);
    }

    LawyerJobs.prototype.url = "/api/lawyrs/jobs";

    LawyerJobs.prototype.model = ppu.LawyerJob;

    return LawyerJobs;

  })(Backbone.Collection);
  ppu.LawyerJobCreate = (function(superClass) {
    extend(LawyerJobCreate, superClass);

    function LawyerJobCreate() {
      return LawyerJobCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerJobCreate.prototype.el = $("#lawyer-form-job");

    LawyerJobCreate.prototype.template = $("#lawyer-form-job-template");

    LawyerJobCreate.prototype.events = {
      'click .lawyer-add-job': 'addForm'
    };

    LawyerJobCreate.prototype.initialize = function() {
      this.appendForm();
      return app.pubsub.bind('lawyer:stored', this.store, this);
    };

    LawyerJobCreate.prototype.appendForm = function() {
      return ppu.appendForm(this.el, this.template);
    };

    LawyerJobCreate.prototype.addForm = function(e) {
      e.preventDefault();
      return this.appendForm();
    };

    LawyerJobCreate.prototype.store = function(data) {
      return ppu.saveMultipeForms(this.el, this.model, data.id);
    };

    return LawyerJobCreate;

  })(Backbone.View);
  ppu.LawyerJobsEditModal = (function(superClass) {
    extend(LawyerJobsEditModal, superClass);

    function LawyerJobsEditModal() {
      return LawyerJobsEditModal.__super__.constructor.apply(this, arguments);
    }

    LawyerJobsEditModal.prototype.el = $("#lawyer-job-edit-modal");

    LawyerJobsEditModal.prototype.template = $("#lawyer-form-job-template");

    _.extend(LawyerJobsEditModal.prototype, mixins.lawyerRelationshipModalEdit);

    return LawyerJobsEditModal;

  })(Backbone.View);
  ppu.LawyerJobView = (function(superClass) {
    extend(LawyerJobView, superClass);

    function LawyerJobView() {
      return LawyerJobView.__super__.constructor.apply(this, arguments);
    }

    LawyerJobView.prototype.tagName = 'li';

    LawyerJobView.prototype.template = $('#lawyer-job-template');

    LawyerJobView.prototype.modal = ppu.LawyerJobsEditModal;

    _.extend(LawyerJobView.prototype, mixins.lawyerRelationshipView);

    return LawyerJobView;

  })(Backbone.View);
  ppu.LawyerJobModalCreate = (function(superClass) {
    extend(LawyerJobModalCreate, superClass);

    function LawyerJobModalCreate() {
      return LawyerJobModalCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerJobModalCreate.prototype.el = $("#lawyer-relationship-create-modal");

    LawyerJobModalCreate.prototype.template = $("#lawyer-form-job-template");

    _.extend(LawyerJobModalCreate.prototype, mixins.lawyerRelationshipModalCreate);

    return LawyerJobModalCreate;

  })(Backbone.View);
  return ppu.LawyerJobsEdit = (function(superClass) {
    extend(LawyerJobsEdit, superClass);

    function LawyerJobsEdit() {
      return LawyerJobsEdit.__super__.constructor.apply(this, arguments);
    }

    LawyerJobsEdit.prototype.el = $("#lawyer-job-edit");

    LawyerJobsEdit.prototype.view = ppu.LawyerJobView;

    LawyerJobsEdit.prototype.modal = ppu.LawyerJobModalCreate;

    _.extend(LawyerJobsEdit.prototype, mixins.lawyerRelationshipViews);

    return LawyerJobsEdit;

  })(Backbone.View);
});
