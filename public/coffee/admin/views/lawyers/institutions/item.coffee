$ ->
  class ppu.LawyerInstitutionView extends Backbone.View
    tagName: 'li'
    template: $ '#lawyer-institution-template'
    modal: ppu.LawyerInstitutionsEditModal

    _.extend(@.prototype, mixins.lawyerRelationshipView)