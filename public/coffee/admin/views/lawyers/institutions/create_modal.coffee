$ ->
  class ppu.LawyerInstitutionModalCreate extends Backbone.View
    el: $ "#lawyer-relationship-create-modal"
    template: $ "#lawyer-form-institution-template"
    _.extend(@.prototype, mixins.lawyerRelationshipModalCreate)