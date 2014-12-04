var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.LawyerRecognition = (function(_super) {
    __extends(LawyerRecognition, _super);

    function LawyerRecognition() {
      return LawyerRecognition.__super__.constructor.apply(this, arguments);
    }

    LawyerRecognition.prototype.url = "/api/recognitions";

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
  return ppu.LawyerRecognitionCreate = (function(_super) {
    __extends(LawyerRecognitionCreate, _super);

    function LawyerRecognitionCreate() {
      return LawyerRecognitionCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerRecognitionCreate.prototype.el = $("#lawyer-pharase-form");

    LawyerRecognitionCreate.prototype.template = $("#lawyer-form-pharase-template");

    LawyerRecognitionCreate.prototype.events = {
      'click .lawyer-add-pharase': 'addFields'
    };

    LawyerRecognitionCreate.prototype.addFields = function(e) {
      var source;
      e.preventDefault();
      source = $(this.template).html();
      $(this.el).find('form').append(source);
      return ppu.appendDatePickerYear;
    };

    LawyerRecognitionCreate.prototype.store = function(lawyer_id) {
      var $form, data;
      $form = $(this.el).find('form');
      data = $form.serializeJSON();
      data = _.map(data.fields, function(model) {
        return _.extend(model, {
          lawyer_id: lawyer_id
        });
      });
      return this.model.save({
        recognitions: data
      });
    };

    return LawyerRecognitionCreate;

  })(Backbone.View);
});
