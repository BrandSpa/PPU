var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {
  ppu.LawyerArticle = (function(_super) {
    __extends(LawyerArticle, _super);

    function LawyerArticle() {
      return LawyerArticle.__super__.constructor.apply(this, arguments);
    }

    LawyerArticle.prototype.urlRoot = "/api/articles";

    return LawyerArticle;

  })(Backbone.Model);
  ppu.LawyerArticles = (function(_super) {
    __extends(LawyerArticles, _super);

    function LawyerArticles() {
      return LawyerArticles.__super__.constructor.apply(this, arguments);
    }

    LawyerArticles.prototype.url = "/api/articles";

    LawyerArticles.prototype.model = ppu.LawyerArticle;

    return LawyerArticles;

  })(Backbone.Collection);
  return ppu.LawyerArticleCreate = (function(_super) {
    __extends(LawyerArticleCreate, _super);

    function LawyerArticleCreate() {
      return LawyerArticleCreate.__super__.constructor.apply(this, arguments);
    }

    LawyerArticleCreate.prototype.el = $("#lawyer-article-form");

    LawyerArticleCreate.prototype.template = $("#lawyer-form-article-template");

    LawyerArticleCreate.prototype.events = {
      'click .lawyer-add-article': 'addForm'
    };

    LawyerArticleCreate.prototype.initialize = function() {
      return this.appendForm();
    };

    LawyerArticleCreate.prototype.appendForm = function() {
      return ppu.appendForm(this.el, this.template);
    };

    LawyerArticleCreate.prototype.addForm = function(e) {
      e.preventDefault();
      return this.appendForm();
    };

    LawyerArticleCreate.prototype.store = function(lawyer_id) {
      return ppu.saveMultipeForms(this.el, this.model, lawyer_id);
    };

    return LawyerArticleCreate;

  })(Backbone.View);
});
