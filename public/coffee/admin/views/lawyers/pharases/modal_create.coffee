$ ->
  class ppu.LawyerPhraseModalCreate extends Backbone.View
    el: $ "#lawyer-relationship-create-modal"
    template: $ "#lawyer-form-phrase-template"
    _.extend(@.prototype, mixins.lawyerRelationshipModalCreate)