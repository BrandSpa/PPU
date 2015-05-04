$ ->
  class ppu.LawyerRecognitionsEdit extends Backbone.View
    el: $ "#lawyer-recognition-edit"
    view: ppu.LawyerRecognitionView
    modal: ppu.LawyerRecognitionModalCreate
    _.extend(@.prototype, mixins.lawyerRelationshipViews)