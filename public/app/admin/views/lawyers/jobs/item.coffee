$ ->
  class ppu.LawyerJobView extends Backbone.View
    tagName: 'li'
    template: $ '#lawyer-job-template'
    modal: ppu.LawyerJobsEditModal
    _.extend(@.prototype, mixins.lawyerRelationshipView)