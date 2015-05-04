$ ->
  class ppu.LawyerLanguagesEditModal extends Backbone.View
    el: $ "#lawyer-language-edit-modal"
    template: $ "#lawyer-form-language-template"
    _.extend(@.prototype, mixins.lawyerRelationshipModalEdit)