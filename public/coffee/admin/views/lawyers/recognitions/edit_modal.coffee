$ ->
  class ppu.LawyerRecognitionsEditModal extends Backbone.View
    el: $ "#lawyer-recognition-edit-modal"
    template: $ "#lawyer-form-recognition-template" 

    _.extend(@.prototype, mixins.lawyerRelationshipModalEdit)