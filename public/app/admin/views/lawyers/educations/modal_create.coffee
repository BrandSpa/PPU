$ ->
  class ppu.LawyerEducationModalCreate extends Backbone.View
    el: $ "#lawyer-relationship-create-modal"
    template: $ "#lawyer-form-education-template"
    _.extend(@.prototype, mixins.lawyerRelationshipModalCreate)