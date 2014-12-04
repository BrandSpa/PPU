var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.LawyerInstitution = (function(_super) {
    __extends(LawyerInstitution, _super);

    function LawyerInstitution() {
      return LawyerInstitution.__super__.constructor.apply(this, arguments);
    }

    LawyerInstitution.prototype.url = "/api/institutions";

    return LawyerInstitution;

  })(Backbone.Model);
  ppu.LawyerInstitutions = (function(_super) {
    __extends(LawyerInstitutions, _super);

    function LawyerInstitutions() {
      return LawyerInstitutions.__super__.constructor.apply(this, arguments);
    }

    LawyerInstitutions.prototype.url = "/api/institutions";

    LawyerInstitutions.prototype.model = ppu.LawyerInstitution;

    return LawyerInstitutions;

  })(Backbone.Collection);
  return ppu.LawyerInstitutionCreate = (function(_super) {
    __extends(LawyerInstitutionCreate, _super);

    function LawyerInstitutionCreate() {
      return LawyerInstitutionCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerInstitutionCreate.prototype.el = $("#lawyer-institution-form");

    LawyerInstitutionCreate.prototype.template = $("#lawyer-form-institution-template");

    LawyerInstitutionCreate.prototype.events = {
      'click .lawyer-add-institution': 'addFields'
    };

    LawyerInstitutionCreate.prototype.addFields = function(e) {
      var source;
      e.preventDefault();
      source = $(this.template).html();
      $(this.el).find('form').append(source);
      return ppu.appendDatePickerYear;
    };

    LawyerInstitutionCreate.prototype.store = function(lawyer_id) {
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

    return LawyerInstitutionCreate;

  })(Backbone.View);
});
