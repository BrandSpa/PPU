$ ->
  class ppu.LawyerAcademicCreate extends Backbone.View
    el: $ "#lawyer-form-academic"
    template: $ "#lawyer-academic-form-template"
    events: 
      'click .lawyer-add-academic': 'addForm'

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