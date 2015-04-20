$ ->
  class ppu.LawyerEducationCreate extends Backbone.View
    el: $ "#lawyer-form-education"
    template: $ "#lawyer-form-education-template"
    events: 
      'click .lawyer-add-education': 'addForm'

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