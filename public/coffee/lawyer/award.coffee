$ ->
  class ppu.LawyerAward extends Backbone.Model
    urlRoot: "/api/lawyrs/awards"

  class ppu.LawyerAwards extends Backbone.Collection
    url: "/api/lawyrs/awards"
    model: ppu.LawyerAward

  class ppu.LawyerAwardCreate extends Backbone.View
    el: $ "#lawyer-form-award"
    template: $ "#lawyer-form-award-template"
    events: 
      'click .lawyer-add-award': 'addForm'

    initialize: ->
      @appendForm()
      app.pubsub.bind('lawyer:stored', @store, @)

    appendForm: ->
      ppu.appendForm(@el, @template)

    addForm: (e) ->
      e.preventDefault()
      @appendForm()

    store: (data) ->
      ppu.saveMultipeForms(@el, @model, data.id)

  class ppu.LawyerAwardsEditModal extends Backbone.View
    el: $ "#lawyer-award-edit-modal"
    template: $ "#lawyer-form-award-template" 

    _.extend(@.prototype, mixins.lawyerRelationshipModalEdit)

  class ppu.LawyerAwardView extends Backbone.View
    tagName: 'li'
    template: $ '#lawyer-award-template'
    modal: ppu.LawyerAwardsEditModal
   
    _.extend(@.prototype, mixins.lawyerRelationshipView)
    
  class ppu.LawyerAwardModalCreate extends Backbone.View
    el: $ "#lawyer-relationship-create-modal"
    template: $ "#lawyer-form-award-template"
    _.extend(@.prototype, mixins.lawyerRelationshipModalCreate)

  class ppu.LawyerAwardsEdit extends Backbone.View
    el: $ "#lawyer-award-edit"
    view: ppu.LawyerAwardView
    modal: ppu.LawyerAwardModalCreate
    _.extend(@.prototype, mixins.lawyerRelationshipViews)

