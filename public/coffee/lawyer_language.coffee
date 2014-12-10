$ ->
  class ppu.LawyerLanguage extends Backbone.Model
    url: "/api/languages"

  class ppu.LawyerLanguages extends Backbone.Collection
    url: "/api/languages"
    model: ppu.LawyerLanguage

  class ppu.LawyerLanguageCreate extends Backbone.View
    el: $ "#lawyer-form-language"
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

  class ppu.LawyerLanguageView extends Backbone.View
    tagName: 'li'
    template: $ '#lawyer-language-template'
   
    _.extend(@.prototype, mixins.lawyerRelationshipView)

  class ppu.LawyerLanguagesEdit extends Backbone.View
    el: $ "#lawyer-language-edit"
    view: ppu.LawyerLanguageView

    _.extend(@.prototype, mixins.lawyerRelationshipViews)