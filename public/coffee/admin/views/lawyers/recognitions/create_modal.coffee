$ ->
  class ppu.LawyerRecognitionModalCreate extends Backbone.View
    el: $ "#lawyer-relationship-create-modal"
    template: $ "#lawyer-form-recognition-template"
    _.extend(@.prototype, mixins.lawyerRelationshipModalCreate)