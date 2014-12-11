$ ->
  class ppu.LawyerRecognition extends Backbone.Model
    urlRoot: "/api/recognitions"

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

  class ppu.LawyerRecognitionsEditModal extends Backbone.View
    el: $ "#lawyer-recognition-edit-modal"
    template: $ "#lawyer-form-recognition-template" 

    _.extend(@.prototype, mixins.lawyerRelationshipModalEdit)

  class ppu.LawyerRecognitionView extends Backbone.View
    tagName: 'li'
    template: $ '#lawyer-recognition-template'
    modal: ppu.LawyerRecognitionsEditModal
    _.extend(@.prototype, mixins.lawyerRelationshipView)

  class ppu.LawyerRecognitionModalCreate extends Backbone.View
    el: $ "#lawyer-relationship-create-modal"
    template: $ "#lawyer-form-recognition-template"
    _.extend(@.prototype, mixins.lawyerRelationshipModalCreate)

  class ppu.LawyerRecognitionsEdit extends Backbone.View
    el: $ "#lawyer-recognition-edit"
    view: ppu.LawyerRecognitionView
    modal: ppu.LawyerRecognitionModalCreate
    _.extend(@.prototype, mixins.lawyerRelationshipViews)