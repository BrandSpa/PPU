$ ->
  class ppu.LawyerInstitutionsEditModal extends Backbone.View
    el: $ "#lawyer-institution-edit-modal"
    template: $ "#lawyer-form-institution-template" 
    _.extend(@.prototype, mixins.lawyerRelationshipModalEdit)