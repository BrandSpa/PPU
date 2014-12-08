$ ->
  class ppu.LawyerInstitution extends Backbone.Model
    url: "/api/institutions"

  class ppu.LawyerInstitutions extends Backbone.Collection
    url: "/api/institutions"
    model: ppu.LawyerInstitution

  class ppu.LawyerInstitutionCreate extends Backbone.View
    el: $ "#lawyer-institution-form"
    template: $ "#lawyer-form-institution-template"
    events: 
      'click .lawyer-add-institution': 'addForm'

    initialize: ->
      @appendForm()

    appendForm: ->
      ppu.appendForm(@el, @template)

     addForm: (e) ->
      e.preventDefault()
      @appendForm()

    store: (lawyer_id) ->
      ppu.saveMultipeForms(@el, @model, lawyer_id)