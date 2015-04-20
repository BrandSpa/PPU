$ ->
  class ppu.LawyerEducationView extends Backbone.View
    tagName: 'li'
    template: $ '#lawyer-education-template'
    modal: ppu.LawyerEducationEditModal
    _.extend(@.prototype, mixins.lawyerRelationshipView)