$ ->
  class ppu.LawyerAwardsEdit extends Backbone.View
    el: $ "#lawyer-award-edit"
    view: ppu.LawyerAwardView
    modal: ppu.LawyerAwardModalCreate
    _.extend(@.prototype, mixins.lawyerRelationshipViews)