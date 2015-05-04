$ ->
  class ppu.LawyerEducationsEdit extends Backbone.View
    el: $ "#lawyer-education-edit"
    view: ppu.LawyerEducationView
    modal: ppu.LawyerEducationModalCreate
    _.extend(@.prototype, mixins.lawyerRelationshipViews)
    