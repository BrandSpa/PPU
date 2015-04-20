$ ->
  class ppu.LawyerArticleView extends Backbone.View
    tagName: 'tr'
    template: $ '#lawyer-article-template'
    modal: ppu.LawyerArticlesEditModal
    _.extend(@.prototype, mixins.lawyerRelationshipView)