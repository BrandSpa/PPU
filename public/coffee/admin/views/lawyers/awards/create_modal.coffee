$ ->
  class ppu.LawyerAwardModalCreate extends Backbone.View
    el: $ "#lawyer-relationship-create-modal"
    template: $ "#lawyer-form-award-template"
    _.extend(@.prototype, mixins.lawyerRelationshipModalCreate)