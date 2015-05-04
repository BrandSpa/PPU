$ ->
  class ppu.LawyerJobCreate extends Backbone.View
    el: $ "#lawyer-form-job"
    template: $ "#lawyer-form-job-template"
    events: 
      'click .lawyer-add-job': 'addForm'

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