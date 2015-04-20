$ ->
  class ppu.LawyerLanguageCreate extends Backbone.View
    el: $ "#lawyer-form-language"
    template: $ "#lawyer-form-language-template"
    events: 
      'click .lawyer-add-language': 'addForm'

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