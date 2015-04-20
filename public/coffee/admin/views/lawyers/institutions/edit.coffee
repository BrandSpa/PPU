$ ->
  class ppu.LawyerInstitutionsEdit extends Backbone.View
    el: $ "#lawyer-institution-edit"
    view: ppu.LawyerInstitutionView
    modal: ppu.LawyerInstitutionModalCreate
    _.extend(@.prototype, mixins.lawyerRelationshipViews)