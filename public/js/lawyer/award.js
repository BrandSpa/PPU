var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.LawyerAward = (function(_super) {
    __extends(LawyerAward, _super);

    function LawyerAward() {
      return LawyerAward.__super__.constructor.apply(this, arguments);
    }

    LawyerAward.prototype.urlRoot = "/api/lawyrs/awards";

    return LawyerAward;

  })(Backbone.Model);
  ppu.LawyerAwards = (function(_super) {
    __extends(LawyerAwards, _super);

    function LawyerAwards() {
      return LawyerAwards.__super__.constructor.apply(this, arguments);
    }

    LawyerAwards.prototype.url = "/api/lawyrs/awards";

    LawyerAwards.prototype.model = ppu.LawyerAward;

    return LawyerAwards;

  })(Backbone.Collection);
  ppu.LawyerAwardCreate = (function(_super) {
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
  ppu.LawyerAwardsEditModal = (function(_super) {
    __extends(LawyerAwardsEditModal, _super);

    function LawyerAwardsEditModal() {
      return LawyerAwardsEditModal.__super__.constructor.apply(this, arguments);
    }

    LawyerAwardsEditModal.prototype.el = $("#lawyer-award-edit-modal");

    LawyerAwardsEditModal.prototype.template = $("#lawyer-form-award-template");

    _.extend(LawyerAwardsEditModal.prototype, mixins.lawyerRelationshipModalEdit);

    return LawyerAwardsEditModal;

  })(Backbone.View);
  ppu.LawyerAwardView = (function(_super) {
    __extends(LawyerAwardView, _super);

    function LawyerAwardView() {
      return LawyerAwardView.__super__.constructor.apply(this, arguments);
    }

    LawyerAwardView.prototype.tagName = 'li';

    LawyerAwardView.prototype.template = $('#lawyer-award-template');

    LawyerAwardView.prototype.modal = ppu.LawyerAwardsEditModal;

    _.extend(LawyerAwardView.prototype, mixins.lawyerRelationshipView);

    return LawyerAwardView;

  })(Backbone.View);
  ppu.LawyerAwardModalCreate = (function(_super) {
    __extends(LawyerAwardModalCreate, _super);

    function LawyerAwardModalCreate() {
      return LawyerAwardModalCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerAwardModalCreate.prototype.el = $("#lawyer-relationship-create-modal");

    LawyerAwardModalCreate.prototype.template = $("#lawyer-form-award-template");

    _.extend(LawyerAwardModalCreate.prototype, mixins.lawyerRelationshipModalCreate);

    return LawyerAwardModalCreate;

  })(Backbone.View);
  return ppu.LawyerAwardsEdit = (function(_super) {
    __extends(LawyerAwardsEdit, _super);

    function LawyerAwardsEdit() {
      return LawyerAwardsEdit.__super__.constructor.apply(this, arguments);
    }

    LawyerAwardsEdit.prototype.el = $("#lawyer-award-edit");

    LawyerAwardsEdit.prototype.view = ppu.LawyerAwardView;

    LawyerAwardsEdit.prototype.modal = ppu.LawyerAwardModalCreate;

    _.extend(LawyerAwardsEdit.prototype, mixins.lawyerRelationshipViews);

    return LawyerAwardsEdit;

  })(Backbone.View);
});
