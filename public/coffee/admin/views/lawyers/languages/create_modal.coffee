$ ->
  class ppu.LawyerLanguagesCreateModal extends Backbone.View
    el: $ "#lawyer-relationship-create-modal"
    template: $ "#lawyer-form-language-template"
    _.extend(@.prototype, mixins.lawyerRelationshipModalCreate)