$ ->
  class ppu.LawyerArticlesEdit extends Backbone.View
    el: $ "#lawyer-article-edit"
    view: ppu.LawyerArticleView
    modal: ppu.LawyerArticleModalCreate
    _.extend(@.prototype, mixins.lawyerRelationshipViews)