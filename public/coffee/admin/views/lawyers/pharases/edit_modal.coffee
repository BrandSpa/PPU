$ ->
  class ppu.LawyerPhrasesEditModal extends Backbone.View
    el: $ "#lawyer-phrase-edit-modal"
    template: $ "#lawyer-form-phrase-template" 
    _.extend(@.prototype, mixins.lawyerRelationshipModalEdit)