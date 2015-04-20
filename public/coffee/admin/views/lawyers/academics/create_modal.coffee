$ ->
  class ppu.LawyerAcademicModalCreate extends Backbone.View
    el: $ "#lawyer-relationship-create-modal"
    template: $ "#lawyer-academic-form-template"
    _.extend(@.prototype, mixins.lawyerRelationshipModalCreate)