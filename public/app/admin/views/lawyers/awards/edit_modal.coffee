$ ->
  class ppu.LawyerAwardsEditModal extends Backbone.View
    el: $ "#lawyer-award-edit-modal"
    template: $ "#lawyer-form-award-template" 

    _.extend(@.prototype, mixins.lawyerRelationshipModalEdit)