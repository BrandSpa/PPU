$ ->
  class ppu.LawyerArticlesEditModal extends Backbone.View
    el: $ "#lawyer-article-edit-modal"
    template: $ "#lawyer-article-form-template" 

    _.extend(@.prototype, mixins.lawyerRelationshipModalEdit)