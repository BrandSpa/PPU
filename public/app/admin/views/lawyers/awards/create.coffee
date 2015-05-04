$ ->
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