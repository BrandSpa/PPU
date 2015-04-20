$ ->
  class ppu.LawyerInstitutionCreate extends Backbone.View
    el: $ "#lawyer-form-institution"
    template: $ "#lawyer-form-institution-template"
    events: 
      'click .lawyer-add-institution': 'addForm'

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