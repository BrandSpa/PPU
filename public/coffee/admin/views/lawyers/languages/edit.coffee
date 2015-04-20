$ ->
  
  class ppu.LawyerLanguagesEdit extends Backbone.View
    el: $ "#lawyer-language-edit"
    view: ppu.LawyerLanguageView
    modal: ppu.LawyerLanguagesCreateModal
    _.extend(@.prototype, mixins.lawyerRelationshipViews)