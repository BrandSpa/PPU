$ ->
  class ppu.LawyerAcademicView extends Backbone.View
    tagName: 'li'
    template: $ '#lawyer-academic-template'
    modal: ppu.LawyerAcademicsEditModal
    _.extend(@.prototype, mixins.lawyerRelationshipView)