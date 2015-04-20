$ ->
  class ppu.LawyerEducationEditModal extends Backbone.View
    el: $ "#lawyer-education-edit-modal"
    template: $ "#lawyer-form-education-template" 

    _.extend(@.prototype, mixins.lawyerRelationshipModalEdit)