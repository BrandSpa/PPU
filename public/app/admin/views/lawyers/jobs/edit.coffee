$ ->
  class ppu.LawyerJobsEdit extends Backbone.View
    el: $ "#lawyer-job-edit"
    view: ppu.LawyerJobView
    modal: ppu.LawyerJobModalCreate
    _.extend(@.prototype, mixins.lawyerRelationshipViews)