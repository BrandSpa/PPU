$ ->
  class ppu.LawyerAcademicsEdit extends Backbone.View
    el: $ "#lawyer-academic-edit"
    view: ppu.LawyerAcademicView
    modal: ppu.LawyerAcademicModalCreate
    _.extend(@.prototype, mixins.lawyerRelationshipViews)