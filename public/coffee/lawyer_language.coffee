$ ->
  class ppu.LawyerLanguage extends Backbone.Model
    url: "/api/languages"

  class ppu.LawyerLanguages extends Backbone.Collection
    url: "/api/languages"
    model: ppu.LawyerLanguage

  class ppu.LawyerLanguageCreate extends Backbone.View
    el: $ "#lawyer-language-form"
    template: $ "#lawyer-form-language-template"
    events: 
      'click .lawyer-add-language': 'addForm'

    initialize: ->
      @appendForm()

    appendForm: ->
      ppu.appendForm(@el, @template)

     addForm: (e) ->
      e.preventDefault()
      @appendForm()

    store: (lawyer_id) ->
      ppu.saveMultipeForms(@el, @model, lawyer_id)