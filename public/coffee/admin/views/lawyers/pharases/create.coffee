$ ->
  class ppu.LawyerPharaseCreate extends Backbone.View
    el: $ "#lawyer-form-phrase"
    template: $ "#lawyer-form-phrase-template"
    events: 
      'click .lawyer-add-phrase': 'addForm'

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