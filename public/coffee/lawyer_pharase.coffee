$ ->
  class ppu.LawyerPharase extends Backbone.Model
    url: "/api/pharases"

  class ppu.LawyerPharases extends Backbone.Collection
    url: "/api/pharases"
    model: ppu.LawyerPharase

  class ppu.LawyerPharaseCreate extends Backbone.View
    el: $ "#lawyer-pharase-form"
    template: $ "#lawyer-form-pharase-template"
    events: 
      'click .lawyer-add-pharase': 'addForm'

    initialize: ->
      @appendForm()

    appendForm: ->
      ppu.appendForm(@el, @template)

     addForm: (e) ->
      e.preventDefault()
      @appendForm()

    store: (lawyer_id) ->
      ppu.saveMultipeForms(@el, @model, lawyer_id)