$ ->
  class ppu.LawyerAward extends Backbone.Model
    urlRoot: "/api/awards"

  class ppu.LawyerAwards extends Backbone.Collection
    url: "/api/awards"
    model: ppu.LawyerAward

  class ppu.LawyerAwardCreate extends Backbone.View
    el: $ "#lawyer-form-award"
    template: $ "#lawyer-form-award-template"
    events: 
      'click .lawyer-add-award': 'addForm'

    initialize: ->
      @appendForm()

    appendForm: ->
      ppu.appendForm(@el, @template)

    addForm: (e) ->
      e.preventDefault()
      @appendForm()

    store: (lawyer_id) ->
      ppu.saveMultipeForms(@el, @model, lawyer_id)