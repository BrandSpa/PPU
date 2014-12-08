$ ->
  class ppu.LawyerRecognition extends Backbone.Model
    url: "/api/recognitions"

  class ppu.LawyerRecognitions extends Backbone.Collection
    url: "/api/recognitions"
    model: ppu.LawyerRecognition

  class ppu.LawyerRecognitionCreate extends Backbone.View
    el: $ "#lawyer-recognition-form"
    template: $ "#lawyer-form-recognition-template"
    events: 
      'click .lawyer-add-recognition': 'addForm'

    initialize: ->
      @appendForm()

    appendForm: ->
      ppu.appendForm(@el, @template)

     addForm: (e) ->
      e.preventDefault()
      @appendForm()

    store: (lawyer_id) ->
      ppu.saveMultipeForms(@el, @model, lawyer_id)