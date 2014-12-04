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
  return ppu.LawyerJobCreate = (function(_super) {
    __extends(LawyerJobCreate, _super);

    function LawyerJobCreate() {
      return LawyerJobCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerJobCreate.prototype.el = $("#lawyer-job-form");

    LawyerJobCreate.prototype.template = $("#lawyer-form-job-template");

    LawyerJobCreate.prototype.events = {
      'click .lawyer-add-job': 'addFields'
    };

    LawyerJobCreate.prototype.addFields = function(e) {
      var source;
      e.preventDefault();
      source = $(this.template).html();
      $(this.el).find('form').append(source);
      return ppu.appendDatePickerYear;
    };

    LawyerJobCreate.prototype.store = function(lawyer_id) {
      var $form, data;
      $form = $(this.el).find('form');
      data = $form.serializeJSON();
      data = _.map(data.fields, function(model) {
        return _.extend(model, {
          lawyer_id: lawyer_id
        });
      });
      return this.model.save({
        jobs: data
      });
    };

    return LawyerJobCreate;

  })(Backbone.View);
});
