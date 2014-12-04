var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.LawyerPharase = (function(_super) {
    __extends(LawyerPharase, _super);

    function LawyerPharase() {
      return LawyerPharase.__super__.constructor.apply(this, arguments);
    }

    LawyerPharase.prototype.url = "/api/pharases";

    return LawyerPharase;

  })(Backbone.Model);
  ppu.LawyerPharases = (function(_super) {
    __extends(LawyerPharases, _super);

    function LawyerPharases() {
      return LawyerPharases.__super__.constructor.apply(this, arguments);
    }

    LawyerPharases.prototype.url = "/api/pharases";

    LawyerPharases.prototype.model = ppu.LawyerPharase;

    return LawyerPharases;

  })(Backbone.Collection);
  return ppu.LawyerPharaseCreate = (function(_super) {
    __extends(LawyerPharaseCreate, _super);

    function LawyerPharaseCreate() {
      return LawyerPharaseCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerPharaseCreate.prototype.el = $("#lawyer-pharase-form");

    LawyerPharaseCreate.prototype.template = $("#lawyer-form-pharase-template");

    LawyerPharaseCreate.prototype.events = {
      'click .lawyer-add-pharase': 'addFields'
    };

    LawyerPharaseCreate.prototype.addFields = function(e) {
      var source;
      e.preventDefault();
      source = $(this.template).html();
      $(this.el).find('form').append(source);
      return ppu.appendDatePickerYear;
    };

    LawyerPharaseCreate.prototype.store = function(lawyer_id) {
      var $form, data;
      $form = $(this.el).find('form');
      data = $form.serializeJSON();
      data = _.map(data.fields, function(model) {
        return _.extend(model, {
          lawyer_id: lawyer_id
        });
      });
      return this.model.save({
        pharases: data
      });
    };

    return LawyerPharaseCreate;

  })(Backbone.View);
});
