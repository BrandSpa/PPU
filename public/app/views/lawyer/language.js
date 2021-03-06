// Generated by CoffeeScript 1.12.5
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  $(function() {
    ppu.LawyerLanguage = (function(superClass) {
      extend(LawyerLanguage, superClass);

      function LawyerLanguage() {
        return LawyerLanguage.__super__.constructor.apply(this, arguments);
      }

      LawyerLanguage.prototype.urlRoot = "/api/lawyrs/languages";

      return LawyerLanguage;

    })(Backbone.Model);
    ppu.LawyerLanguages = (function(superClass) {
      extend(LawyerLanguages, superClass);

      function LawyerLanguages() {
        return LawyerLanguages.__super__.constructor.apply(this, arguments);
      }

      LawyerLanguages.prototype.url = "/api/lawyrs/languages";

      LawyerLanguages.prototype.model = ppu.LawyerLanguage;

      return LawyerLanguages;

    })(Backbone.Collection);
    ppu.LawyerLanguageCreate = (function(superClass) {
      extend(LawyerLanguageCreate, superClass);

      function LawyerLanguageCreate() {
        return LawyerLanguageCreate.__super__.constructor.apply(this, arguments);
      }

      LawyerLanguageCreate.prototype.el = $("#lawyer-form-language");

      LawyerLanguageCreate.prototype.template = $("#lawyer-form-language-template");

      LawyerLanguageCreate.prototype.events = {
        'click .lawyer-add-language': 'addForm'
      };

      LawyerLanguageCreate.prototype.initialize = function() {
        this.appendForm();
        return app.pubsub.bind('lawyer:stored', this.store, this);
      };

      LawyerLanguageCreate.prototype.appendForm = function() {
        return ppu.appendForm(this.el, this.template);
      };

      LawyerLanguageCreate.prototype.addForm = function(e) {
        e.preventDefault();
        return this.appendForm();
      };

      LawyerLanguageCreate.prototype.store = function(data) {
        return ppu.saveMultipeForms(this.el, this.model, data.id);
      };

      return LawyerLanguageCreate;

    })(Backbone.View);
    ppu.LawyerLanguagesCreateModal = (function(superClass) {
      extend(LawyerLanguagesCreateModal, superClass);

      function LawyerLanguagesCreateModal() {
        return LawyerLanguagesCreateModal.__super__.constructor.apply(this, arguments);
      }

      LawyerLanguagesCreateModal.prototype.el = $("#lawyer-relationship-create-modal");

      LawyerLanguagesCreateModal.prototype.template = $("#lawyer-form-language-template");

      _.extend(LawyerLanguagesCreateModal.prototype, mixins.lawyerRelationshipModalCreate);

      return LawyerLanguagesCreateModal;

    })(Backbone.View);
    ppu.LawyerLanguagesEditModal = (function(superClass) {
      extend(LawyerLanguagesEditModal, superClass);

      function LawyerLanguagesEditModal() {
        return LawyerLanguagesEditModal.__super__.constructor.apply(this, arguments);
      }

      LawyerLanguagesEditModal.prototype.el = $("#lawyer-language-edit-modal");

      LawyerLanguagesEditModal.prototype.template = $("#lawyer-form-language-template");

      _.extend(LawyerLanguagesEditModal.prototype, mixins.lawyerRelationshipModalEdit);

      return LawyerLanguagesEditModal;

    })(Backbone.View);
    ppu.LawyerLanguageView = (function(superClass) {
      extend(LawyerLanguageView, superClass);

      function LawyerLanguageView() {
        return LawyerLanguageView.__super__.constructor.apply(this, arguments);
      }

      LawyerLanguageView.prototype.tagName = 'li';

      LawyerLanguageView.prototype.template = $('#lawyer-language-template');

      LawyerLanguageView.prototype.modal = ppu.LawyerLanguagesEditModal;

      _.extend(LawyerLanguageView.prototype, mixins.lawyerRelationshipView);

      return LawyerLanguageView;

    })(Backbone.View);
    return ppu.LawyerLanguagesEdit = (function(superClass) {
      extend(LawyerLanguagesEdit, superClass);

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

}).call(this);
