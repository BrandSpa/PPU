$ ->
  class ppu.LawyerJobModalCreate extends Backbone.View
    el: $ "#lawyer-relationship-create-modal"
    template: $ "#lawyer-form-job-template"
    _.extend(@.prototype, mixins.lawyerRelationshipModalCreate)