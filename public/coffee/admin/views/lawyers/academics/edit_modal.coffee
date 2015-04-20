$ ->
  class ppu.LawyerAcademicsEditModal extends Backbone.View
    el: $ "#lawyer-academic-edit-modal"
    template: $ "#lawyer-academic-form-template" 
    _.extend(@.prototype, mixins.lawyerRelationshipModalEdit)