var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.LawyerLanguage = (function(_super) {
    __extends(LawyerLanguage, _super);

    function LawyerLanguage() {
      return LawyerLanguage.__super__.constructor.apply(this, arguments);
    }

    LawyerLanguage.prototype.urlRoot = "/api/languages";

    return LawyerLanguage;

  })(Backbone.Model);
  ppu.LawyerLanguages = (function(_super) {
    __extends(LawyerLanguages, _super);

    function LawyerLanguages() {
      return LawyerLanguages.__super__.constructor.apply(this, arguments);
    }

    LawyerLanguages.prototype.url = "/api/languages";

    LawyerLanguages.prototype.model = ppu.LawyerLanguage;

    return LawyerLanguages;

  })(Backbone.Collection);
  ppu.LawyerLanguageCreate = (function(_super) {
    __extends(LawyerLanguageCreate, _super);

    function LawyerLanguageCreate() {
      return LawyerLanguageCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerLanguageCreate.prototype.el = $("#lawyer-form-language");

    LawyerLanguageCreate.prototype.template = $("#lawyer-form-language-template");

    LawyerLanguageCreate.prototype.events = {
      'click .lawyer-add-language': 'addForm'
    };

    LawyerLanguageCreate.prototype.initialize = function() {
      return this.appendForm();
    };

    LawyerLanguageCreate.prototype.appendForm = function() {
      return ppu.appendForm(this.el, this.template);
    };

    LawyerLanguageCreate.prototype.addForm = function(e) {
      e.preventDefault();
      return this.appendForm();
    };

    LawyerLanguageCreate.prototype.store = function(lawyer_id) {
      return ppu.saveMultipeForms(this.el, this.model, lawyer_id);
    };

    return LawyerLanguageCreate;

  })(Backbone.View);
  ppu.LawyerLanguagesCreateModal = (function(_super) {
    __extends(LawyerLanguagesCreateModal, _super);

    function LawyerLanguagesCreateModal() {
      return LawyerLanguagesCreateModal.__super__.constructor.apply(this, arguments);
    }

    LawyerLanguagesCreateModal.prototype.el = $("#lawyer-relationship-create-modal");

    LawyerLanguagesCreateModal.prototype.template = $("#lawyer-form-language-template");

    _.extend(LawyerLanguagesCreateModal.prototype, mixins.lawyerRelationshipModalCreate);

    return LawyerLanguagesCreateModal;

  })(Backbone.View);
  ppu.LawyerLanguagesEditModal = (function(_super) {
    __extends(LawyerLanguagesEditModal, _super);

    function LawyerLanguagesEditModal() {
      return LawyerLanguagesEditModal.__super__.constructor.apply(this, arguments);
    }

    LawyerLanguagesEditModal.prototype.el = $("#lawyer-language-edit-modal");

    LawyerLanguagesEditModal.prototype.template = $("#lawyer-form-language-template");

    _.extend(LawyerLanguagesEditModal.prototype, mixins.lawyerRelationshipModalEdit);

    return LawyerLanguagesEditModal;

  })(Backbone.View);
  ppu.LawyerLanguageView = (function(_super) {
    __extends(LawyerLanguageView, _super);

    function LawyerLanguageView() {
      return LawyerLanguageView.__super__.constructor.apply(this, arguments);
    }

    LawyerLanguageView.prototype.tagName = 'li';

    LawyerLanguageView.prototype.template = $('#lawyer-language-template');

    LawyerLanguageView.prototype.modal = ppu.LawyerLanguagesEditModal;

    _.extend(LawyerLanguageView.prototype, mixins.lawyerRelationshipView);

    return LawyerLanguageView;

  })(Backbone.View);
  return ppu.LawyerLanguagesEdit = (function(_super) {
    __extends(LawyerLanguagesEdit, _super);

    function LawyerLanguagesEdit() {
      return LawyerLanguagesEdit.__super__.constructor.apply(this, arguments);
    }

    LawyerLanguagesEdit.prototype.el = $("#lawyer-language-edit");

    LawyerLanguagesEdit.prototype.view = ppu.LawyerLanguageView;

    LawyerLanguagesEdit.prototype.modal = ppu.LawyerLanguagesCreateModal;

    _.extend(LawyerLanguagesEdit.prototype, mixins.lawyerRelationshipViews);

    return LawyerLanguagesEdit;

  })(Backbone.View);
});
