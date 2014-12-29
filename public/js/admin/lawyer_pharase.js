var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.LawyerPharase = (function(_super) {
    __extends(LawyerPharase, _super);

    function LawyerPharase() {
      return LawyerPharase.__super__.constructor.apply(this, arguments);
    }

    LawyerPharase.prototype.urlRoot = "/api/pharases";

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
  ppu.LawyerPharaseCreate = (function(_super) {
    __extends(LawyerPharaseCreate, _super);

    function LawyerPharaseCreate() {
      return LawyerPharaseCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerPharaseCreate.prototype.el = $("#lawyer-form-phrase");

    LawyerPharaseCreate.prototype.template = $("#lawyer-form-phrase-template");

    LawyerPharaseCreate.prototype.events = {
      'click .lawyer-add-phrase': 'addForm'
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
  ppu.LawyerPhrasesEditModal = (function(_super) {
    __extends(LawyerPhrasesEditModal, _super);

    function LawyerPhrasesEditModal() {
      return LawyerPhrasesEditModal.__super__.constructor.apply(this, arguments);
    }

    LawyerPhrasesEditModal.prototype.el = $("#lawyer-phrase-edit-modal");

    LawyerPhrasesEditModal.prototype.template = $("#lawyer-form-phrase-template");

    _.extend(LawyerPhrasesEditModal.prototype, mixins.lawyerRelationshipModalEdit);

    return LawyerPhrasesEditModal;

  })(Backbone.View);
  ppu.LawyerPharaseView = (function(_super) {
    __extends(LawyerPharaseView, _super);

    function LawyerPharaseView() {
      return LawyerPharaseView.__super__.constructor.apply(this, arguments);
    }

    LawyerPharaseView.prototype.tagName = 'li';

    LawyerPharaseView.prototype.template = $('#lawyer-phrase-template');

    LawyerPharaseView.prototype.modal = ppu.LawyerPhrasesEditModal;

    _.extend(LawyerPharaseView.prototype, mixins.lawyerRelationshipView);

    return LawyerPharaseView;

  })(Backbone.View);
  ppu.LawyerPhraseModalCreate = (function(_super) {
    __extends(LawyerPhraseModalCreate, _super);

    function LawyerPhraseModalCreate() {
      return LawyerPhraseModalCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerPhraseModalCreate.prototype.el = $("#lawyer-relationship-create-modal");

    LawyerPhraseModalCreate.prototype.template = $("#lawyer-form-phrase-template");

    _.extend(LawyerPhraseModalCreate.prototype, mixins.lawyerRelationshipModalCreate);

    return LawyerPhraseModalCreate;

  })(Backbone.View);
  return ppu.LawyerPharasesEdit = (function(_super) {
    __extends(LawyerPharasesEdit, _super);

    function LawyerPharasesEdit() {
      return LawyerPharasesEdit.__super__.constructor.apply(this, arguments);
    }

    LawyerPharasesEdit.prototype.el = $("#lawyer-phrase-edit");

    LawyerPharasesEdit.prototype.view = ppu.LawyerPharaseView;

    LawyerPharasesEdit.prototype.modal = ppu.LawyerPhraseModalCreate;

    _.extend(LawyerPharasesEdit.prototype, mixins.lawyerRelationshipViews);

    return LawyerPharasesEdit;

  })(Backbone.View);
});
