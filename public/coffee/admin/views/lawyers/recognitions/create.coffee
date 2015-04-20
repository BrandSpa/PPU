$ ->
  class ppu.LawyerRecognitionCreate extends Backbone.View
    el: $ "#lawyer-form-recognition"
    template: $ "#lawyer-form-recognition-template"
    events: 
      'click .lawyer-add-recognition': 'addForm'

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