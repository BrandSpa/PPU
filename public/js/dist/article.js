var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$(function() {
  ppu.LawyerArticle = (function(superClass) {
    extend(LawyerArticle, superClass);

    function LawyerArticle() {
      return LawyerArticle.__super__.constructor.apply(this, arguments);
    }

    LawyerArticle.prototype.urlRoot = "/api/lawyrs/articles";

    return LawyerArticle;

  })(Backbone.Model);
  ppu.LawyerArticles = (function(superClass) {
    extend(LawyerArticles, superClass);

    function LawyerArticles() {
      return LawyerArticles.__super__.constructor.apply(this, arguments);
    }

    LawyerArticles.prototype.url = "/api/lawyrs/articles";

    LawyerArticles.prototype.model = ppu.LawyerArticle;

    return LawyerArticles;

  })(Backbone.Collection);
  ppu.LawyerArticleCreate = (function(superClass) {
    extend(LawyerArticleCreate, superClass);

    function LawyerArticleCreate() {
      return LawyerArticleCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerArticleCreate.prototype.el = $("#lawyer-form-article");

    LawyerArticleCreate.prototype.template = $("#lawyer-article-form-template");

    LawyerArticleCreate.prototype.events = {
      'click .lawyer-add-article': 'addForm'
    };

    LawyerArticleCreate.prototype.initialize = function() {
      this.appendForm();
      return app.pubsub.bind('lawyer:stored', this.store, this);
    };

    LawyerArticleCreate.prototype.appendForm = function() {
      return ppu.appendForm(this.el, this.template);
    };

    LawyerArticleCreate.prototype.addForm = function(e) {
      e.preventDefault();
      return this.appendForm();
    };

    LawyerArticleCreate.prototype.store = function(data) {
      return ppu.saveMultipeForms(this.el, this.model, data.id);
    };

    return LawyerArticleCreate;

  })(Backbone.View);
  ppu.LawyerArticlesEditModal = (function(superClass) {
    extend(LawyerArticlesEditModal, superClass);

    function LawyerArticlesEditModal() {
      return LawyerArticlesEditModal.__super__.constructor.apply(this, arguments);
    }

    LawyerArticlesEditModal.prototype.el = $("#lawyer-article-edit-modal");

    LawyerArticlesEditModal.prototype.template = $("#lawyer-article-form-template");

    _.extend(LawyerArticlesEditModal.prototype, mixins.lawyerRelationshipModalEdit);

    return LawyerArticlesEditModal;

  })(Backbone.View);
  ppu.LawyerArticleView = (function(superClass) {
    extend(LawyerArticleView, superClass);

    function LawyerArticleView() {
      return LawyerArticleView.__super__.constructor.apply(this, arguments);
    }

    LawyerArticleView.prototype.tagName = 'tr';

    LawyerArticleView.prototype.template = $('#lawyer-article-template');

    LawyerArticleView.prototype.modal = ppu.LawyerArticlesEditModal;

    _.extend(LawyerArticleView.prototype, mixins.lawyerRelationshipView);

    return LawyerArticleView;

  })(Backbone.View);
  ppu.LawyerArticleModalCreate = (function(superClass) {
    extend(LawyerArticleModalCreate, superClass);

    function LawyerArticleModalCreate() {
      return LawyerArticleModalCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerArticleModalCreate.prototype.el = $("#lawyer-relationship-create-modal");

    LawyerArticleModalCreate.prototype.template = $("#lawyer-article-form-template");

    _.extend(LawyerArticleModalCreate.prototype, mixins.lawyerRelationshipModalCreate);

    return LawyerArticleModalCreate;

  })(Backbone.View);
  return ppu.LawyerArticlesEdit = (function(superClass) {
    extend(LawyerArticlesEdit, superClass);

    function LawyerArticlesEdit() {
      return LawyerArticlesEdit.__super__.constructor.apply(this, arguments);
    }

    LawyerArticlesEdit.prototype.el = $("#lawyer-article-edit");

    LawyerArticlesEdit.prototype.view = ppu.LawyerArticleView;

    LawyerArticlesEdit.prototype.modal = ppu.LawyerArticleModalCreate;

    _.extend(LawyerArticlesEdit.prototype, mixins.lawyerRelationshipViews);

    return LawyerArticlesEdit;

  })(Backbone.View);
});
