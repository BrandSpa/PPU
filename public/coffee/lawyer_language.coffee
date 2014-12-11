$ ->
  class ppu.LawyerLanguage extends Backbone.Model
    urlRoot: "/api/languages"

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

  class ppu.LawyerLanguagesCreateModal extends Backbone.View
      el: $ "#lawyer-relationship-create-modal"
      template: $ "#lawyer-form-language-template"
      _.extend(@.prototype, mixins.lawyerRelationshipModalCreate)

  class ppu.LawyerLanguagesEditModal extends Backbone.View
      el: $ "#lawyer-language-edit-modal"
      template: $ "#lawyer-form-language-template"
      _.extend(@.prototype, mixins.lawyerRelationshipModalEdit)

  class ppu.LawyerLanguageView extends Backbone.View
    tagName: 'li'
    template: $ '#lawyer-language-template'
    modal: ppu.LawyerLanguagesEditModal
    _.extend(@.prototype, mixins.lawyerRelationshipView)

  class ppu.LawyerLanguagesEdit extends Backbone.View
    el: $ "#lawyer-language-edit"
    view: ppu.LawyerLanguageView
    modal: ppu.LawyerLanguagesCreateModal
    _.extend(@.prototype, mixins.lawyerRelationshipViews)