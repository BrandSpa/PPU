$ ->
  class ppu.LawyerPharase extends Backbone.Model
    urlRoot: "/api/pharases"

  class ppu.LawyerPharases extends Backbone.Collection
    url: "/api/pharases"
    model: ppu.LawyerPharase

  class ppu.LawyerPharaseCreate extends Backbone.View
    el: $ "#lawyer-form-phrase"
    template: $ "#lawyer-form-phrase-template"
    events: 
      'click .lawyer-add-phrase': 'addForm'

    initialize: ->
      @appendForm()

    appendForm: ->
      ppu.appendForm(@el, @template)

     addForm: (e) ->
      e.preventDefault()
      @appendForm()

    store: (lawyer_id) ->
      ppu.saveMultipeForms(@el, @model, lawyer_id)

  class ppu.LawyerPhrasesEditModal extends Backbone.View
    el: $ "#lawyer-phrase-edit-modal"
    template: $ "#lawyer-form-phrase-template" 
    _.extend(@.prototype, mixins.lawyerRelationshipModalEdit)

  class ppu.LawyerPharaseView extends Backbone.View
    tagName: 'li'
    template: $ '#lawyer-phrase-template'
    modal: ppu.LawyerPhrasesEditModal
    _.extend(@.prototype, mixins.lawyerRelationshipView)

  class ppu.LawyerPhraseModalCreate extends Backbone.View
    el: $ "#lawyer-relationship-create-modal"
    template: $ "#lawyer-form-phrase-template"
    _.extend(@.prototype, mixins.lawyerRelationshipModalCreate)

  class ppu.LawyerPharasesEdit extends Backbone.View
    el: $ "#lawyer-phrase-edit"
    view: ppu.LawyerPharaseView
    modal: ppu.LawyerPhraseModalCreate
    _.extend(@.prototype, mixins.lawyerRelationshipViews)