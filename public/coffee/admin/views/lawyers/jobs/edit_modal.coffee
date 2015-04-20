$ ->
  class ppu.LawyerJobsEditModal extends Backbone.View
    el: $ "#lawyer-job-edit-modal"
    template: $ "#lawyer-form-job-template" 
    _.extend(@.prototype, mixins.lawyerRelationshipModalEdit)