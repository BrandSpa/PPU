var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.LawyerEducation = (function(_super) {
    __extends(LawyerEducation, _super);

    function LawyerEducation() {
      return LawyerEducation.__super__.constructor.apply(this, arguments);
    }

    LawyerEducation.prototype.url = "/api/educations";

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
  return ppu.LawyerEducationCreate = (function(_super) {
    __extends(LawyerEducationCreate, _super);

    function LawyerEducationCreate() {
      return LawyerEducationCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerEducationCreate.prototype.el = $("#lawyer-education-form");

    LawyerEducationCreate.prototype.template = $("#lawyer-form-education-template");

    LawyerEducationCreate.prototype.events = {
      'click .lawyer-add-education': 'addFields'
    };

    LawyerEducationCreate.prototype.addFields = function(e) {
      var source;
      e.preventDefault();
      source = $(this.template).html();
      $(this.el).find('form').append(source);
      return ppu.appendDatePickerYear;
    };

    LawyerEducationCreate.prototype.store = function(lawyer_id) {
      var $form, data;
      $form = $(this.el).find('form');
      data = $form.serializeJSON();
      data = _.map(data.fields, function(model) {
        return _.extend(model, {
          lawyer_id: lawyer_id
        });
      });
      return this.model.save({
        educations: data
      });
    };

    return LawyerEducationCreate;

  })(Backbone.View);
});
