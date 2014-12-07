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
      'click .lawyer-add-pharase': 'addForm'
    };

    LawyerPharaseCreate.prototype.initialize = function() {
      return this.appendForm();
    };

    LawyerPharaseCreate.prototype.appendForm = function() {
      return ppu.appendForm(this.el, this.template);
    };

    LawyerPharaseCreate.prototype.addForm = function(e) {
      e.preventDefault();
      return this.appendForm();
    };

    LawyerPharaseCreate.prototype.store = function(lawyer_id) {
      return ppu.saveMultipeForms(this.el, this.model, lawyer_id);
    };

    return LawyerPharaseCreate;

  })(Backbone.View);
});
