$ ->
  class ppu.LawyerPharasesEdit extends Backbone.View
    el: $ "#lawyer-phrase-edit"
    view: ppu.LawyerPharaseView
    modal: ppu.LawyerPhraseModalCreate
    _.extend(@.prototype, mixins.lawyerRelationshipViews)