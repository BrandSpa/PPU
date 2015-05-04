$ ->
  class ppu.LawyerRecognitionView extends Backbone.View
    tagName: 'li'
    template: $ '#lawyer-recognition-template'
    modal: ppu.LawyerRecognitionsEditModal
    _.extend(@.prototype, mixins.lawyerRelationshipView)