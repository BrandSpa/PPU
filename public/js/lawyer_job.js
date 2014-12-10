var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.LawyerJob = (function(_super) {
    __extends(LawyerJob, _super);

    function LawyerJob() {
      return LawyerJob.__super__.constructor.apply(this, arguments);
    }

    LawyerJob.prototype.url = "/api/jobs";

    return LawyerJob;

  })(Backbone.Model);
  ppu.LawyerJobs = (function(_super) {
    __extends(LawyerJobs, _super);

    function LawyerJobs() {
      return LawyerJobs.__super__.constructor.apply(this, arguments);
    }

    LawyerJobs.prototype.url = "/api/jobs";

    LawyerJobs.prototype.model = ppu.LawyerJob;

    return LawyerJobs;

  })(Backbone.Collection);
  ppu.LawyerJobCreate = (function(_super) {
    __extends(LawyerJobCreate, _super);

    function LawyerJobCreate() {
      return LawyerJobCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerJobCreate.prototype.el = $("#lawyer-form-job");

    LawyerJobCreate.prototype.template = $("#lawyer-form-job-template");

    LawyerJobCreate.prototype.events = {
      'click .lawyer-add-job': 'addForm'
    };

    LawyerJobCreate.prototype.initialize = function() {
      return this.appendForm();
    };

    LawyerJobCreate.prototype.appendForm = function() {
      return ppu.appendForm(this.el, this.template);
    };

    LawyerJobCreate.prototype.addForm = function(e) {
      e.preventDefault();
      return this.appendForm();
    };

    LawyerJobCreate.prototype.store = function(lawyer_id) {
      return ppu.saveMultipeForms(this.el, this.model, lawyer_id);
    };

    return LawyerJobCreate;

  })(Backbone.View);
  ppu.LawyerJobView = (function(_super) {
    __extends(LawyerJobView, _super);

    function LawyerJobView() {
      return LawyerJobView.__super__.constructor.apply(this, arguments);
    }

    LawyerJobView.prototype.tagName = 'li';

    LawyerJobView.prototype.template = $('#lawyer-job-template');

    _.extend(LawyerJobView.prototype, mixins.lawyerRelationshipView);

    return LawyerJobView;

  })(Backbone.View);
  return ppu.LawyerJobsEdit = (function(_super) {
    __extends(LawyerJobsEdit, _super);

    function LawyerJobsEdit() {
      return LawyerJobsEdit.__super__.constructor.apply(this, arguments);
    }

    LawyerJobsEdit.prototype.el = $("#lawyer-job-edit");

    LawyerJobsEdit.prototype.view = ppu.LawyerJobView;

    _.extend(LawyerJobsEdit.prototype, mixins.lawyerRelationshipViews);

    return LawyerJobsEdit;

  })(Backbone.View);
});
