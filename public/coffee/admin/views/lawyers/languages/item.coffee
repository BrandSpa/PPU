$ ->
  class ppu.LawyerLanguageView extends Backbone.View
    tagName: 'li'
    template: $ '#lawyer-language-template'
    modal: ppu.LawyerLanguagesEditModal
    _.extend(@.prototype, mixins.lawyerRelationshipView)