var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  ppu.LawyerAward = (function(superClass) {
    extend(LawyerAward, superClass);

    function LawyerAward() {
      return LawyerAward.__super__.constructor.apply(this, arguments);
    }

    LawyerAward.prototype.urlRoot = "/api/lawyrs/awards";

    return LawyerAward;

  })(Backbone.Model);
  ppu.LawyerAwards = (function(superClass) {
    extend(LawyerAwards, superClass);

    function LawyerAwards() {
      return LawyerAwards.__super__.constructor.apply(this, arguments);
    }

    LawyerAwards.prototype.url = "/api/lawyrs/awards";

    LawyerAwards.prototype.model = ppu.LawyerAward;

    return LawyerAwards;

  })(Backbone.Collection);
  ppu.LawyerAwardCreate = (function(superClass) {
    extend(LawyerAwardCreate, superClass);

    function LawyerAwardCreate() {
      return LawyerAwardCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerAwardCreate.prototype.el = $("#lawyer-form-award");

    LawyerAwardCreate.prototype.template = $("#lawyer-form-award-template");

    LawyerAwardCreate.prototype.events = {
      'click .lawyer-add-award': 'addForm'
    };

    LawyerAwardCreate.prototype.initialize = function() {
      this.appendForm();
      return app.pubsub.bind('lawyer:stored', this.store, this);
    };

    LawyerAwardCreate.prototype.appendForm = function() {
      return ppu.appendForm(this.el, this.template);
    };

    LawyerAwardCreate.prototype.addForm = function(e) {
      e.preventDefault();
      return this.appendForm();
    };

    LawyerAwardCreate.prototype.store = function(data) {
      return ppu.saveMultipeForms(this.el, this.model, data.id);
    };

    return LawyerAwardCreate;

  })(Backbone.View);
  ppu.LawyerAwardsEditModal = (function(superClass) {
    extend(LawyerAwardsEditModal, superClass);

    function LawyerAwardsEditModal() {
      return LawyerAwardsEditModal.__super__.constructor.apply(this, arguments);
    }

    LawyerAwardsEditModal.prototype.el = $("#lawyer-award-edit-modal");

    LawyerAwardsEditModal.prototype.template = $("#lawyer-form-award-template");

    _.extend(LawyerAwardsEditModal.prototype, mixins.lawyerRelationshipModalEdit);

    return LawyerAwardsEditModal;

  })(Backbone.View);
  ppu.LawyerAwardView = (function(superClass) {
    extend(LawyerAwardView, superClass);

    function LawyerAwardView() {
      return LawyerAwardView.__super__.constructor.apply(this, arguments);
    }

    LawyerAwardView.prototype.tagName = 'li';

    LawyerAwardView.prototype.template = $('#lawyer-award-template');

    LawyerAwardView.prototype.modal = ppu.LawyerAwardsEditModal;

    _.extend(LawyerAwardView.prototype, mixins.lawyerRelationshipView);

    return LawyerAwardView;

  })(Backbone.View);
  ppu.LawyerAwardModalCreate = (function(superClass) {
    extend(LawyerAwardModalCreate, superClass);

    function LawyerAwardModalCreate() {
      return LawyerAwardModalCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerAwardModalCreate.prototype.el = $("#lawyer-relationship-create-modal");

    LawyerAwardModalCreate.prototype.template = $("#lawyer-form-award-template");

    _.extend(LawyerAwardModalCreate.prototype, mixins.lawyerRelationshipModalCreate);

    return LawyerAwardModalCreate;

  })(Backbone.View);
  return ppu.LawyerAwardsEdit = (function(superClass) {
    extend(LawyerAwardsEdit, superClass);

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
