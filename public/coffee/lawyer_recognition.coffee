$ ->
  class ppu.LawyerRecognition extends Backbone.Model
    url: "/api/recognitions"

  class ppu.LawyerRecognitions extends Backbone.Collection
    url: "/api/recognitions"
    model: ppu.LawyerRecognition

  class ppu.LawyerRecognitionCreate extends Backbone.View
    el: $ "#lawyer-form-recognition"
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

  class ppu.LawyerRecognitionView extends Backbone.View
    tagName: 'li'
    template: $ '#lawyer-recognition-template'
   
    _.extend(@.prototype, mixins.lawyerRelationshipView)

  class ppu.LawyerRecognitionsEdit extends Backbone.View
    el: $ "#lawyer-recognition-edit"
    view: ppu.LawyerRecognitionView

    _.extend(@.prototype, mixins.lawyerRelationshipViews)