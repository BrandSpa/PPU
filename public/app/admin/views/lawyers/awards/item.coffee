$ ->
  class ppu.LawyerAwardView extends Backbone.View
    tagName: 'li'
    template: $ '#lawyer-award-template'
    modal: ppu.LawyerAwardsEditModal
   
    _.extend(@.prototype, mixins.lawyerRelationshipView)