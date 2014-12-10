var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.LawyerAward = (function(_super) {
    __extends(LawyerAward, _super);

    function LawyerAward() {
      return LawyerAward.__super__.constructor.apply(this, arguments);
    }

    LawyerAward.prototype.urlRoot = "/api/awards";

    return LawyerAward;

  })(Backbone.Model);
  ppu.LawyerAwards = (function(_super) {
    __extends(LawyerAwards, _super);

    function LawyerAwards() {
      return LawyerAwards.__super__.constructor.apply(this, arguments);
    }

    LawyerAwards.prototype.url = "/api/awards";

    LawyerAwards.prototype.model = ppu.LawyerAward;

    return LawyerAwards;

  })(Backbone.Collection);
  return ppu.LawyerAwardCreate = (function(_super) {
    __extends(LawyerAwardCreate, _super);

    function LawyerAwardCreate() {
      return LawyerAwardCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerAwardCreate.prototype.el = $("#lawyer-form-award");

    LawyerAwardCreate.prototype.template = $("#lawyer-form-award-template");

    LawyerAwardCreate.prototype.events = {
      'click .lawyer-add-award': 'addForm'
    };

    LawyerAwardCreate.prototype.initialize = function() {
      return this.appendForm();
    };

    LawyerAwardCreate.prototype.appendForm = function() {
      return ppu.appendForm(this.el, this.template);
    };

    LawyerAwardCreate.prototype.addForm = function(e) {
      e.preventDefault();
      return this.appendForm();
    };

    LawyerAwardCreate.prototype.store = function(lawyer_id) {
      return ppu.saveMultipeForms(this.el, this.model, lawyer_id);
    };

    return LawyerAwardCreate;

  })(Backbone.View);
});
