$ ->
  class ppu.LawyerPharaseView extends Backbone.View
    tagName: 'li'
    template: $ '#lawyer-phrase-template'
    modal: ppu.LawyerPhrasesEditModal
    _.extend(@.prototype, mixins.lawyerRelationshipView)