$ ->
  class ppu.LawyerArticleModalCreate extends Backbone.View
    el: $ "#lawyer-relationship-create-modal"
    template: $ "#lawyer-article-form-template"
    _.extend(@.prototype, mixins.lawyerRelationshipModalCreate)